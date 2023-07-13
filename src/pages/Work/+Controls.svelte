<script lang="ts">
  import Up from "$lib/images/up.svg";
  import Down from "$lib/images/down.svg";

  export let scroll: (e: MouseEvent) => void;
</script>

<div class="controls">
  <div class="bar" />
  <button on:click={scroll} class="control" data-direction="left">
    <img src={Up} alt="Go to previous" />
  </button>
  <button on:click={scroll} class="control" data-direction="right">
    <img src={Down} alt="Go to next" />
  </button>
</div>

<style lang="scss">
  @use "$lib/variables";
  .controls {
    position: fixed;
    top: calc(50% - 120px);
    right: 5%;
    z-index: 9028345709238475;
    height: 200px;
    width: 60px;
    @include variables.center;
    flex-direction: column;
    justify-content: space-around;
    & > .bar {
      position: absolute;
      top: calc(50% - 24.25px);
      left: calc(50% - 1px);
      height: 49.25px;
      width: 2px;
      background: #fff;
      @include variables.buttonShadow;
    }
    & > button {
      position: relative;
      height: 50px;
      width: 50px;
      border: 2px solid #fff;
      background-color: transparent;
      outline: none;
      border-radius: 50%;
      @include variables.center;
      transition-duration: 0.25s;
      @include variables.buttonShadow;
      & > img {
        height: 70%;
        width: 70%;
        pointer-events: none;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    & > button:last-of-type > img {
      margin-top: 15%;
    }
  }
</style>
