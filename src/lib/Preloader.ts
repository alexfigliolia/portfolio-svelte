export class Preloader {
  private static readonly smallImages = [
    "./images/wordClouds-small.png",
    "./images/skedge-small.jpg",
    "./images/react-small.jpg",
    "./images/sv-small.jpg",
    "./images/gnocchi-small.jpg",
    "./images/republic-small.jpg",
    "./images/dog-small.jpg",
    "./images/cityweb-small.jpg",
    "./images/nightsky-small.jpg",
    "./images/winter3.jpg",
    "./images/tree-small.jpg",
  ];
  private static readonly largeImages = [
    "./images/wordClouds.png",
    "./images/skedge-desktop2.jpg",
    "./images/react-desktop2.jpg",
    "./images/sv-large.jpg",
    "./images/gnocchi.jpg",
    "./images/republic-large.jpg",
    "./images/dog.jpg",
    "./images/cityweb.jpg",
    "./images/nightsky.jpg",
    "./images/winter1.jpg",
    "./images/tree.jpg",
  ];

  public static initialize(width: number) {
    const loaded = [];
    const imgs = width >= 670 ? this.largeImages : this.smallImages;
    for (let i = 0; i < imgs.length; i++) {
      const img = new Image();
      img.src = imgs[i];
      loaded[i] = img;
    }
  }
}
