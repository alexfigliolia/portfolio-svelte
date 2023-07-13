<script lang="ts">
  import Burger from "./Burger.svelte";

  class HeaderState {
    static navigate() {
      window.location.hash = "Home";
    }
  }
</script>

<header class="header">
  <div>
    <button on:click={HeaderState.navigate.bind(HeaderState)}>
      <h1>
        {#each "FIG".split("") as letter}
          <div>{letter}</div>
        {/each}
      </h1>
    </button>
    <Burger />
  </div>
</header>

<style lang="scss">
  @use "$lib/variables";
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    @include variables.center;
    backface-visibility: hidden;
    z-index: 543232545;
    transform: translate3d(0, 0, 2px);
    & > div {
      @include variables.center;
      justify-content: space-between;
      width: calc(100% - 20px);
      @media #{variables.$mq-670} {
        width: calc(100% - 55px);
      }
      & > button {
        outline: none;
        border: none;
        background-color: transparent;
        box-shadow: none;
        margin: 0;
        padding: 0;
        & > h1 {
          font-size: 2.25em;
          font-weight: 300;
          color: #fff;
          letter-spacing: -3.5px;
          margin: 0;
          padding: 0;
          @include variables.center;
          cursor: pointer;
          @media #{variables.$mq-670} {
            font-size: 3.5em;
          }
          & > div {
            text-shadow: 0px 0px 5px rgba(#000, 0.25), 0px 2.5px 10px #000,
              0px 7.5px 12.5px rgba(#000, 0.33);
            animation: 2s hover 0s infinite;
          }
          & > div:nth-of-type(2) {
            animation: 2s hover 0.5s infinite;
          }
          & > div:nth-of-type(3) {
            animation: 2s hover 1s infinite;
          }
        }
      }
    }
  }

  @keyframes hover {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(1.75px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>
