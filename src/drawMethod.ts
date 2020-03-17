import getRandomInt, {
  getNumberInNormalDistribution,
  calcDistance,
  draw1,
  random
} from "./utils";
import { perlin, seed } from "./ss";
import { InputDetail } from "./interface";
const colors = [
  ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"],
  ["#001f3f", "#7FDBFF", "#3D9970", "#01FF70", "#DDDDDD", "#B10DC9"],
  ["#0074D9", "#FF851B", "#85144b", "#2ECC40", "#FFDC00", "#DDDDDD"]
];
const setRondomColor1 = (gl: CanvasRenderingContext2D) => {
  const index = getRandomInt(0, colors.length);
  const randomVal = Math.random();
  let colorVal;
  if (randomVal < 1 / 6) {
    colorVal = colors[index][0];
  } else if (randomVal < 2 / 6) {
    colorVal = colors[index][1];
  } else if (randomVal < 3 / 6) {
    colorVal = colors[index][2];
  } else if (randomVal < 4 / 6) {
    colorVal = colors[index][3];
  } else if (randomVal < 5 / 6) {
    colorVal = colors[index][4];
  } else {
    colorVal = colors[index][4];
  }
  gl.fillStyle = colorVal;
  gl.strokeStyle = colorVal;
};
const setRondomColor2 = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  randomVal1: number,
  randomVal3: number,
  offset: number
) => {
  let randomVal2 = perlin(x / 100, y / 100) + 1 + offset;
  if (randomVal2 > 2) {
    randomVal2 = randomVal2 - 2;
  }
  let colorVal;
  if (randomVal1 < 0.3) {
    colorVal = ` hsla(${randomVal2 * 180}, 100%, 50%, 1)`;
  } else {
    colorVal = ` hsla(${randomVal3}, 100%, ${randomVal2 * 50}%, 1)`;
  }
  gl.fillStyle = colorVal;
  gl.strokeStyle = colorVal;
};
export const draw = (gl: CanvasRenderingContext2D, input: InputDetail) => {
  const {
    canvasSetup: { width, height, backgroundColor },
    type,
    inputDetail
  } = input;
  gl.clearRect(0, 0, width, height);
  gl.fillStyle = backgroundColor;
  gl.fillRect(0, 0, width, height);

  if (type === "瓷砖") {
    if (inputDetail.tile.pattern === 3) {
      tile3(gl, inputDetail.tile, width, height);
    } else if (inputDetail.tile.pattern === 2) {
      tile2(gl, inputDetail.tile, width, height);
    } else if (inputDetail.tile.pattern === 1) {
      tile1(gl, inputDetail.tile, width, height);
    } else {
      tile0(gl, inputDetail.tile, width, height);
    }
  } else if (type === "递归") {
    if (inputDetail.recursion.pattern === 0) {
      recursion1(gl, inputDetail.recursion, width, height);
    } else if (inputDetail.recursion.pattern === 1) {
      recursion2(gl, inputDetail.recursion, width, height);
    } else {
      recursion3(gl, inputDetail.recursion, width, height);
    }
  }
  gl.lineWidth = 5;
  gl.strokeStyle = "#000204";
  gl.strokeRect(0, 0, width, height);
};
export const reduplicateLine = (gl: CanvasRenderingContext2D) => {
  const x = getRandomInt(1, 500);
  const y = getRandomInt(1, 500);
  for (let i = 0; i < 500; i++) {
    const radian = Math.random() * 2 * Math.PI;
    const deltaX = 2 * perlin(0.1, radian * 10) * 500;
    const deltaY = Math.tan(radian) * deltaX;
    gl.strokeStyle = `#666600`;
    gl.beginPath();
    gl.moveTo(x, y);
    gl.lineTo(x + deltaX, y + deltaY);
    gl.stroke();
  }
};
export const reduplicateRect = (
  gl: CanvasRenderingContext2D,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  const x = getRandomInt(1, 500);
  const y = getRandomInt(1, 500);
  for (let i = 0; i < 200; i++) {
    const radian = Math.random() * 2 * Math.PI;
    const deltaX = 2 * perlin(0.1, radian * 10) * 500;
    const deltaY = Math.tan(radian) * deltaX;
    gl.strokeStyle = `#666600`;
    gl.strokeRect(x, y, x + deltaX, y + deltaY);
  }
};
export const reduplicateCircle = (
  gl: CanvasRenderingContext2D,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  const x = getRandomInt(100, 400);
  const y = getRandomInt(100, 400);
  for (let i = 0; i < 50; i++) {
    const x1 = getRandomInt(100, 400);
    const y1 = getRandomInt(100, 400);
    const radius = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
    gl.strokeStyle = `#666600`;
    gl.arc(x1, y1, radius, 0, Math.PI * 2);
    gl.stroke();
  }
};
export const reduplicateTriangle = (
  gl: CanvasRenderingContext2D,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  const x = getRandomInt(100, 400);
  const y = getRandomInt(100, 400);
  for (let i = 0; i < 50; i++) {
    const x1 = getRandomInt(0, 500);
    const y1 = getRandomInt(0, 500);
    const x2 = getRandomInt(0, 500);
    const y2 = getRandomInt(0, 500);
    gl.strokeStyle = `#666600`;
    gl.beginPath();
    gl.moveTo(x, y);
    gl.lineTo(x1, y1);
    gl.lineTo(x2, y2);
    gl.stroke();
  }
};
export const tile2 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    size: number;
    density: string;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { lineWidth, size, color, colorVal, density } = input;
  gl.lineWidth = +lineWidth;
  const step = size * 5;
  if (color === "固定") {
    gl.fillStyle = colorVal;
    gl.strokeStyle = colorVal;
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (density === "大") {
          gl.strokeRect(x, y, step, step);
        } else if (density === "中") {
          const randomVal = Math.random();
          if (randomVal > 0.3) {
            gl.strokeRect(x, y, step, step);
          }
        } else {
          const randomVal = Math.random();
          if (randomVal > 0.7) {
            gl.strokeRect(x, y, step, step);
          }
        }
      }
    }
  } else {
    const randomVal1 = Math.random();
    const randomVal3 = Math.random() * 360;
    const offset = Math.random();
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (color === "随机1") {
          setRondomColor1(gl);
        } else {
          setRondomColor2(gl, x, y, randomVal1, randomVal3, offset);
        }
        if (density === "大") {
          gl.strokeRect(x, y, step, step);
        } else if (density === "中") {
          const randomVal = Math.random();
          if (randomVal > 0.3) {
            gl.strokeRect(x, y, step, step);
          }
        } else {
          const randomVal = Math.random();
          if (randomVal > 0.7) {
            gl.strokeRect(x, y, step, step);
          }
        }
      }
    }
  }
};
export const tile0 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    size: number;
    density: string;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { lineWidth, size, color, colorVal, density } = input;
  gl.lineWidth = +lineWidth;
  const step = size * 5;
  if (color === "固定") {
    gl.fillStyle = colorVal;
    gl.strokeStyle = colorVal;
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (density === "大") {
          gl.fillRect(x, y, step, step);
        } else if (density === "中") {
          const randomVal = Math.random();
          if (randomVal > 0.3) {
            gl.fillRect(x, y, step, step);
          }
        } else {
          const randomVal = Math.random();
          if (randomVal > 0.7) {
            gl.fillRect(x, y, step, step);
          }
        }
      }
    }
  } else {
    const randomVal1 = Math.random();
    const randomVal3 = Math.random() * 360;
    const offset = Math.random();
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (color === "随机1") {
          setRondomColor1(gl);
        } else {
          setRondomColor2(gl, x, y, randomVal1, randomVal3, offset);
        }
        if (density === "大") {
          gl.fillRect(x, y, step, step);
        } else if (density === "中") {
          const randomVal = Math.random();
          if (randomVal > 0.3) {
            gl.fillRect(x, y, step, step);
          }
        } else {
          const randomVal = Math.random();
          if (randomVal > 0.7) {
            gl.fillRect(x, y, step, step);
          }
        }
      }
    }
  }
};
export const recursion1 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    isFill: string;
    depth: number;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { color, colorVal, isFill, depth, lineWidth } = input;
  if (isFill) {
    gl.lineWidth = 7;
  } else {
    gl.lineWidth = +lineWidth;
  }
  gl.fillStyle = colorVal;
  gl.strokeStyle = colorVal;

  dividRec(
    gl,
    0,
    0,
    width,
    height,
    +depth,
    0,
    color === "固定",
    isFill === "fill"
  );
};
const dividRec = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  x1: number,
  y1: number,
  depth: number,
  curDepth: number = 0,
  isConstColor: boolean,
  isFill: boolean
) => {
  if (curDepth > depth) {
    return;
  }
  if (Math.abs(x1 - x) > Math.abs(y1 - y)) {
    const portion = Math.random() * 0.6 + 0.2;
    const deltaX = portion * (x1 - x);
    const newX = x + deltaX;

    if (curDepth === depth) {
      if (isFill) {
        const randomVal = Math.random();
        gl.fillStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
        gl.fillRect(x, y, newX, y1);
        gl.fillRect(newX, y, x1, y1);
        gl.strokeRect(x, y, newX, y1);
        gl.strokeRect(newX, y, x1, y1);
      } else {
        if (isConstColor) {
          gl.strokeRect(x, y, newX, y1);
          gl.strokeRect(newX, y, x1, y1);
        } else {
          const randomVal = Math.random();
          gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.strokeRect(x, y, newX, y1);
          gl.strokeRect(newX, y, x1, y1);
        }
      }
    }
    dividRec(gl, x, y, newX, y1, depth, curDepth + 1, isConstColor, isFill);
    dividRec(gl, newX, y, x1, y1, depth, curDepth + 1, isConstColor, isFill);
  } else {
    const portion = Math.random() * 0.6 + 0.2;
    const deltaY = portion * (y1 - y);
    const newY = y + deltaY;
    if (curDepth === depth) {
      if (isFill) {
        const randomVal = Math.random();
        gl.fillStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
        gl.fillRect(x, y, x1, newY);
        gl.fillRect(x, newY, x1, y1);
        gl.strokeRect(x, y, x1, newY);
        gl.strokeRect(x, newY, x1, y1);
      } else {
        if (isConstColor) {
          gl.strokeRect(x, y, x1, newY);
          gl.strokeRect(x, newY, x1, y1);
        } else {
          const randomVal = Math.random();
          gl.fillStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.strokeRect(x, y, x1, newY);
          gl.strokeRect(x, newY, x1, y1);
        }
      }
    }
    dividRec(gl, x, y, x1, newY, depth, curDepth + 1, isConstColor, isFill);
    dividRec(gl, x, newY, x1, y1, depth, curDepth + 1, isConstColor, isFill);
  }
};

