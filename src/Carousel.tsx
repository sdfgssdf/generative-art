/** @jsx jsx */
import React, { useState, RefObject, useContext } from "react";
import { CarouselOption, TYPE } from "./interface";
import { jsx, css, keyframes } from "@emotion/core";
import InputContext from "./inputContext";

const Carousel = (props: any) => {
  const [input, setInput] = useContext(InputContext);
  const type: TYPE = input.type;
  let options: Array<{ name: string; url: string }>;
  options = props.options;
  let pattern: number;
  if (type === TYPE.RECURSION) {
    pattern = input.inputDetail.recursion.pattern;
  } else {
    pattern = input.inputDetail.tile.pattern;
  }
  const handleChange = (val: number) => {
    if (type === TYPE.RECURSION) {
      setInput({
        ...input,
        inputDetail: {
          ...input.inputDetail,
          recursion: { ...input.inputDetail.recursion, pattern: val }
        }
      });
    } else {
      setInput({
        ...input,
        inputDetail: {
          ...input.inputDetail,
          tile: { ...input.inputDetail.tile, pattern: val }
        }
      });
    }
  };
  let isDragging = false;
  let containerRef: RefObject<HTMLDivElement> = React.createRef();
  let imgRefs: Array<RefObject<HTMLImageElement>> = [];
  let offset = 0;
  for (let index = 0; index < options.length; index++) {
    const imgRef: RefObject<HTMLImageElement> = React.createRef();
    imgRefs.push(imgRef);
  }
  const Bigger = keyframes`
from { transform: scale(0.6) ; }
to   { transform: scale(1) ; }
`;
  const Smaller = keyframes`
from { transform: scale(1) ; }
to   { transform: scale(0.6) ; }
`;
  const goLeft = keyframes`
from { transform: translateX(${(2 - pattern) * 110}px) ; }
to   { transform: translateX(${(2 - pattern) * 110 - 110}px) ; }
`;
  const goRight = keyframes`
from { transform: translateX(${-pattern * 110}px); }
to   { transform: translateX(${-pattern * 110 + 110}px) ; }
`;
  const getContainerCss = (pattern: number) => {
    return `imgContainer${pattern}`;
  };
  const getImageCss = (index: number) => {
    if (index !== pattern) {
      return css`
        transform: scale(0.6);
        transition: transform 2s ease-in-out;
      `;
    } else {
      return css`
        transform: scale(1);
        transition: transform 2s ease-in-out;
      `;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging = true;
    if (containerRef.current) {
      containerRef.current.style.transition = `none`;
    }
    for (let index = 0; index < imgRefs.length; index++) {
      const imgRef = imgRefs[index];
      if (imgRef.current) {
        imgRef.current.style.transition = `none`;
      }
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      offset = offset + e.movementX;
      const translateX = -pattern * 110 + 110 + offset;
      if (translateX <= (options.length - 2) * -110) {
        offset = (options.length - 2) * -110 + pattern * 110 - 110;
      } else if (translateX >= 110) {
        offset = 110;
      }
      const transX = -pattern * 110 + 110 + offset;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${transX}px)
  `;
      }
      if (0 <= transX) {
        const [img0, img1, ...imgs] = imgRefs;
        imgs.forEach(img => {
          if (img.current)
            img.current.style.transform = `scale(0.6)
`;
        });

        if (img0.current)
          img0.current.style.transform = `scale(${0.6 + (transX / 110) * 0.4})
`;
        if (img1.current)
          img1.current.style.transform = `scale(${1 - (transX / 110) * 0.4})
`;
      } else if (-110 <= transX) {
        const [img0, img1, img2, ...imgs] = imgRefs;
        imgs.forEach(img => {
          if (img.current)
            img.current.style.transform = `scale(0.6)
  `;
        });

        if (img0.current)
          img0.current.style.transform = `scale(0.6)
  `;
        if (img1.current)
          img1.current.style.transform = `scale(${1 - (-transX / 110) * 0.4})
  `;
        if (img2.current)
          img2.current.style.transform = `scale(${0.6 + (-transX / 110) * 0.4})
  `;
      } else {
        const [img0, img1, img2, img3] = imgRefs;

        if (img0.current)
          img0.current.style.transform = `scale(0.6)
  `;
        if (img1.current)
          img1.current.style.transform = `scale(0.6)
  `;
        if (img2.current)
          img2.current.style.transform = `scale(${1 -
            ((-transX - 110) / 110) * 0.4})
  `;
        if (img3.current)
          img3.current.style.transform = `scale(${0.6 +
            ((-transX - 110) / 110) * 0.4})
  `;
      }
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging = false;

    if (Math.abs(offset % 110) < 55) {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${(1 -
          (pattern - Math.trunc(offset / 110))) *
          110}px)
`;
        containerRef.current.style.transition = "transform 2s ease-in-out";
      }
      for (let index = 0; index < imgRefs.length; index++) {
        const imgRef = imgRefs[index];
        if (imgRef.current) {
          if (index !== pattern - Math.trunc(offset / 110)) {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(0.6)";
          } else {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(1)";
          }
        }
      }

      handleChange(pattern - Math.trunc(offset / 110));
    } else if (offset % 110 < 0) {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${(1 -
          (pattern - Math.trunc(offset / 110) + 1)) *
          110}px)
  `;
        containerRef.current.style.transition = "transform 2s ease-in-out";
      }
      for (let index = 0; index < imgRefs.length; index++) {
        const imgRef = imgRefs[index];
        if (imgRef.current) {
          if (index !== pattern - Math.trunc(offset / 110) + 1) {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(0.6)";
          } else {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(1)";
          }
        }
      }
      handleChange(pattern - Math.trunc(offset / 110) + 1);
    } else {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${(1 -
          (pattern - Math.trunc(offset / 110) - 1)) *
          110}px)
  `;
        containerRef.current.style.transition = "transform 2s ease-in-out";
      }
      for (let index = 0; index < imgRefs.length; index++) {
        const imgRef = imgRefs[index];
        if (imgRef.current) {
          if (index !== pattern - Math.trunc(offset / 110) - 1) {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(0.6)";
          } else {
            imgRef.current.style.transition = `transform 2s ease-in-out`;
            imgRef.current.style.transform = "scale(1)";
          }
        }
      }
      handleChange(pattern - Math.trunc(offset / 110) - 1);
    }
  };
  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    isDragging = false;
    if (containerRef.current) {
      containerRef.current.style.transition = `transform 2s ease-in-out`;
    }
    for (let index = 0; index < imgRefs.length; index++) {
      const imgRef = imgRefs[index];
      if (imgRef.current) {
        imgRef.current.style.transition = `transform 2s ease-in-out`;
      }
    }
  };

  const prev = () => {
    if (pattern === options.length - 1) return;
    const curImg = imgRefs[pattern].current;
    const nextImg = imgRefs[pattern + 1].current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${-pattern * 110}px)
`;
    }
    if (curImg)
      curImg.style.transform = `scale(0.6)
`;
    if (nextImg)
      nextImg.style.transform = `scale(1)
`;

    handleChange(pattern + 1);
  };
  const next = () => {
    if (pattern === 0) return;
    const curImg = imgRefs[pattern].current;
    const nextImg = imgRefs[pattern - 1].current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${(2 - pattern) *
        110}px)
`;
    }
    if (curImg)
      curImg.style.transform = `scale(0.6)
`;
    if (nextImg)
      nextImg.style.transform = `scale(1)
`;
    handleChange(pattern - 1);
  };
  return (
    <div className="carousel">
      <div
        key={type}
        className={getContainerCss(pattern)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={e => {
          e.preventDefault;
        }}
        ref={containerRef}
      >
        {options.map((item, index: number) => (
          <img
            draggable={false}
            alt={item.name}
            src={item.url}
            key={item.name}
            css={getImageCss(index)}
            ref={imgRefs[index]}
          />
        ))}
      </div>
      <a className="prev" onClick={prev}>
        &#10094;
      </a>
      <a className="next" onClick={next}>
        &#10095;
      </a>
    </div>
  );
};

export default Carousel;
