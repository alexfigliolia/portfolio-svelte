<script lang="ts">
  import { browser } from "$app/environment";
  import SlideBorderButton from "$lib/components/SlideBorderButton.svelte";
  import Left from "$lib/images/left.svg";
  import Right from "$lib/images/right.svg";
  import { height, width } from "$lib/state/AppState";

  export let p1: string;
  export let p2: string;
  export let url: string;
  export let name: string;
  export let imgSmall: any;
  export let imgLarge: any;
  export let active: boolean;
  export let rawWidth: number;
  export let pageLoaded: boolean;
  export let scroll: (e: MouseEvent) => void;

  class SlideState {
    static preloaded = false;
    static infoClasses = "info";
    static img = rawWidth >= 670 ? imgLarge : imgSmall;

    public static visit(e: MouseEvent) {
      if (browser && e.target) {
        // @ts-ignore
        window.open(e.target.dataset.url, "_blank");
      }
    }

    public static switchText() {
      if (SlideState.infoClasses === "info") {
        SlideState.infoClasses = "info change-info";
      } else {
        SlideState.infoClasses = "info";
      }
    }
  }

  $: {
    SlideState.img = rawWidth >= 670 ? imgLarge : imgSmall;
  }
</script>

<div
  class={active && pageLoaded ? "project is-selected" : "project"}
  style="height: {$height}; width: {$width};"
