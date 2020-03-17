import React, { useContext } from "react";
import Dropdown from "./Dropdown";
import InputContext from "./inputContext";

const RecursionInput = () => {
  const [input, setInput] = useContext(InputContext);
  const {
    depth,
    colorVal,
    color,
    pattern,
    isFill,
    lineWidth
  } = input.inputDetail.recursion;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInput({
      ...input,
      inputDetail: {
        ...input.inputDetail,
        recursion: {
          ...input.inputDetail.recursion,
          [name]: value
        }
      }
    });
  };
  return (
    <div className="TileInputWrapper">
      <Dropdown
        label={"颜色"}
        value={color}
        options={isFill === "fill" ? ["随机1"] : ["随机1", "固定"]}
        handleChange={handleInputChange}
        name={"color"}
        disabled={false}
      />
      <label htmlFor="colorVal">
        选择颜色
        <input
          type="color"
          id="colorVal"
          name="colorVal"
          value={colorVal}
          onChange={handleInputChange}
          disabled={color === "随机1" ? true : false}
        ></input>
      </label>

      <label htmlFor="depth">
        深度{" "}
        <input
          type="range"
          id="depth"
          name="depth"
          required
          min="3"
          max="7"
          value={depth}
          onChange={handleInputChange}
        />
      </label>
      <Dropdown
        label={"填充"}
        value={isFill}
        options={["fill", "stroke"]}
        handleChange={handleInputChange}
        name={"isFill"}
        disabled={pattern === 2 ? true : false}
      />
      <Dropdown
        label={"线宽"}
        value={lineWidth}
        options={["1", " 2", "3", "4", "5"]}
        handleChange={handleInputChange}
        name={"lineWidth"}
        disabled={isFill === "fill" || pattern === 2 ? true : false}
      />
    </div>
  );
};

export default RecursionInput;
