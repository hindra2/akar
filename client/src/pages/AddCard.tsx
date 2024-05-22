import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackIcon, Edit, PlusIcon } from "../components/icons";
import { Toaster, toast } from "sonner";
import supabase from "../../utils/supabase";


const AddCard: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();

  const cardToEdit = location.state?.card;
  const deckId = location.state?.deckId;
  const deckName = location.state?.deckName;

  const [question, setQuestion] = useState(cardToEdit?.card_question || "");
  const [answer, setAnswer] = useState(cardToEdit?.card_answer || "");

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
      navigate("/deckInfo", { state: { deckId, deckName } });
    }, 70);
  };

  const animatedStyle = isClicked ? { transform: "scale(0.98)" } : {};

  const questionRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const questionDiv = questionRef.current;
    const answerDiv = answerRef.current;

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

    if (questionDiv) {
      questionDiv.addEventListener("keydown", handleKeyDown);
    }
    if (answerDiv) {
      answerDiv.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (questionDiv) {
        questionDiv.removeEventListener("keydown", handleKeyDown);
      }
      if (answerDiv) {
        answerDiv.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { card_question: question, card_answer: answer, deck_id: deckId };

    if (cardToEdit) {
      // Editing existing card
      const { data, error } = await supabase
        .from("cards")
        .update(body)
        .eq("card_id", cardToEdit.card_id)
        .single();
  
      if (error) {
        console.error("Error updating card:", error);
      } else {
        console.log("Card updated successfully:", data);
        navigate("/deckInfo", { state: { deckId, deckName } });
      }
    } else {
      // Adding new card
      console.log("Inserting:", body);
      const { data: newCard, error: insertError } = await supabase
        .from("cards")
        .insert(body)
        .select("*")
        .single();
  
      console.log("Inserted card:", newCard);


      if (insertError) {
        console.error("Error adding new card:", insertError);
      } else if (newCard) {
        console.log("New card added successfully:", newCard);
        toast.success("New card added successfully!", {
          position: "bottom-right",
          duration: 2000,
        });
        setQuestion("");
        setAnswer("");
      }
    }
  };

  const handleQuestionInput = (e: React.FormEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    setQuestion(div.innerText);
    const range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleAnswerInput = (e: React.FormEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    setAnswer(div.innerText);
    const range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmitForm(e as unknown as React.FormEvent<HTMLFormElement>);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.currentTarget === questionRef.current) {
        answerRef.current?.focus();
        placeCursorAtEnd(answerRef.current);
      } else if (e.currentTarget === answerRef.current) {
        questionRef.current?.focus();
        placeCursorAtEnd(questionRef.current);
      }
    }
  };

  const placeCursorAtEnd = (el: HTMLDivElement | null) => {
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center h-full">
      <button
        className="absolute top-[2%] left-8 fill-textBase"
        onClick={handleOnClick}
        style={animatedStyle}
      >
        <BackIcon />
      </button>
      <div>
        <form onSubmit={onSubmitForm}>
          <div className="flex flex-col w-[700px] mt-[200px]">
            <div className="flex items-center w-full mb-2 text-xl text-textBase">
              Question
            </div>
            <div className="flex items-center">
              <div className="flex flex-col w-full rounded-lg bg-surface1 ring-overlay0 ring-opacity-90 ring-1">
                <div
                  ref={questionRef}
                  contentEditable
                  className="outline-none px-4 py-3 h-auto overflow-auto rounded-lg max-h-[200px] text-textBase resize-none whitespace-pre-wrap"
                  style={{ wordWrap: "break-word" }}
                  onInput={handleQuestionInput}
                  onKeyDown={handleKeyDown}
                  suppressContentEditableWarning
                >
                  {question}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[700px] mt-[30px]">
            <div className="flex items-center w-full mb-2 text-xl text-textBase">
              Answer
            </div>
            <div className="flex items-center">
              <div className="flex flex-col w-full rounded-lg bg-surface1 ring-overlay0 ring-opacity-90 ring-1">
                <div
                  ref={answerRef}
                  contentEditable
                  className="outline-none px-4 py-3 h-auto overflow-auto rounded-lg max-h-[200px] text-textBase resize-none whitespace-pre-wrap"
                  style={{ wordWrap: "break-word" }}
                  onInput={handleAnswerInput}
                  onKeyDown={handleKeyDown}
                  suppressContentEditableWarning
                >
                  {answer}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="px-[20px] h-[40px] bg-surface2 rounded-lg flex justify-center items-center hover:bg-overlay0 hover:scale-[101%] mt-[30px] transition duration-200 ease-in-out"
            >
              {cardToEdit ? (
                <>
                  <div className="fill-textBase">
                    <Edit />
                  </div>
                  <span className="text-textBase ml-[10px] font-semibold">
                    Update
                  </span>
                </>
              ) : (
                <>
                  <div className="fill-textBase">
                    <PlusIcon />
                  </div>
                  <span className="text-textBase ml-[10px] font-semibold">
                    Add
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default AddCard;