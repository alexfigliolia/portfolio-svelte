<script lang="ts">
  import "./styles.scss";
  import {
    AppState,
    entryDelay,
    flipController,
    flipDuration,
    frameClasses,
    height,
    menuOpen,
    page,
    shrinkDuration,
  } from "$lib/state/AppState";
  import { browser } from "$app/environment";
  import Loader from "$lib/components/Loader.svelte";
  import Header from "$lib/components/Header.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  let currentPage: any = null;
  class LayoutState {
    static navigators = {
      Home: async () => {
        const m = await import("./+page.svelte");
        currentPage = m.default;
      },
      Work: async () => {
        const m = await import("../pages/Work/+Work.svelte");
        currentPage = m.default;
      },
      Contact: async () => {
        const m = await import("../pages/Contact/+Contact.svelte");
        currentPage = m.default;
      },
    };

    public static getRoute() {
      const nextRoute =
        (window.location.hash.slice(
          1,
        ) as keyof typeof LayoutState.navigators) || "Home";
      page.update(() => nextRoute);
      return LayoutState.navigators[nextRoute];
    }

    public static navigate() {
      let timeout = 0;
      if ($menuOpen) {
        AppState.toggleMenu();
        timeout = 800;
      }
      AppState.navigate(timeout, this.getRoute());
    }
  }

  if (browser) {
    AppState.setDimensions();
    void LayoutState.getRoute()();
    window.addEventListener("resize", () => {
      AppState.setDimensions();
    });
    window.addEventListener(
      "hashchange",
      LayoutState.navigate.bind(LayoutState),
      true,
    );
    AppState.defer(() => {
      AppState.enter();
      entryDelay.update(() => 600);
    }, get(entryDelay));
  }

  onMount(() => {
    return () => {
      AppState.popTimers();
    };
  });
</script>

<div class="app" style={`height: ${$height}`}>
  <div
    class={$frameClasses}
    style="height: {$height}; transition-duration: {$shrinkDuration}ms;"
  >
    <div class={$flipController} style="transition-duration: {$flipDuration}ms">
      <div class="frame-side front">
        <Header />
        <Menu />
        {#if currentPage !== null}
          <svelte:component this={currentPage} />
        {/if}
      </div>
      <div class="frame-side back">
        <Loader />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .app {
    width: 100%;
    height: 100vh;
    max-width: 100%;
    background-color: #fff;
    @include variables.center;
    & > .frame {
      width: 100%;
      height: 100vh;
      @include variables.center;
      background-color: #fff;
      position: relative;
      transition-delay: 1s;
      transition-property: transform;
      perspective: 900px;
      @media #{variables.$mq-670} {
        perspective: 1200px;
      }
      &.shrink {
        transition-delay: 0s;
        transition-property: transform;
        transform: scale(0.85);
        @media #{variables.$mq-957} {
          transform: scale(0.75);
        }
      }
      & > .flip-controller {
        height: 100%;
        width: 100%;
        position: relative;
        transform-style: preserve-3d;
        &.flip-active {
          transition-delay: 0.5s;
          transform: rotateY(180deg);
          @media #{variables.$mq-957} {
            transform: rotateX(180deg);
            perspective: 1200px;
          }
        }
        & > .frame-side {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          box-shadow: 0px 5px 10px rgba(#000, 0.25);
          &.front {
            @include variables.center;
            background-color: #fff;
          }
          &.back {
            @include variables.center;
            @include variables.gradient;
            transform: rotateY(180deg);
            @media #{variables.$mq-957} {
              transform: rotateX(180deg);
            }
          }
        }
      }
    }
  }
</style>
