import { createContext, Context } from "react";
import { InputDetail } from "./interface";
const defaultVal: [InputDetail, any] = [
  {
    canvasSetup: { width: 500, height: 500, backgroundColor: "#F0F8FF" },
    type: "tile",
    inputDetail: {
      tile: {
        pattern: 1,
        color: "随机1",
        colorVal: "#FF6A6A",
        size: 5,
        density: "small",
        lineWidth: "2"
      }
    }
  },
  () => {}
];
const InputContext = createContext(defaultVal);

export default InputContext;
