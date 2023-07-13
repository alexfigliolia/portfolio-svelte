<script lang="ts">
  export let text: string;
  export let active = false;
</script>

<h2 class={`bg-text ${active ? "active" : ""}`}>
  {#each text.split("") as letter, index}
    <div
      style={`transition: transform 0.5s ${
        2 + (index * index) / 100
      }s, opacity 0.5s ${
        2 + (index * index) / 100
      }s, color 0.3s 0s, text-shadow 0.3s 0s;`}
    >
      {letter}
    </div>
  {/each}
</h2>

<style lang="scss">
  @use "$lib/variables.scss";
  .bg-text {
    font-size: 12vh;
    font-weight: 900;
    letter-spacing: -4px;
    @include variables.center;
    position: absolute;
    top: 10%;
    left: 0;
    margin: 0;
    text-transform: uppercase;
    z-index: 3;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    @media #{variables.$mq-h-635} {
      font-size: 10vh;
    }
    @media #{variables.$mq-670} {
      font-size: 16vh;
      letter-spacing: -9px;
    }
    @media #{variables.$mq-957} {
      font-size: 27.5vh;
      letter-spacing: -14px;
    }
    @media #{variables.$mq-h-1024} {
      top: 10%;
      font-size: 15vh;
      letter-spacing: -9px;
    }
    & > div {
      z-index: 2;
      color: rgba(#fff, 0.1);
      transform: translateY(100%);
      opacity: 0;
      transform-origin: 0% 50%;
      transition-duration: 0.3s;
      &:hover {
        color: rgba(#fff, 0.9);
        text-shadow: 0px 2.5px 5px #000, 0px 5px 10px #000;
        @media #{variables.$mq-670} {
          text-shadow: 0px 2.5px 5px #000, 0px 5px 10px #000,
            0px 7.5px 15px #000;
        }
      }
    }
  }

  .bg-text:last-of-type {
    left: auto;
    right: 0;
    top: auto;
    bottom: 2.5%;
    & > div {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  .bg-text.active > div {
    transform: translateY(0%);
    opacity: 1;
  }

  .bg-text.active:last-of-type > div {
    transform: translateY(0%);
    opacity: 1;
  }
</style>
