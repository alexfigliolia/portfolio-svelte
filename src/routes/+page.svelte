<script lang="ts">
  import BackgroundText from "$lib/components/BackgroundText.svelte";
  import BorderButton from "$lib/components/BorderButton.svelte";
  import IntroText from "$lib/components/IntroText.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { AppState } from "$lib/state/AppState";

  class HomeState {
    static classes = "home";
    static activateText = false;
    static buttonActive = false;

    public static navigate() {
      window.location.hash = "Work";
    }
  }

  onMount(() => {
    AppState.TaskQueue.registerTask(() => {
      if (browser) {
        HomeState.classes = "home home-show";
        HomeState.activateText = true;
        AppState.TaskQueue.defer(() => {
          HomeState.buttonActive = true;
        }, 1500);
        // @ts-ignore
        void Promise.all([import("jquery"), import("ripples")]).then(
          // @ts-ignore
          ([{ default: JQ }]) => {
            JQ("#home").ripples({
              resolution: 512,
              dropRadius: 10,
              perturbance: 0.02,
            });
          },
        );
      }
    });
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Alex Figliolia's Portfolio" />
</svelte:head>

<section class={HomeState.classes} id="home">
  <BackgroundText text="Alex" active={HomeState.activateText} />
  <BackgroundText text="Figliolia" active={HomeState.activateText} />
  <div>
    <IntroText active={HomeState.activateText} />
    <BorderButton
      text="Work"
      active={HomeState.activateText}
      disabled={!HomeState.buttonActive}
      func={HomeState.navigate.bind(HomeState)}
    />
  </div>
</section>

<style lang="scss">
  @use "$lib/variables.scss";
  .home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url("$lib/images/COMPR-sm.jpg") no-repeat;
    background-position: 50% 100%;
    background-size: cover;
    @include variables.center;
    color: #fff;
    transition-duration: 0.3s;
    position: relative;
    @media #{variables.$mq-670} {
      background: url("$lib/images/COMPR.jpg") no-repeat;
      background-position: 50% 100%;
      background-size: cover;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      background: rgba(#000, 0.46);
      z-index: 0;
    }
    & > div {
      @include variables.center;
      z-index: 3;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 50px;
      perspective: 1000;
      @media #{variables.$mq-670} {
        margin-top: 80px;
      }
    }
  }
</style>