>
  <div class="center-stuff" style="height: {$height}; width: {$width};">
    <img src={SlideState.img} alt={name} />
    <div>
      <h2>
        {#each name.split("") as letter, index}
          {#if letter === " "}
            <div>&nbsp;&nbsp;&nbsp;</div>
          {/if}
          {#if letter !== " "}
            <div style="transition-delay: {0.3 + index / 20}s;">{letter}</div>
          {/if}
        {/each}
      </h2>
      <div class={SlideState.infoClasses}>
        <p>
          {p1}
          <button on:click={SlideState.switchText.bind(SlideState)}
            >&nbsp;More Info</button
          >
        </p>
        <p class={rawWidth < 957 ? "text-switch" : ""}>
          {p2}
          <button on:click={SlideState.switchText.bind(SlideState)}
            >&nbsp;Back</button
          >
        </p>
      </div>
      <div class="slide-buttons">
        <button class="scroller" on:click={scroll} data-direction="left">
          <img
            alt="View previous project"
            style="margin-left: 0%; margin-right: 10%;"
            src={Left}
          />
        </button>
        <SlideBorderButton
          {url}
          text="VISIT"
          active={active && pageLoaded}
          func={SlideState.visit.bind(SlideState)}
        />
        <button class="scroller" on:click={scroll} data-direction="right">
          <img
            alt="View next project"
            style="margin-left: 10%; margin-right: 0%;"
            src={Right}
          />
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables";
  .project {
    @include variables.headerShadow;
    backface-visibility: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .project > .center-stuff {
    @include variables.center;
    position: relative;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
  }

  .project > .center-stuff > div {
    flex-direction: column;
    width: 100%;
    max-width: 1150px;
    align-self: flex-end;
    height: auto;
    z-index: 4;
    margin-bottom: 30px;
    left: 0;
    & > h2 {
      font-size: 12.5vw;
      font-weight: 900;
      letter-spacing: -0.5vh;
      @include variables.center;
      margin: 0;
      margin-bottom: -5px;
      text-transform: uppercase;
      z-index: 3;
      color: #fff;
      text-shadow: 0px 0px 5px rgba(#000, 0.25), 0px 2.5px 10px #000,
        0px 7.5px 12.5px rgba(#000, 0.33);
      @media #{variables.$mq-670} {
        font-size: 7.5vh;
      }
      & > div {
        transform: translateX(300%) scale(0);
        transition-duration: 0.5s;
      }
    }
    & > .info {
      width: 100%;
      margin: auto;
      overflow: hidden;
      margin-bottom: 5px;
      position: relative;
      @include variables.center;
      flex-direction: column;
      @media #{variables.$mq-670} {
        margin-bottom: 10px;
      }
      @media #{variables.$mq-957} {
        flex-direction: row;
        justify-content: space-between;
        width: 95%;
        align-items: flex-start;
        margin-top: 10px;
      }
      @media #{variables.$mq-h-1024} {
        margin-bottom: 30px;
      }
      & > p {
        font-family: "Roboto Condensed", sans-serif;
        font-size: 3.25vh;
        color: #fff;
        z-index: 3;
        // text-align: center;
        font-weight: 700;
        line-height: 1.2;
        width: 90%;
        letter-spacing: -0.25px;
        text-shadow: 0px 0px 2.5px #000, 0px 0px 5px #000, 0px 0px 7.5px #000;
        transform: translateY(50%);
        margin-left: 3%;
        opacity: 0;
        transition-delay: 0s;
        transition-duration: 0.75s;
        text-align: left;
        @media #{variables.$mq-375} {
          font-size: 3vh;
          line-height: 1.3;
        }
        @media #{variables.$mq-670} {
          line-height: 1.5;
          max-width: 750px;
          font-size: 3.5vh;
        }
        @media #{variables.$mq-957} {
          width: 46%;
          line-height: 1.5;
          font-size: 1.25em;
          transform: translateY(100%);
          transition-duration: 0.75s;
          margin-left: 2.5%;
        }
        @media #{variables.$mq-h-1024} {
          font-size: 2em;
        }
        & > button {
          outline: none;
          border: none;
          background-color: transparent;
          color: #ed4351;
          cursor: pointer;
          margin: 0;
          padding: 0;
          letter-spacing: -0.25px;
          text-shadow: 0px 0px 2.5px #000, 0px 0px 5px #000, 0px 0px 7.5px #000;
          @media #{variables.$mq-957} {
            display: none;
          }
        }
      }
      & > .text-switch {
        position: absolute;
        top: 0;
        left: 5%;
        transform: translateY(100%);
        opacity: 0;
        z-index: 2;
        @media #{variables.$mq-957} {
          display: initial;
          position: static;
          transform: none;
          opacity: 1;
        }
      }
    }
    & > .change-info {
      & > p:first-of-type {
        // display: none;
        transform: translateY(100%);
        opacity: 0;
        @media #{variables.$mq-957} {
          display: initial;
        }
      }
      & > p:last-of-type {
        transform: translateY(0%);
        opacity: 1;
        @media #{variables.$mq-957} {
          display: initial;
        }
      }
    }
    & > .slide-buttons {
      width: 100%;
      @include variables.center;
      justify-content: space-around;
      perspective: 1000;
      & > .scroller {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        outline: none;
        border: 2px solid #fff;
        @include variables.center;
        background-color: transparent;
        margin: 0;
        padding: 0;
        transform: scale(0);
        transition-duration: 0.3s;
        @media #{variables.$mq-957} {
          display: none;
        }
        & > img {
          height: 60%;
          width: 60%;
        }
      }
    }
  }

  .is-selected > .center-stuff > div {
    & > h2 > div {
      transform: translateX(0%) scale(1);
    }
    & > .info > p {
      // transform: translateX(0%);
      transform: translateY(0%);
      opacity: 1;
      transition-delay: 0.5s;
    }
    & > .slide-buttons {
      & > .scroller {
        transform: scale(1);
        transition-delay: 1.8s;
        @media #{variables.$mq-957} {
          transform: rotate(90deg) scale(1);
        }
        & > img {
          pointer-events: none;
        }
      }
    }
  }

  .project:nth-of-type(1) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.35) 80%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.5) 80%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(2) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.35) 80%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.4) 80%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(3) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.35) 80%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.35) 90%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(4) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.35) 80%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.4) 90%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(5) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      rgba(#000, 0),
      rgba(#000, 0.35) 100%
    );
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.4) 90%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(6) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.45) 90%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.35) 90%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(7) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.4) 90%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.5) 90%
      );
      background-size: cover;
    }
  }

  .project:nth-of-type(10) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.3) 90%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.25) 80%
      );
      background-size: cover;
    }
  }

  .snow-container {
    position: absolute;
    height: 500px;
    width: 100%;
    max-width: 100%;
    top: 0;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
  }

  .snow {
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    transform: translate3d(0, -100%, 0);
    animation: snow linear infinite;
  }
  .snow.foreground {
    background-image: url("https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-large-075d267ecbc42e3564c8ed43516dd557.png");
    animation-duration: 15s;
  }
  .snow.foreground.layered {
    animation-delay: 7.5s;
  }
  .snow.middleground {
    background-image: image-url(
      "https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-medium-0b8a5e0732315b68e1f54185be7a1ad9.png"
    );
    animation-duration: 20s;
  }
  .snow.middleground.layered {
    animation-delay: 10s;
  }
  .snow.background {
    background-image: image-url(
      "https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-small-1ecd03b1fce08c24e064ff8c0a72c519.png"
    );
    animation-duration: 30s;
  }
  .snow.background.layered {
    animation-delay: 15s;
  }

  @keyframes snow {
    0% {
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      -webkit-transform: translate3d(15%, 100%, 0);
      transform: translate3d(15%, 100%, 0);
    }
  }

  .project:nth-of-type(11) > .center-stuff::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#000, 0), rgba(#000, 0.3) 60%);
    background-size: cover;
    @media #{variables.$mq-670} {
      background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.25) 50%
      );
      background-size: cover;
    }
  }
</style>
