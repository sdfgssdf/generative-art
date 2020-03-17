import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import InputContext from "./inputContext.ts";
import InputComponent from "./InputComponent";
import Canvas from "./Canvas.tsx";
import { draw } from "./drawMethod";
const App = () => {
  const ref = React.createRef();
  const input = useState({
    canvasSetup: { width: 500, height: 500, backgroundColor: "#F0F8FF" },
    type: "瓷砖",

    inputDetail: {
      tile: {
        pattern: 2,
        color: "随机2",
        colorVal: "#FF6A6A",
        size: 2,
        density: "中",
        lineWidth: "2"
      },
      recursion: {
        pattern: 1,
        color: "固定",
        colorVal: "#aea6c4",
        depth: 5,
        isFill: "stroke",
        lineWidth: "2"
      }
    }
  });
  const [gl, updateGl] = useState();
  useEffect(() => {
    const canvas = ref.current;
    updateGl(canvas.getContext("2d"));
  }, [input[0].canvasSetup.width, input[0].canvasSetup.height]);
  useEffect(() => {
    if (!gl) return;

    draw(gl, input[0]);
  });
  const reGenerate = () => {
    draw(gl, input[0]);
  };
  const savePicture = () => {
    function downLoad(url) {
      var oA = document.createElement("a");
      oA.download = ""; // 设置下载的文件名，默认是'下载'
      oA.href = url;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除
    }
    downLoad(ref.current.toDataURL("image/png"));
  };
  return (
    <div className="box">
      <InputContext.Provider value={input}>
        <InputComponent savePicture={savePicture} reGenerate={reGenerate} />
      </InputContext.Provider>
      <div className="canvasCantainer">
        <Canvas
          width={input[0].canvasSetup.width}
          height={input[0].canvasSetup.height}
          ref={ref}
        />
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
