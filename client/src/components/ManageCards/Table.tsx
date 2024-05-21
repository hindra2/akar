import { Ellipsis } from "../icons";

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
  return (
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
              className={`${index % 2 === 0 ? "bg-base" : "bg-surface0"}`}
            >
              <td className="p-2 rounded-l-xl">{row.question}</td>
              <td className="p-2">{row.deck}</td>
              <td className="p-2">{row.dueDate}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{row.dateCreated}</td>
              <td className="p-2 rounded-r-xl fill-textBase">
                <Ellipsis />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