export const recursion2 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    isFill: string;
    depth: number;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { color, colorVal, isFill, depth, lineWidth } = input;
  gl.lineWidth = +lineWidth;
  if (color === "固定") {
    gl.fillStyle = colorVal;
    gl.strokeStyle = colorVal;
  }
  if (isFill === "stroke") {
    gl.beginPath();
    gl.moveTo(width, 0);
    gl.lineTo(0, height);
    gl.stroke();
  }
  dividTriangle(
    gl,
    0,
    0,
    width,
    0,
    0,
    height,
    0,
    +depth,
    color === "固定",
    isFill === "fill"
  );
  dividTriangle(
    gl,
    width,
    height,
    width,
    0,
    0,
    height,
    0,
    +depth,
    color === "固定",
    isFill === "fill"
  );
};
const dividTriangle = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curDepth: number,
  depth: number,
  isConstColor: boolean,
  isFill: boolean
) => {
  if (curDepth > depth + 3) {
    return;
  }
  if (curDepth > 2) {
    if (Math.random() < 0.05) {
      return;
    }
  }

  const portion = Math.random() * 0.6 + 0.2;
  let newX: number, newY: number;
  if (calcDistance(x, y, x1, y1) > calcDistance(x, y, x2, y2)) {
    if (calcDistance(x, y, x1, y1) > calcDistance(x1, y1, x2, y2)) {
      //x,y,x1,y1
      newX = x + portion * (x1 - x);
      newY = y + portion * (y1 - y);
      if (!isFill) {
        if (isConstColor) {
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x2, y2);
          gl.stroke();
        } else {
          const randomVal = Math.random();
          gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x2, y2);
          gl.stroke();
        }
      } else if (curDepth === depth) {
        const randomVal1 = Math.random();
        const randomVal2 = Math.random();
        gl.fillStyle = ` hsla(${randomVal1 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x2, y2);
        gl.lineTo(x, y);
        gl.lineTo(newX, newY);
        gl.fill();
        gl.fillStyle = ` hsla(${randomVal2 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x2, y2);
        gl.lineTo(x1, y1);
        gl.lineTo(newX, newY);
        gl.fill();
      }

      dividTriangle(
        gl,
        x1,
        y1,
        newX,
        newY,
        x2,
        y2,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
      dividTriangle(
        gl,
        x,
        y,
        newX,
        newY,
        x2,
        y2,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
    } else {
      // x1,y1,x2,y2
      newX = x1 + portion * (x2 - x1);
      newY = y1 + portion * (y2 - y1);
      if (!isFill) {
        if (isConstColor) {
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x, y);
          gl.stroke();
        } else {
          const randomVal = Math.random();
          gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x, y);
          gl.stroke();
        }
      } else if (curDepth === depth) {
        const randomVal1 = Math.random();
        const randomVal2 = Math.random();
        gl.fillStyle = ` hsla(${randomVal1 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x, y);
        gl.lineTo(x1, y1);
        gl.lineTo(newX, newY);
        gl.fill();
        gl.fillStyle = ` hsla(${randomVal2 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x, y);
        gl.lineTo(x2, y2);
        gl.lineTo(newX, newY);
        gl.fill();
      }
      dividTriangle(
        gl,
        x1,
        y1,
        newX,
        newY,
        x,
        y,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
      dividTriangle(
        gl,
        x2,
        y2,
        newX,
        newY,
        x,
        y,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
    }
  } else {
    if (calcDistance(x, y, x2, y2) > calcDistance(x1, y1, x2, y2)) {
      //x,y,x2,y2
      newX = x + portion * (x2 - x);
      newY = y + portion * (y2 - y);
      if (!isFill) {
        if (isConstColor) {
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x1, y1);
          gl.stroke();
        } else {
          const randomVal = Math.random();
          gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x1, y1);
          gl.stroke();
        }
      } else if (curDepth === depth) {
        const randomVal1 = Math.random();
        const randomVal2 = Math.random();
        gl.fillStyle = ` hsla(${randomVal1 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x1, y1);
        gl.lineTo(x, y);
        gl.lineTo(newX, newY);
        gl.fill();
        gl.fillStyle = ` hsla(${randomVal2 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x1, y1);
        gl.lineTo(x2, y2);
        gl.lineTo(newX, newY);
        gl.fill();
      }
      dividTriangle(
        gl,
        x,
        y,
        newX,
        newY,
        x1,
        y1,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
      dividTriangle(
        gl,
        x2,
        y2,
        newX,
        newY,
        x1,
        y1,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
    } else {
      // x1,y1,x2,y2
      newX = x1 + portion * (x2 - x1);
      newY = y1 + portion * (y2 - y1);
      if (!isFill) {
        if (isConstColor) {
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x, y);
          gl.stroke();
        } else {
          const randomVal = Math.random();
          gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
          gl.beginPath();
          gl.moveTo(newX, newY);
          gl.lineTo(x, y);
          gl.stroke();
        }
      } else if (curDepth === depth) {
        const randomVal1 = Math.random();
        const randomVal2 = Math.random();
        gl.fillStyle = ` hsla(${randomVal1 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x, y);
        gl.lineTo(x1, y1);
        gl.lineTo(newX, newY);
        gl.fill();
        gl.fillStyle = ` hsla(${randomVal2 * 360}, 100%, 50%, 1)`;
        gl.beginPath();
        gl.moveTo(newX, newY);
        gl.lineTo(x, y);
        gl.lineTo(x2, y2);
        gl.lineTo(newX, newY);
        gl.fill();
      }
      dividTriangle(
        gl,
        x1,
        y1,
        newX,
        newY,
        x,
        y,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
      dividTriangle(
        gl,
        x2,
        y2,
        newX,
        newY,
        x,
        y,
        curDepth + 1,
        depth,
        isConstColor,
        isFill
      );
    }
  }
};
export const tile3 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    size: number;
    density: string;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { lineWidth, size, color, colorVal } = input;
  gl.lineWidth = +lineWidth;
  const step = size * 5;
  if (color === "固定") {
    gl.strokeStyle = colorVal;
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        drawShape1(gl, x, y, step);
      }
    }
  } else {
    const randomVal1 = Math.random();
    const randomVal3 = Math.random() * 360;
    const offset = Math.random();
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (color === "随机1") {
          setRondomColor1(gl);
        } else {
          setRondomColor2(gl, x, y, randomVal1, randomVal3, offset);
        }
        drawShape1(gl, x, y, step);
      }
    }
  }
};
export const tile1 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    size: number;
    density: string;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  const { lineWidth, size, color, colorVal } = input;
  gl.lineWidth = +lineWidth;
  const step = size * 5;
  if (color === "固定") {
    gl.fillStyle = colorVal;
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        drawShape2(gl, x, y, step);
      }
    }
  } else {
    const randomVal1 = Math.random();
    const randomVal3 = Math.random() * 360;
    const offset = Math.random();
    for (var x = 0; x < width; x += step) {
      for (var y = 0; y < height; y += step) {
        if (color === "随机1") {
          setRondomColor1(gl);
        } else {
          setRondomColor2(gl, x, y, randomVal1, randomVal3, offset);
        }
        drawShape2(gl, x, y, step);
      }
    }
  }
};
const drawShape1 = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) => {
  var leftToRight = Math.random() >= 0.5;
  gl.beginPath();
  if (leftToRight) {
    gl.moveTo(x, y);
    gl.lineTo(x + width, y + width);
  } else {
    gl.moveTo(x + width, y);
    gl.lineTo(x, y + width);
  }
  gl.closePath();
  gl.stroke();
};
const drawShape2 = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) => {
  const v = Math.random();
  gl.beginPath();
  if (v < 0.1) {
    gl.fillRect(x, y, width, width);
  } else if (v < 0.25) {
    gl.arc(x + width / 2, y + width / 2, width / 2, 0, Math.PI * 2);
    gl.fill();
  } else if (v < 0.5) {
    drawRondomTriangle(gl, x, y, width);
  } else {
  }
};
const drawRondomTriangle = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number
) => {
  const v = Math.random();
  if (v < 0.25) {
    gl.moveTo(x, y);
    gl.lineTo(x + width, y + width);
    gl.lineTo(x, y + width);
    gl.fill();
  } else if (v < 0.5) {
    gl.moveTo(x + width, y);
    gl.lineTo(x, y + width);
    gl.lineTo(x + width, y + width);
    gl.fill();
  } else if (v < 0.75) {
    gl.moveTo(x, y);
    gl.lineTo(x + width, y + width);
    gl.lineTo(x + width, y);
    gl.fill();
  } else {
    gl.moveTo(x + width, y);
    gl.lineTo(x, y + width);
    gl.lineTo(x, y);
    gl.fill();
  }
};
export const recursion3 = (
  gl: CanvasRenderingContext2D,
  input: {
    pattern: number;
    color: string;
    colorVal: string;
    isFill: string;
    depth: number;
    lineWidth: string;
  },
  width: number,
  height: number
) => {
  gl.save();
  const { color, colorVal, depth } = input;
  gl.translate(width / 2, height);
  const isAngleRondom = Math.random() > 0.5;
  const isConstColor = color === "固定";
  if (isConstColor) {
    gl.strokeStyle = colorVal;
  }
  const angle = getRandomInt(10, 45);
  const length = width / 5;
  const minLength = Math.pow(0.8, depth) * length - length / 10;

  gl.beginPath();
  gl.lineWidth = length / 10;
  gl.moveTo(0, 0);
  gl.lineTo(0, -length);
  gl.stroke();
  gl.translate(0, -length);
  branch(gl, 0.8 * length, angle, isAngleRondom, isConstColor, minLength);
  branch(gl, 0.8 * length, -angle, isAngleRondom, isConstColor, minLength);
  gl.restore();
};
const branch = (
  gl: CanvasRenderingContext2D,
  length: number,
  angle: number,
  isAngleRondom: boolean,
  isConstColor: boolean,
  minLength: number
) => {
  gl.save();
  gl.beginPath();

  if (!isConstColor) {
    const randomVal = Math.random();
    gl.strokeStyle = ` hsla(${randomVal * 360}, 100%, 50%, 1)`;
  }
  gl.rotate(angle * (Math.PI / 180));
  if (isAngleRondom) {
    angle = getRandomInt(10, 45);
  }
  gl.lineWidth = length / 10;
  gl.moveTo(0, 0);
  gl.lineTo(0, -length);
  gl.stroke();
  gl.translate(0, -length);
  console.log(angle);
  if (length > minLength) {
    branch(gl, 0.8 * length, angle, isAngleRondom, isConstColor, minLength);
    branch(gl, 0.8 * length, -angle, isAngleRondom, isConstColor, minLength);
  }
  gl.restore();
};
// export const divide2 = (
//   gl: CanvasRenderingContext2D,
//   colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
// ) => {
//   dividCircle(gl, 250, 250, 250, 0);
// };
// const dividCircle = (
//   gl: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   radius: number,
//   depth: number
// ) => {
//   if (depth > 7) {
//     return;
//   }
//   const radian = Math.random() * 2 * Math.PI;
//   const x1 = x + (Math.cos(radian) * radius) / 2;
//   const x2 = x - (Math.cos(radian) * radius) / 2;
//   const y1 = y + (Math.sin(radian) * radius) / 2;
//   const y2 = y - (Math.sin(radian) * radius) / 2;
//   gl.strokeStyle = `#666600`;
//   gl.beginPath();
//   gl.arc(x, y, radius, 0, Math.PI * 2);
//   gl.stroke();
//   dividCircle(gl, x1, y1, radius / 2, depth + 1);
//   dividCircle(gl, x2, y2, radius / 2, depth + 1);
// };
