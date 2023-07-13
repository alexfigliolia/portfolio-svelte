<script>
  import { browser } from "$app/environment";
  import BackgroundText from "$lib/components/BackgroundText.svelte";
  import ContactBorderButton from "$lib/components/ContactBorderButton.svelte";
  import {
    AppState,
    entryDelay,
    flipDuration,
    shrinkDuration,
  } from "$lib/state/AppState";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import ContactText from "./+ContactText.svelte";

  class Contact {
    static textActive = false;
    static classes = "home contact";

    static sendEmail() {
      window.location.href = "mailto:alexfigliolia@gmail.com?subject=Subject";
    }

    static gitHub() {
      window.open("https://github.com/alexfigliolia", "_blank");
    }
  }

  onMount(() => {
    AppState.defer(() => {
      Contact.classes = "contact contact-show";
      Contact.textActive = true;
      AppState.defer(() => {
        Contact.classes = "contact contact-show";
      }, 750);
      if (browser) {
        // @ts-ignore
        void Promise.all([import("jquery"), import("ripples")]).then(
          // @ts-ignore
          ([{ default: JQ }]) => {
            JQ("#contact").ripples({
              resolution: 512,
              dropRadius: 10,
              perturbance: 0.02,
            });
          },
        );
      }
    }, get(flipDuration) + get(shrinkDuration) + get(entryDelay));
  });
</script>

<section id="contact" class={Contact.classes}>
  <BackgroundText text="Alex" active={Contact.textActive} />
  <BackgroundText text="Figliolia" active={Contact.textActive} />
  <div>
    <ContactText active={Contact.textActive} />
    <div class="contact-buttons">
      <ContactBorderButton
        text="Call Me"
        active={Contact.textActive}
        func={() => {}}
      />
      <ContactBorderButton
        text="Email Me"
        active={Contact.textActive}
        func={Contact.sendEmail.bind(Contact)}
      />
      <ContactBorderButton
        text="GitHub"
        active={Contact.textActive}
        func={Contact.gitHub.bind(Contact)}
      />
    </div>
  </div>
</section>

<style lang="scss">
  @use "$lib/variables";
  .contact {
    height: 100%;
    width: 100%;
    background: url("$lib/images/COMPR-sm.jpg") no-repeat;
    background-position: 50% 100%;
    background-size: cover;
    @include variables.center;
    color: #fff;
    transition-duration: 0.3s;
    position: relative;
    overflow: hidden;
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
      flex-direction: column;
      z-index: 3;
      margin-top: 2.5%;
      perspective: 1000;
      width: 100%;
      @media #{variables.$mq-670} {
        margin-top: 5%;
      }
      @media #{variables.$mq-957} {
        margin-top: 2.5%;
      }
      & > .contact-buttons {
        margin-top: 5%;
        @include variables.center;
        justify-content: center;
        flex-direction: column;
        width: 90%;
        max-width: 1000px;
        @media #{variables.$mq-670} {
          flex-direction: row;
          flex-wrap: wrap;
        }
        @media #{variables.$mq-957} {
          margin-top: 2.5%;
        }
      }
    }
  }
</style>
