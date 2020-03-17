import React, { useContext, useReducer } from "react";
import Dropdown from "./Dropdown";
import InputContext from "./inputContext";
const InputHeader = () => {
  const [input, setInput] = useContext(InputContext);
  const type = input.type;
  const { width, height, backgroundColor } = input.canvasSetup;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInput({
      ...input,
      canvasSetup: { ...input.canvasSetup, [name]: value }
    });
  };
  const hanleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      type: event.target.value
    });
  };
  return (
    <div className="InputHeaderWrapper">
      <div className="HeaderRow">
        <label htmlFor="width">宽</label>
        <input
          type="range"
          id="width"
          name="width"
          required
          min="100"
          max="2000"
          value={width}
          onChange={handleInputChange}
        />
        <label htmlFor="height">高</label>
        <input
          type="range"
          id="height"
          name="height"
          required
          min="100"
          max="2000"
          value={height}
          onChange={handleInputChange}
        />
        <label htmlFor="backgroundColor" className="colorLabel">
          背景颜色
        </label>
        <input
          type="color"
          id="backgroundColor"
          name="backgroundColor"
          value={backgroundColor}
          onChange={handleInputChange}
        ></input>
      </div>
      <Dropdown
        label={"类型"}
        value={type}
        options={["瓷砖", "递归"]}
        handleChange={hanleDropdownChange}
      />
    </div>
  );
};

export default InputHeader;
