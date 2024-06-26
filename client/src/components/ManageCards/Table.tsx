import { Edit } from "../icons";
import { useState } from "react";
import EditCard from "./EditCard";
import Split from "react-split";

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
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = (index: number) => {
    setSelectedRowIndex(index);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  return (
    <Split
      sizes={isEditOpen ? [50, 50] : [100, 0]}
      minSize={[300, 300]}
      gutterSize={10}
      cursor="col-resize"
      className="flex h-full"
    >
      <div>
        <table className="min-w-full text-textBase text-left">
          <thead>
            <tr className="bg-surface0">
              <th className="p-2 font-bold rounded-l-xl">Question</th>
              <th className="p-2 font-bold">Deck</th>
              <th className="p-2 font-bold">Due Date</th>
              <th className="p-2 font-bold">Status</th>
              <th className="p-2 font-bold">Date Created</th>
              <th className="p-2 font-bold rounded-r-xl">Action</th>
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
                onClick={() => {
                  handleEditOpen(index);
                }}
              >
                <td className="p-2 rounded-l-xl">{row.question}</td>
                <td className="p-2">{row.deck}</td>
                <td className="p-2">{row.dueDate}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">{row.dateCreated}</td>
                <td className="p-2 rounded-r-xl fill-textBase">
                  <Edit />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditOpen && (
        <div>
          <EditCard onClose={handleEditClose} />
        </div>
      )}
    </Split>
  );
};

export default Table;
