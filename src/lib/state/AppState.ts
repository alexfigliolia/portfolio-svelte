import { writable, get, derived } from "svelte/store";
import { FrameController } from "./FrameState";
import { TaskQueue } from "./TaskQueue";

export const page = writable("Home");
export const width = writable("100%");
export const height = writable("100vh");
export const rawWidth = writable(1000);
export const loading = writable(true);
export const menuOpen = writable(false);
export const entryDelay = writable(3000);
export const flipController = writable("flip-controller shrink flip-active");
export const shrinkDuration = derived(rawWidth, width => {
  return FrameController.setShrinkDuration(width);
});
export const flipDuration = derived(rawWidth, () => {
  return FrameController.setFlipDuration();
});

export class AppState {
  public static TaskQueue = new TaskQueue();

  public static enter() {
    flipController.update(() => "flip-controller shrink");
    loading.update(() => false);
    this.TaskQueue.defer(() => {
      flipController.update(() => "flip-controller");
      this.TaskQueue.defer(() => {
        this.TaskQueue.flushTasks();
      }, get(flipDuration));
    }, 1000);
  }

  public static toggleMenu() {
    menuOpen.update(state => !state);
  }

  public static setDimensions() {
    rawWidth.update(() => window.innerWidth);
    const nextHeight = `${window.innerHeight}px`;
    if (nextHeight !== get(height)) {
      height.update(() => nextHeight);
    }
    const nextWidth = `${window.innerWidth}px`;
    if (nextWidth !== get(width)) {
      width.update(() => nextWidth);
    }
  }

  public static navigate(loader: () => Promise<void>) {
    let timeout = 0;
    if (get(menuOpen)) {
      AppState.toggleMenu();
      timeout = 800;
    }
    this.TaskQueue.defer(() => {
      flipController.update(() => "flip-controller shrink");
      this.TaskQueue.defer(() => {
        flipController.update(() => "flip-controller shrink flip-active");
        this.TaskQueue.defer(() => {
          loading.update(() => true);
        }, get(flipDuration) / 2)
        this.TaskQueue.defer(() => {
          void loader().then(() => {
            this.TaskQueue.defer(() => {
              loading.update(() => false);
              flipController.update(() => "flip-controller shrink");
              this.TaskQueue.defer(() => {
                flipController.update(() => "flip-controller");
                this.TaskQueue.defer(() => {
                  this.TaskQueue.flushTasks();
                }, get(shrinkDuration));
              }, get(flipDuration));
            }, 1000);
          });
        }, get(flipDuration));
      }, get(shrinkDuration));
    }, timeout);
  }
}
