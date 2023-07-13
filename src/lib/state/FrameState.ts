export class FrameController {
  static setShrinkDuration(width: number) {
    if (width < 957) {
      return 500;
    }
    return 700;
  }

  static setFlipDuration() {
    return 1000;
  }
}