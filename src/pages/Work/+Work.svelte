<script lang="ts">
  import { browser } from "$app/environment";
  import { AppState, height, width } from "$lib/state/AppState";
  import { onMount } from "svelte";
  import Controls from "./+Controls.svelte";
  import Slide from "./+Slide.svelte";
  import API from "./API";
  import PageSwitch, { type PageSwitch as PW } from "pageswitch";

  class WorkState {
    static PW: PW;
    static rawWidth = 0;
    static selectedIndex = 0;
    static isDesktop = false;
    static pageLoaded = false;

    public static scroll({
      target: {
        // @ts-ignore
        dataset: { direction },
      },
    }: MouseEvent) {
      direction === "right" ? this.PW.next() : this.PW.prev();
    }

    public static createPW() {
      const desktop = WorkState.rawWidth > 957;
      return new PageSwitch("slides", {
        duration: 750,
        direction: desktop ? 1 : 0,
        start: 0,
        loop: true,
        ease: "ease",
        transition: desktop ? "flip3d" : "flip3dY",
        freeze: false,
        mouse: true,
        mousewheel: true,
        arrowkey: true,
      });
    }
  }

  onMount(() => {
    WorkState.rawWidth = window.innerWidth;
    width.subscribe(() => {
      WorkState.rawWidth = window.innerWidth;
      if (WorkState.PW) {
        WorkState.PW.setTransition(window.innerWidth > 957 ? "flip3d" : "flip3dY");
      }
    });
    if (browser) {
      WorkState.PW = WorkState.createPW();
      WorkState.PW.on("after", () => {
        WorkState.selectedIndex = WorkState.PW.current;
      });
      AppState.TaskQueue.registerTask(() => {
        WorkState.pageLoaded = true;
      });
    }
  });
</script>

<svelte:head>
  <title>Work</title>
  <meta name="description" content="Alex Figliolia's Portfolio" />
</svelte:head>

<div class="work-wrapper" style="height: {$height}; width: {$width};">
  <div style="height: {$height}; width: {$width};">
    {#if WorkState.rawWidth > 956}
      <Controls scroll={WorkState.scroll.bind(WorkState)} />
    {/if}
    <section id="slides" class="work" style="height: {$height};">
      {#each API as obj, index}
        <Slide
          {...obj}
          rawWidth={WorkState.rawWidth}
          pageLoaded={WorkState.pageLoaded}
          scroll={WorkState.scroll.bind(WorkState)}
          active={WorkState.selectedIndex === index}
        />
      {/each}
    </section>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables";
  .work-wrapper {
    height: 100%;
    width: 100%;
    @include variables.center;
    position: fixed;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transform: translate3d(0, 0, 1px);
    background: #fff;
    & > div {
      perspective: 1000px;
      position: relative;
    }
  }
</style>
