<script lang="ts">
  import { menuOpen, page } from "$lib/state/AppState";

  export let pageTo: string;

  class Link {
    static hovered = false;
    static navigate() {
      window.location.hash = pageTo;
    }

    public static onTouchStart() {
      this.hovered = true;
    }

    public static onTouchEnd() {
      this.hovered = false;
    }
  }
</script>

<button
  class={`link ${$page === pageTo ? "on-page" : ""} ${
    $menuOpen ? "menu-open" : ""
  }`}
  on:touchstart={Link.onTouchStart.bind(Link)}
  on:touchend={Link.onTouchEnd.bind(Link)}
  on:mouseenter={Link.onTouchStart.bind(Link)}
  on:mouseleave={Link.onTouchEnd.bind(Link)}
  on:click={Link.navigate.bind(Link)}
>
  {#each pageTo.split("") as letter, i}
    <div
      class="link-letter"
      style="transition-delay: {($menuOpen || Link.hovered ? 0 : 0.3) +
        i / 20}s"
    >
      {letter}
    </div>
  {/each}
  <div class="inner">
    {#each pageTo.split("") as letter, i}
      <div
        style="transition-delay: {($menuOpen || Link.hovered ? 0 : 0.3) +
          i / 20}s"
      >
        {letter}
      </div>
    {/each}
  </div>
</button>

<style lang="scss">
  @use "$lib/variables";
  .link {
    outline: none;
    border: none;
    padding: 0;
    background-color: transparent;
    font-size: 10vh;
    letter-spacing: -4px;
    text-transform: uppercase;
    font-weight: 900;
    color: #fff;
    text-shadow: 0px 2.5px 5px rgba(#000, 0.7), 0px 5px 10px rgba(#000, 0.5);
    @include variables.center;
    cursor: pointer;
    position: relative;
    user-select: none;
    transform: translateY(-100%);
    opacity: 0;
    transition-duration: 0.3s;
    @media #{variables.$mq-375} {
      letter-spacing: -7px;
      font-size: 9vh;
    }
    @media #{variables.$mq-957} {
      font-size: 10vh;
      letter-spacing: -8px;
    }
    &:nth-of-type(1) {
      transition-delay: 0.2s;
    }
    &:nth-of-type(2) {
      transition-delay: 0.25s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.3s;
    }
    & > .link-letter {
      pointer-events: none;
      transform: translateY(0%) rotateX(0deg);
      transition-duration: 0.2s;
      user-select: none;
      overflow: visible;
    }
    & > .inner {
      pointer-events: none;
      @include variables.center;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      & > div {
        transform: translateY(-40%) rotateX(90deg);
        transition-duration: 0.2s;
        overflow: visible;
      }
    }
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0%;
      height: 2px;
      background: #fff;
      width: 100%;
      transition-duration: 0.3s;
      transform: scaleX(0);
      transform-origin: 0% 50%;
    }
  }

  .menu-open {
    &.link {
      transform: translateY(0%);
      opacity: 1;
      &:nth-of-type(1) {
        transition-delay: 0.3s;
      }
      &:nth-of-type(2) {
        transition-delay: 0.25s;
      }
      &:nth-of-type(3) {
        transition-delay: 0.2s;
      }
      & > .link-letter {
        transform: translateY(0%) rotateX(0deg);
      }
      &:hover {
        &::before {
          transform: scaleX(1);
        }
        & > .link-letter {
          transform: translateY(40%) rotateX(90deg);
        }
        & > .inner > div {
          transform: translateY(0%) rotateX(0deg);
        }
      }
    }
    &.link.active > .link-letter {
      transform: translateY(0%) rotateX(0deg);
    }
    &.link.on-page::before {
      transform: scaleX(1);
      transition-delay: 0.5s;
    }
  }
</style>
