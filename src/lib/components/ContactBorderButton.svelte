<script lang="ts">
  import { onMount } from "svelte";

  export let url = "";
  export let text = "";
  export let active = false;
  export let func: (event: MouseEvent) => void;

  let classes = "three-dee-button";
  let rotX = 0;
  let rotY = 0;
  let bTransDur = `0.5s`;
  let scale = 1;
  let boxShadow = "none";
  let resetDelays = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  $: if (active && !resetDelays) {
    classes = "three-dee-button active";
    timer = setTimeout(() => {
      classes = "three-dee-button active reset-delays";
    }, 1500);
  }

  onMount(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  class ButtonState {
    static top = 0;
    static left = 0;
    static height = 0;
    static width = 0;
    static mathX = 0;
    static mathY = 0;

    private static cacheTargetData(target: HTMLButtonElement) {
      if (!this.left || !this.height || !this.width) {
        const { left, top } = target.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = target;
        this.left = left;
        this.top = top;
        this.height = offsetHeight;
        this.width = offsetWidth;
        this.mathX = this.left + this.width / 2;
        this.mathY = this.top + this.height / 2;
      }
    }

    private static getRotations({ x, y }: { x: number; y: number }) {
      const rotX = (this.mathY - y) / 1.75;
      return {
        rotX: rotX > 0 ? rotX + 4 : rotX,
        rotY: (this.mathX - x) / -10,
      };
    }

    private static setFrame(
      rotation: { rotX: number; rotY: number },
      duration: number,
    ) {
      if (!active) {
        return;
      }
      rotX = rotation.rotX;
      rotY = rotation.rotY;
      bTransDur = `${duration}s`;
      scale = 1.1;
      boxShadow = `0 14px 28px rgba(0,0,0,0.5), ${rotation.rotY * -1.85}px ${
        rotation.rotX
      }px 10px rgba(0,0,0,0.44)`;
    }

    public static mouseEnter({ clientX, clientY, target }: MouseEvent) {
      if (!active) {
        return;
      }
      this.cacheTargetData(target as HTMLButtonElement);
      this.setFrame(
        this.getRotations({
          y: clientY,
          x: clientX,
        }),
        0.5,
      );
    }

    public static touchStart({ target, touches }: TouchEvent) {
      if (!active) {
        return;
      }
      this.cacheTargetData(target as HTMLButtonElement);
      this.setFrame(
        this.getRotations({
          y: touches[0].clientY,
          x: touches[0].clientX,
        }),
        0.5,
      );
    }

    public static mouseMove({ clientX, clientY }: MouseEvent) {
      this.setFrame(
        this.getRotations({
          y: clientY,
          x: clientX,
        }),
        0,
      );
    }

    public static touchMove({ touches }: TouchEvent) {
      this.setFrame(
        this.getRotations({
          y: touches[0].clientY,
          x: touches[0].clientX,
        }),
        0,
      );
    }

    public static mouseLeave() {
      rotX = 0;
      rotY = 0;
      scale = 1;
      bTransDur = "0.5s";
      boxShadow = "none";
    }
  }
</script>

<button
  class={classes}
  on:click={func}
  on:mouseenter={ButtonState.mouseEnter.bind(ButtonState)}
  on:mousemove={ButtonState.mouseMove.bind(ButtonState)}
  on:mouseleave={ButtonState.mouseLeave.bind(ButtonState)}
  on:touchstart={ButtonState.touchStart.bind(ButtonState)}
  on:touchend={ButtonState.mouseLeave.bind(ButtonState)}
  on:touchmove={ButtonState.touchMove.bind(ButtonState)}
  style="box-shadow: {boxShadow}; transition-duration: {bTransDur}; transform: rotateX({rotX}deg) rotateY({rotY}deg) skew(-5deg) scale({scale});"
  data-page="Work"
  data-url={url || null}
>
  <h3>{text}</h3>
</button>

<style lang="scss">
  @use "$lib/variables.scss";

  .three-dee-button {
    margin: 20px;
    outline: none;
    border: none;
    height: 60px;
    width: 200px;
    background: transparent;
    transform: skew(-5deg);
    text-transform: uppercase;
    position: relative;
    @include variables.center;
    transition: transform 0.5s 0s, box-shadow 0.5s 0s;
    user-select: none;
    z-index: 3;
    user-select: none;
    transform-style: preserve-3d;
    pointer-events: none;
    @media #{variables.$mq-375} {
      height: 70px;
      width: 230px;
    }
    @media #{variables.$mq-957} {
      height: 80px;
      width: 260px;
    }
    @media #{variables.$mq-h-1024} {
      height: 110px;
      width: 320px;
      margin-top: 40px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 2px;
      background: #fff;
      transition-duration: 0.25s;
      pointer-events: none;
    }
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0%;
      height: 2px;
      background: #fff;
      transition-duration: 0.25s;
      pointer-events: none;
    }
    & > h3 {
      height: 60px;
      width: 200px;
      margin: 0;
      padding: 0;
      color: transparent;
      user-select: none;
      z-index: 2;
      @include variables.center;
      font-size: 1.25em;
      font-weight: 900;
      transition-duration: 0.35s;
      position: relative;
      top: -2px;
      user-select: none;
      pointer-events: none;
      @media #{variables.$mq-375} {
        height: 70px;
        width: 230px;
      }
      @media #{variables.$mq-410} {
        font-size: 1.5em;
      }
      @media #{variables.$mq-670} {
        font-size: 1.5em;
      }
      @media #{variables.$mq-957} {
        height: 80px;
        width: 220px;
      }
      @media #{variables.$mq-h-1024} {
        height: 110px;
        width: 320px;
        font-size: 2em;
      }
      &::before {
        content: "";
        position: absolute;
        top: 2px;
        left: 0;
        width: 2px;
        height: 0%;
        z-index: 3;
        background: #fff;
        transition-duration: 0.25s;
        pointer-events: none;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2px;
        height: 0%;
        z-index: 3;
        background: #fff;
        transition-duration: 0.25s;
        pointer-events: none;
      }
    }
    &.active {
      pointer-events: initial;
      &:hover {
        transform: scale(1.1) skew(-5deg);
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.35),
          0 6px 6px rgba(0, 0, 0, 0.5);
        &::after {
          height: 100%;
          transition-delay: 0s;
        }
        &::before {
          height: 100%;
          transition-delay: 0s;
        }
        & > h3 {
          color: #000;
          text-shadow: none;
        }
      }
      &::after {
        width: 51%;
        transition-delay: 1s;
      }
      &::before {
        width: 51%;
        transition-delay: 1s;
      }
      & > h3 {
        color: #fff;
        text-shadow: 0px 2.5px 5px #000, 0px 5px 10px #000;
        transition-delay: 1.7s;
        &::before {
          height: 50%;
          transition-delay: 1.3s;
        }
        &::after {
          height: 50%;
          transition-delay: 1.3s;
        }
      }
    }
    &.reset-delays {
      transition-delay: 0s;
      &::after {
        transition-delay: 0s;
      }
      &::before {
        transition-delay: 0s;
      }
      & > h3 {
        transition-delay: 0s;
        &::before {
          transition-delay: 0s;
        }
        &::after {
          transition-delay: 0s;
        }
      }
    }
  }
</style>
