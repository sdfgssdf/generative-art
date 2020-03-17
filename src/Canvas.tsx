import React, { useEffect } from "react";

import { Shape } from "./interface";
const Canvas = React.forwardRef(
  (props: any, ref: React.Ref<HTMLCanvasElement>) => {
    const { width, height } = props;
    let canvas: HTMLCanvasElement;
    let gl: CanvasRenderingContext2D | null;

    return (
      <canvas id="canvas" className='canvas' width={width} height={height} ref={ref}></canvas>
    );
  }
);

export default Canvas;
