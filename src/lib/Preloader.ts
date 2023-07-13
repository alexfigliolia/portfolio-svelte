import { get } from "svelte/store";
import { rawWidth } from "./state/AppState";

export class Preloader {
  private static readonly smallImages = [
    "src/lib/images/atl-small.jpg",
    "src/lib/images/carta-small.jpg",
    "src/lib/images/wordClouds-small.png",
    "src/lib/images/skedge-small.jpg",
    "src/lib/images/react-small.jpg",
    "src/lib/images/sv-small.jpg",
    "src/lib/images/gnocchi-small.jpg",
    "src/lib/images/republic-small.jpg",
  ];
  private static readonly largeImages = [
    "src/lib/images/atl-large.jpg",
    "src/lib/images/carta-large.jpg",
    "src/lib/images/wordClouds.png",
    "src/lib/images/skedge-desktop2.jpg",
    "src/lib/images/react-desktop2.jpg",
    "src/lib/images/sv-large.jpg",
    "src/lib/images/gnocchi.jpg",
    "src/lib/images/republic-large.jpg",
  ];

  public static initialize() {
    const loaded = [];
    const imgs = get(rawWidth) >= 670 ? this.largeImages : this.smallImages;
    for (let i = 0; i < imgs.length; i++) {
      const img = new Image();
      img.src = imgs[i];
      loaded[i] = img;
    }
  }
}
