import React, { useContext } from "react";
import Dropdown from "./Dropdown";
import InputContext from "./inputContext";

const TileInput = () => {
  const [input, setInput] = useContext(InputContext);
  const { size, colorVal, color, pattern } = input.inputDetail.tile;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInput({
      ...input,
      inputDetail: {
        ...input.inputDetail,
        tile: {
          ...input.inputDetail.tile,
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
        options={["随机1", "随机2", "固定"]}
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
          disabled={color === "固定" ? false : true}
        ></input>
      </label>

      <label htmlFor="size">
        尺寸{" "}
        <input
          type="range"
          id="size"
          name="size"
          required
          min="1"
          max="10"
          value={size}
          onChange={handleInputChange}
        />
      </label>
      <Dropdown
        label={"密度"}
        defaultState={"大"}
        options={["小", "中", "大"]}
        handleChange={handleInputChange}
        name={"density"}
        disabled={pattern === 3 || pattern === 1 ? true : false}
      />
      <Dropdown
        label={"线宽"}
        defaultState={"2"}
        options={["1", " 2", "3", "4", "5"]}
        handleChange={handleInputChange}
        name={"lineWidth"}
        disabled={pattern === 0 || pattern === 1 ? true : false}
      />
    </div>
  );
};

export default TileInput;
