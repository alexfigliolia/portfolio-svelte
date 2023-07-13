export class TaskQueue<T extends () => void | Promise<void>> extends Map<string, T> {
  private static AutoIncrementingID = -1;
  private timers = new Set<ReturnType<typeof setTimeout>>();

  public registerTask(task: T) {
    const ID = this.ID();
    this.set(ID, task);
  }

  public flushTasks() {
    for (const [ID, task] of this) {
      void task();
      this.delete(ID);
    }
  }

  public defer(cb: () => void | Promise<void>, time: number) {
    const timer = setTimeout(() => {
      const release = () => {
        clearTimeout(timer);
        this.timers.delete(timer);
      };
      const res = cb();
      if (res instanceof Promise) {
        void res.then(() => {
          return release();
        });
      } else {
        release();
      }
    }, time);
    this.timers.add(timer);
  }

  public popTimers() {
    for (const timer of this.timers) {
      clearTimeout(timer);
      this.timers.delete(timer);
    }
  }

  private ID() {
    return (++TaskQueue.AutoIncrementingID).toString();
  }
}
