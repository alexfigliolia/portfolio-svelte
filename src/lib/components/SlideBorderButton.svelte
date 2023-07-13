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
  $: if (!active) {
    classes = "three-dee-button";
  }

  onMount(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  class ButtonState {
    static left = 0;
    static top = 0;
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

    private static setFrame(rotation: { rotX: number; rotY: number }, duration: number) {
      rotX = rotation.rotX;
      rotY = rotation.rotY;
      bTransDur = `${duration}s`;
      scale = 1.1;
      boxShadow = `0 14px 28px rgba(0,0,0,0.5), ${rotation.rotY * -1.85}px ${
        rotation.rotX
      }px 10px rgba(0,0,0,0.44)`;
    }

    public static mouseEnter({ clientX, clientY, target }: MouseEvent) {
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
    outline: none;
    border: none;
    padding: 0;
    height: 50px;
    width: 120px;
    z-index: 10;
    background: transparent;
    transform: skew(-5deg);
    text-transform: uppercase;
    position: relative;
    user-select: none;
    margin-top: 20px;
    @include variables.center;
    transition: transform 0.5s 0s, box-shadow 0.5s 0s;
    z-index: 3;
    transform-style: preserve-3d;
    @media #{variables.$mq-670} {
      width: 140px;
      height: 55px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0px;
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
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      color: transparent;
      z-index: 2;
      user-select: none;
      @include variables.center;
      font-size: 1em;
      font-weight: 900;
      transition-duration: 0.35s;
      position: relative;
      top: -2px;
      color: transparent;
      pointer-events: none;
      @media #{variables.$mq-670} {
        width: 130px;
        height: 55px;
      }
      &::before {
        content: "";
        position: absolute;
        top: 2.5px;
        left: 10%;
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
        right: 10%;
        width: 2px;
        height: 0%;
        z-index: 3;
        background: #fff;
        transition-duration: 0.25s;
        pointer-events: none;
      }
    }
    &.active {
      &::after {
        width: 50.5%;
        transition-delay: 1.1s;
      }
      &::before {
        width: 50.5%;
        transition-delay: 1.1s;
      }
      & > h3 {
        color: #fff;
        text-shadow: 0px 2.5px 5px rgba(#000, 0.5), 0px 5px 10px rgba(#000, 0.5);
        transition-delay: 1.3s;
        &::before {
          height: 30%;
          transition-delay: 1.4s;
        }
        &::after {
          height: 30%;
          transition-delay: 1.4s;
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
    &:hover {
      transform: scale(1.1) skew(-5deg);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.35), 0 6px 6px rgba(0, 0, 0, 0.5);
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
  }
</style>
