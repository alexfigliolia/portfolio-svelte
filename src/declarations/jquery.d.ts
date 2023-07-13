declare module "jquery" {
  interface jQuery {
    ripples: (
      config:
        | {
            resolution: number;
            dropRadius: number;
            perturbance: number;
          }
        | string,
    ) => void;
  }
  type jQuery = (selector: string) => HTMLElement;
  export default jQuery;
}
