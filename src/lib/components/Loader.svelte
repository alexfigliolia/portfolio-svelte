<script lang="ts">
  import { loading } from "$lib/state/AppState";
</script>

<section class={`loader ${$loading ? "loader-show" : ""}`}>
  <div>
    <div class="showbox">
      <div class="svg-container">
        <svg class="circular" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-miterlimit="10" />
        </svg>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../variables.scss";
  .loader {
    position: relative;
    height: 100%;
    width: 100%;
    @include variables.center;
    @include variables.gradient;
    & > div {
      opacity: 0;
      @include variables.center;
      width: 100%;
      height: 100%;
      transition-duration: 0.3s;
      & > .showbox {
        @include variables.center;
        width: 150px;
        height: 150px;
      }
    }
  }

  .svg-container {
    width: 150px;
    height: 150px;
  }

  .circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    width: 100%;
    transform-origin: center center;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  .loader-show {
    & > div {
      opacity: 1;
    }
  }
</style>
