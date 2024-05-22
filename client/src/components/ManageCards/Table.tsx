import { Edit } from "../icons";
import { useState, useRef } from "react";
import EditCard from "./Edit";

const Table = () => {
  const data = [
    {
      question: "What is React?",
      deck: "JavaScript",
      type: "MCQ",
      dueDate: "2023-10-01",
      status: "Pending",
      dateCreated: "2023-09-01",
    },
    {
      question: "Explain closures.",
      deck: "JavaScript",
      type: "Short Answer",
      dueDate: "2023-10-02",
      status: "Completed",
      dateCreated: "2023-09-02",
    },
    {
      question: "What is a promise?",
      deck: "JavaScript",
      type: "MCQ",
      dueDate: "2023-10-03",
      status: "Pending",
      dateCreated: "2023-09-03",
    },
    {
      question: "Define event loop.",
      deck: "JavaScript",
      type: "Short Answer",
      dueDate: "2023-10-04",
      status: "Pending",
      dateCreated: "2023-09-04",
    },
    {
      question: "What is JSX?",
      deck: "React",
      type: "MCQ",
      dueDate: "2023-10-05",
      status: "Completed",
      dateCreated: "2023-09-05",
    },
  ];

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const dividerRef = useRef(null);

  const handleMouseDown = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (dividerRef.current) {
      const divider = dividerRef.current;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      divider.previousElementSibling.style.width = `${newWidth}%`;
      divider.nextElementSibling.style.width = `${100 - newWidth}%`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const toggleEditSection = () => {
    setIsEditVisible(!isEditVisible);
  };

  return (
    <div className="flex w-full h-full">
      <div className={`${isEditVisible ? "w-1/2" : "w-full"}`}>
        <table className="min-w-full text-textBase text-left">
          <thead>
            <tr className="bg-surface0">
              <th className="p-2 font-bold rounded-l-xl">Question</th>
              <th className="p-2 font-bold">Deck</th>
              <th className="p-2 font-bold">Due Date</th>
              <th className="p-2 font-bold">Status</th>
              <th className="p-2 font-bold">Date Created</th>
              <th className="p-2 font-bold rounded-r-xl">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${
                  selectedRowIndex === index
                    ? "bg-accent text-white"
                    : index % 2 === 0
                    ? "bg-base"
                    : "bg-surface0"
                }`}
                onClick={() => setSelectedRowIndex(index)}
              >
                <td className="p-2 rounded-l-xl">{row.question}</td>
                <td className="p-2">{row.deck}</td>
                <td className="p-2">{row.dueDate}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">{row.dateCreated}</td>
                <td className="p-2 rounded-r-xl fill-textBase">
                  <button onClick={() => setSelectedCard(row)}>
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        ref={dividerRef}
        className="flex items-center justify-center w-1/2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-surface0 rounded-full">
          <button
            className="flex items-center justify-center w-6 h-6 bg-accent rounded-full"
            onClick={toggleEditSection}
          >
            {isEditVisible ? (
              <Edit />
            ) : (
              <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>
      {isEditVisible && (
        <div className="w-1/2">
          <EditCard selectedCard={selectedCard} />
        </div>
      )}
    </div>
  );
};

export default Table;
