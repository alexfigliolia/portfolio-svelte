import { writable, get, derived } from 'svelte/store';
import { FrameController } from './FrameState';

export const page = writable("Home");
export const width = writable("100%");
export const height = writable("100vh");
export const rawWidth = writable(1000);
export const loading = writable(true);
export const menuOpen = writable(false);
export const entryDelay = writable(1500);
export const frameClasses = writable("frame shrink");
export const flipController = writable("flip-controller flip-active");
export const shrinkDuration = derived(rawWidth, width => {
  return FrameController.setShrinkDuration(width);
});
export const flipDuration = derived(rawWidth, () => {
  return FrameController.setFlipDuration();
});


export class AppState {

	public static timers = new Set<ReturnType<typeof setTimeout>>()

	public static flip() {
		if(!get(frameClasses).endsWith("flip-active")) {
			loading.update(() => true)
			frameClasses.update(() => "frame shrink");
			flipController.update(() =>  "flip-controller flip-active")
		}
	}

	public static enter() {
			frameClasses.update(() => "frame");
			flipController.update(() =>  "flip-controller");
			this.defer(() => {
				loading.update(() => false);
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
			frameClasses.update(() => "frame shrink")
		}, timeout);
		const TTS = (timeout + get(shrinkDuration));
		this.defer(() => {
			loading.update(() => true);
			flipController.update(() => "flip-controller flip-active");
		}, TTS * 0.5);
		const TTF = TTS + get(flipDuration);
		this.defer(() => {
			void loader();
		}, TTF);
		const TTU = TTF + get(flipDuration);
		this.defer(() => {
			frameClasses.update(() => "frame");
			flipController.update(() => "flip-controller");
		}, TTU);
		this.defer(() => {
			loading.update(() => false);
		}, TTU + get(flipDuration))
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