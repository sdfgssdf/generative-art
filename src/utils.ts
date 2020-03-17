import { Shape } from "./interface";

export default function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const drawItem = (
  gl: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  shape: Shape
) => {
  if (shape == 0) {
    gl.fillRect(x, y, size, size);
  } else {
    gl.beginPath();
    gl.arc(x + 10, y + 10, size / 2, 0, Math.PI * 2, true); // Outer circle
    gl.fill();
  }
};
export const draw1 = (
  gl: CanvasRenderingContext2D,
  canvasWidth = 500,
  canvasHeight = 500,
  gridSize = 25,
  density = 0.2,
  itemSize = 2,
  shape = Shape.circle,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  gl.clearRect(0, 0, canvasWidth, canvasHeight);
  const itemWidth = canvasWidth / gridSize;
  for (let x = 0; x < canvasWidth; x = x + itemWidth) {
    for (let y = 0; y < canvasWidth; y = y + itemWidth) {
      if (Math.random() > density) {
        gl.fillStyle = `${colors[getRandomInt(0, 6)]}`;
        drawItem(gl, x, y, gridSize / itemSize, shape);
      }
    }
  }
};
export const draw1 = (
  gl: CanvasRenderingContext2D,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  for (let i = 0; i < 300; i++) {
    gl.strokeStyle = `${colors[getRandomInt(0, 6)]}`;
    gl.beginPath();
    gl.moveTo(75, getNumberInNormalDistribution(250, 50));
    gl.bezierCurveTo(
      getNumberInNormalDistribution(200, 30),
      getNumberInNormalDistribution(250, 50),
      getNumberInNormalDistribution(300, 30),
      getNumberInNormalDistribution(250, 50),
      450,
      getNumberInNormalDistribution(250, 50)
    );
    gl.stroke();
  }
};
export const draw2 = (
  gl: CanvasRenderingContext2D,
  colors = ["#666600", "#6666FF", "#FF3300", "#009900", "#00FF00", "#FFFF00"]
) => {
  for (let i = 0; i < 300; i++) {
    gl.strokeStyle = `${colors[getRandomInt(0, 6)]}`;
    if (Math.random() > 0.7) {
      gl.strokeRect(
        getRandomInt(0, 500),
        getRandomInt(0, 500),
        getRandomInt(2, 20),
        getRandomInt(2, 20)
      );
    } else if (Math.random() > 0.4) {
      gl.beginPath();
      gl.arc(
        getRandomInt(10, 490),
        getRandomInt(10, 490),
        getRandomInt(2, 20) / 2,
        0,
        Math.PI * 2,
        true
      ); // Outer circle
      gl.stroke();
    } else {
      gl.beginPath();
      const x = getRandomInt(0, 500);
      const y = getRandomInt(0, 500);
      gl.moveTo(x, y);
      gl.lineTo(x + 5, y);
      gl.lineTo(x + 2.5, y + 2.5);
      gl.closePath();
      gl.stroke();
    }
  }
};
export function getNumberInNormalDistribution(mean: number, std_dev: number) {
  return mean + uniform2NormalDistribution() * std_dev;
}

function uniform2NormalDistribution() {
  var sum = 0.0;
  for (var i = 0; i < 12; i++) {
    sum = sum + Math.random();
  }
  return sum - 6.0;
}
export const calcDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
