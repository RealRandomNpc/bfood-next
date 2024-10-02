"use client";
import useProductSearchTags from "@/hooks/useProductSearchTags";
import React, { useEffect, useRef, useState } from "react";

const TAGS_EXAMPLE = [];

function TagsSelector({ availableTags = TAGS_EXAMPLE }) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(null);
  const [mouseMoved, setStateMouseMoved] = useState(0);
  const { selectedTags, selectedTagsIds, toggleSelectedTag } =
    useProductSearchTags();

  const itemsContainer = useRef();

  // functions
  function handleMouseDown(e) {
    setIsDown(true);

    if (e.pageX === undefined) {
      setStartX(e.touches[0].pageX - itemsContainer.current.offsetLeft);
    } else {
      setStartX(e.pageX - itemsContainer.current.offsetLeft);
    }

    setScrollLeftState(itemsContainer.current.scrollLeft);
    setStateMouseMoved(0);
  }

  function handleMouseMove(e) {
    if (!isDown) {
      return;
    }

    const currentMousePositionInsideContainer =
      e.pageX === undefined
        ? e.touches[0].pageX - itemsContainer.current.offsetLeft
        : e.pageX - itemsContainer.current.offsetLeft;

    setStateMouseMoved(currentMousePositionInsideContainer - startX);
  }

  useEffect(() => {
    itemsContainer.current.scrollLeft = scrollLeftState - mouseMoved;
  }, [scrollLeftState, mouseMoved]);

  return (
    <div className="mx-auto max-w-5xl pr-2 md:px-2 ">
      <div
        ref={itemsContainer}
        className={` w-full flex gap-2 select-none whitespace-nowrap overflow-hidden ${
          (isDown && "cursor-grabbing") || ""
        }`}
        // MOUSE EVENTS
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => setIsDown(false)}
        onMouseLeave={() => setIsDown(false)}
        onMouseMove={(e) => handleMouseMove(e)}
        // TOUCH EVENTS
        onTouchStart={(e) => handleMouseDown(e)}
        onTouchEnd={() => setIsDown(false)}
        onTouchCancel={() => setIsDown(false)}
        onTouchMove={(e) => handleMouseMove(e)}
      >
        {availableTags.map((t) => (
          <button
            key={t.id}
            className={`rounded-full px-4 py-2 ${
              selectedTagsIds.includes(t.id)
                ? "bg-b-primary-default underline"
                : "bg-b-primary-100"
            } inline-flex whitespace-nowrap ${
              (isDown && "cursor-grabbing") || ""
            }`}
            onClick={() => {
              toggleSelectedTag(t);
            }}
          >
            <span className="whitespace-nowrap">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagsSelector;
