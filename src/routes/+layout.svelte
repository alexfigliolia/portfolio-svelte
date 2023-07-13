<script lang="ts">
  import "./styles.scss";
  import {
    AppState,
    entryDelay,
    flipController,
    height,
    menuOpen,
    page,
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

  onMount(() => {
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
    return () => {
      AppState.popTimers();
    };
  });
</script>

<div class="app" style={`height: ${$height}`}>
  <div class={$flipController}>
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

<style lang="scss">
  @use "$lib/variables.scss";
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .app {
    width: 100%;
    height: 100vh;
    max-width: 100%;
    background-color: #fff;
    @include variables.center;
    opacity: 0;
    animation: opacity 0.5s forwards;
    perspective: 1000px;
    transform-style: preserve-3d;
    position: fixed;
    top: 0;
    left: 0;
    @media #{variables.$mq-957} {
      perspective: 1500px;
    }
    & > .flip-controller {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.75s;
      transform-style: preserve-3d;
      @media #{variables.$mq-957} {
        transition: transform 0.85s;
      }
      &.shrink {
        transform: rotateX(0deg) scale(0.85);
        transition-duration: 0.65s;
        @media #{variables.$mq-957} {
          transition-duration: 0.8s;
        }
        @media #{variables.$mq-957} {
          transform: rotateY(0deg) scale(0.75);
        }
        &.flip-active {
          transition-delay: 0.5s;
          transform: rotateY(180deg) scale(0.85);
          transition-duration: 1s;
          @media #{variables.$mq-957} {
            transform: rotateX(180deg) scale(0.75);
            perspective: 1200px;
          }
        }
      }
      & > .frame-side {
        height: 100%;
        width: 100%;
        @include variables.center;
        @include variables.headerShadow;
        transform: translate3d(0, 0, 1px);
        backface-visibility: hidden;
        transform-style: preserve-3d;
        &.front {
          position: relative;
          overflow: hidden;
          backface-visibility: hidden;
          z-index: 2;
          transform: rotateY(0deg);
          @media #{variables.$mq-957} {
            transform: rotateX(0deg);
          }
        }
        &.back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotateY(180deg);
          @media #{variables.$mq-957} {
            transform: rotateX(180deg);
          }
        }
      }
    }
  }
</style>
