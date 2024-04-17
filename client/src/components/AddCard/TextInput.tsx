import React, { useRef, useEffect } from "react";

const TextImageInput: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = contentRef.current;
    if (div) {
      div.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (div) {
        div.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      const selection = window.getSelection();
      if (selection && selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const nodeBefore =
          range.startContainer.childNodes[range.startOffset - 1];
        if (nodeBefore && nodeBefore.nodeName === "IMG") {
          e.preventDefault();
          nodeBefore.remove();
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full rounded-lg bg-surface1 ring-overlay0 ring-opacity-90 ring-1">
      <div
        ref={contentRef}
        contentEditable
        className="outline-none px-4 py-3 h-auto overflow-auto rounded-lg max-h-[200px] text-textBase resize-none whitespace-pre-wrap"
        style={{ wordWrap: "break-word" }}
      ></div>
    </div>
  );
};

export default TextImageInput;
