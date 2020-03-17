import { recursion1 } from "./drawMethod";

export enum Shape {
  square = 0,
  circle = 1
}
export interface CarouselOption {
  name: string;
  url: string;
}
export enum TYPE {
  TILE = "瓷砖",
  RECURSION = "递归"
}
export interface InputDetail {
  canvasSetup: { width: number; height: number; backgroundColor: string };
  type: TYPE;
  inputDetail: {
    tile: {
      pattern: number;
      color: string;
      colorVal: string;
      size: number;
      density: string;
      lineWidth: string;
    };
    recursion: {
      pattern: number;
      color: string;
      colorVal: string;
      depth: number;
      isFill: string;
      lineWidth: string;
    };
  };
}
