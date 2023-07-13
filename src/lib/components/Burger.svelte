<script lang="ts">
  import { AppState, menuOpen } from "$lib/state/AppState";
</script>

<button
  id="hamburger"
  on:click={AppState.toggleMenu.bind(AppState)}
  class={$menuOpen ? "hamburglar is-closed" : "hamburglar is-open"}
>
  <div id="top" />
  <svg
    id="svb"
    x="0px"
    y="0px"
    width="64px"
    height="64px"
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
    xml:space="preserve"
  >
    <path
      id="circle"
      fill="none"
      stroke-width="2"
      stroke-miterlimit="10"
      d="M16,32h32c0,0,11.723-0.306,10.75-11 c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32 c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32"
    />
  </svg>
  <div id="bottom1" />
</button>

<style lang="scss">
  @use "$lib/variables";

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #hamburger {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    margin: 0;
    transform: scale(0.65);
    left: 10px;
    width: 64px;
    height: 64px;
    background: transparent;
    transition-duration: 0.3s;
    transition-delay: 1s;
    user-select: none;
    position: relative;
    border-radius: 50%;
    background: rgba(#fff, 0.35);
    @include variables.burgerShadow;
    @media #{variables.$mq-670} {
      transform: scale(0.85);
      top: 7.5px;
      left: 5px;
    }
  }
  #top,
  #bottom1 {
    position: absolute;
    display: block;
    height: 2px;
    width: 34px;
    background: #fff;
  }
  #top {
    top: 21px;
    left: 15px;
  }
  #bottom1 {
    top: 41px;
    left: 15px;
  }

  #hamburger path {
    stroke: #fff;
    stroke-linecap: round;
  }

  #top,
  #bottom1 {
    -webkit-transform-origin: 34px 2px;
    transform-origin: 34px 2px;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all 0.5s cubic-bezier(0.8, -1.1, 0.5, 1.9);
    transition: all 0.5s cubic-bezier(0.8, -1.1, 0.5, 1.9);
  }
  #circle {
    stroke-dasharray: 1 100 32 300;
    stroke-dashoffset: 101;
    -webkit-transition: all 0.75s ease;
    transition: all 0.75s ease;
  }

  .hamburglar.is-closed #circle {
    stroke-dasharray: 1 100 190 300;
    stroke-dashoffset: 1;
  }

  .hamburglar.is-closed #top {
    -webkit-transform: translateX(-2.5px) rotate(-45deg) translateY(-3px);
    transform: translateX(-2.5px) rotate(-45deg) translateY(-3px);
  }

  .hamburglar.is-closed #bottom1 {
    -webkit-transform: translateX(-4px) rotate(45deg) translateY(2px);
    transform: translateX(-4px) rotate(45deg) translateY(2px);
  }
</style>
