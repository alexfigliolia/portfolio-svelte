import { writable, get, derived } from 'svelte/store';
import { FrameController } from './FrameState';

export const page = writable("Home");
export const width = writable("100%");
export const height = writable("100vh");
export const rawWidth = writable(1000);
export const loading = writable(true);
export const menuOpen = writable(false);
export const entryDelay = writable(1500);
export const flipController = writable("flip-controller shrink flip-active");
export const shrinkDuration = derived(rawWidth, width => {
  return FrameController.setShrinkDuration(width);
});
export const flipDuration = derived(rawWidth, () => {
  return FrameController.setFlipDuration();
});


export class AppState {

	public static timers = new Set<ReturnType<typeof setTimeout>>()

	public static enter() {
		flipController.update(() => "flip-controller shrink");
		loading.update(() => false);
		this.defer(() => {
			flipController.update(() => "flip-controller");
		}, 1000)
	}

	public static toggleMenu() {
		menuOpen.update(state => !state);
	}

	public static setDimensions() {
		rawWidth.update(() => window.innerWidth);
		const nextHeight = `${window.innerHeight}px`;
		if(nextHeight !== get(height)) {
			height.update(() => nextHeight);
		}
		const nextWidth = `${window.innerWidth}px`;
		if(nextWidth !== get(width)) {
			width.update(() => nextWidth);
		}
	}

	public static navigate (timeout: number, loader: () => Promise<void>) {
		this.defer(() => {
			flipController.update(() => "flip-controller shrink")
			this.defer(() => {
				loading.update(() => true);
				flipController.update(() => "flip-controller shrink flip-active");
				this.defer(async () => {
					await loader();
					this.defer(() => {
						loading.update(() => false);
						flipController.update(() => "flip-controller shrink");
						this.defer(() => {
							flipController.update(() => "flip-controller");
						}, get(flipDuration))
					}, 1000);
				}, get(flipDuration));
			}, get(shrinkDuration));
		}, timeout);
	}

	public static defer(cb: () => void | Promise<void>, time: number) {
		const timer = setTimeout(async () => {
			await cb();
			clearTimeout(timer);
			this.timers.delete(timer);
		}, time)
		this.timers.add(timer);
	}

	public static popTimers() {
		for(const timer of this.timers) {
			clearTimeout(timer);
			this.timers.delete(timer);
		}
	}
}