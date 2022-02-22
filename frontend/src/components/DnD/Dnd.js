import React, { useState, useContext } from "react";
// import Droppable from "./Droppable";
// import Draggable from "./Draggable";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Item } from "./Item";
import { SortableItem } from "./SortableItem";
import Button from "../Button";
import DroppableContainer from "./DroppableContainer";
import StukiPng from "../../images/stuki.png";
import { QuestionContext } from "../../contexts/QuestionsContext";
import axios from "axios";
import { firebase } from "../../Firebase/firebase";

export const WORD_BANK = "WORD_BANK";

const Dnd = (props) => {
  const [questionState, dispatchQuestion] = useContext(QuestionContext); // belerakom a questionState.answers = [] be a válaszokat gondolom amiket kiválaszott és úgy ellenőrzöm
  const [activeId, setActiveId] = useState(null);
  const [wordbank, setWordbank] = useState(props.words);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const childrenWithBlanks = React.Children.toArray(props.children).map(
    (child, index) => {
      // lekérünk minden szöveget ami a dnd körbevesz
      if (child.props?.id) {
        // ha van id adattagja
        return {
          id: `blank-${index}`,
          items: [],
        };
      }
      return child;
    }
  );

  const blanks = childrenWithBlanks.reduce((acc, currChild) => {
    if (currChild.id) {
      return {
        ...acc,
        [currChild.id]: currChild,
      };
    }

    return acc;
  }, {});

  blanks[WORD_BANK] = { items: wordbank };
  const [items, setItems] = useState(blanks);

  function gatherAnswers() {
    let answers = {};
    for (const [key, value] of Object.entries(items)) {
      if (key !== "WORD_BANK") {
        console.log("value0", value.items);
        // answers.push(key + ":" + value.items);
        answers[key] = value.items[0];
      }
    }
    console.log("answers1", answers);
    // answers = answers.map((answer) => {
    //   return answer.substring(answer.indexOf(":") + 1, answer.length);
    // });

    return answers;
  }

  function handleButtonClick() {
    // backendbe kell validálni, oda kérés, szerver összesít pontokat, magát a kérdést is a backend küldi
    const checkedBlanks = Object.entries(items).reduce((acc, [key, value]) => {
      if (key !== WORD_BANK) {
        const isBlankCorrect = value.items.some((item) =>
          value.solutions.includes(item)
        );

        acc[key] = {
          ...value,
          isCorrect: isBlankCorrect,
        };
      } else {
        acc[key] = { ...value, isCorrect: null };
      }
      return acc;
    }, {});
    setItems(checkedBlanks);
  }

  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };
  // find the blank/droppableContainer that an item is in
  const findContainer = (id) => {
    if (id in items) {
      // ha  benne van a listában akkor tudjuk hogy dropable
      return id;
    }
    // ha szöveg fölé húzom?

    return Object.keys(items).find((key) => items[key].items.includes(id));
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findContainer(active.id); // ahonnan kiveszed
    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;
    const overContainer = findContainer(overId);
    if (activeContainer && overContainer) {
      const activeIndex = items[activeContainer].items.indexOf(active.id);
      const overIndex = items[overContainer].items.indexOf(overId);
      if (activeContainer !== overContainer) {
        // vagyis más kontérbe helyezünk át
        setItems((prevItems) => {
          let activeItems = [...items[activeContainer].items];
          let overItems = [...items[overContainer].items];
          // activeContainer gets what was in overContainer and vice versa
          // first check if overContainer is word bank or a blank
          // if it's a blank (NOT the word bank), swap contents with activeContainer
          // if it IS word bank, just move activeContainer contents to word bank
          if (overContainer === WORD_BANK) {
            activeItems = [];
            overItems.push(active.id); // az adott szöveg...
          } else {
            activeItems.splice(activeIndex, 1); // kiveszem az adott elemet belőle...
            // if there's already something in the blank, push its contents to activeItems
            if (overItems.length) {
              activeItems.push(...overItems);
            }
            overItems = [active.id];
          }

          const updatedItems = {
            ...prevItems,
            [activeContainer]: {
              ...prevItems[activeContainer],
              isCorrect: null,
              items: activeItems,
            },
            [overContainer]: {
              ...prevItems[overContainer],
              isCorrect: null,
              items: overItems,
            },
          };
          setWordbank(updatedItems[WORD_BANK].items);
          return updatedItems;
        });
      } else if (activeIndex !== overIndex) {
        setItems((prevItems) => ({
          ...prevItems,
          [overContainer]: {
            ...prevItems[overContainer],
            isCorrect: null,
            items: arrayMove(
              items[overContainer].items,
              activeIndex,
              overIndex
            ),
          },
        }));
      }
    }
    setActiveId(null);
  };

  const handleDragCancle = () => {
    setActiveId(null);
  };

  const handleSubmit = async () => {
    const answers = gatherAnswers();
    console.log("answers", answers);
    axios
      .post(`http://localhost:8000/api/dnd/${questionState.algorithm}`, {
        answers: answers,
        algorithm: questionState.algorithm,
        questionsType: questionState.currentQuestionType,
        id: props.currentQuestionId,
        uid: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        console.log("result data", result.data);
        Object.keys(result.data).map((key, value) => {
          document.getElementById(key).className = result.data[key]
            ? `blank-style bg-green-400`
            : `blank-style bg-red-700`;
        });
      });
  };

  return (
    <div className="mx-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancle}
        // collisionDetection={closestCorners}
      >
        <div className="flex-col items-start ">
          {/* itt lesz a szöveg ahova majd be kell huzni a válaszokat*/}
          <div>
            {childrenWithBlanks.map((child, index) => {
              const { id } = child;
              // console.log("id", id);

              if (id) {
                const { items: blankItems, isCorrect: isBlankCorrect } =
                  items[id];
                return (
                  <>
                    {" "}
                    <DroppableContainer
                      id={id}
                      key={id}
                      isCorrect={isBlankCorrect}
                    >
                      {blankItems.map((value) => {
                        // console.log("id", id, "value", value);
                        // {
                        //   questionState.answers.push(id + ":" + value);
                        // }
                        // console.log("a", questionState.answers);
                        return (
                          <SortableItem
                            key={`sortable-item-${value}`}
                            id={value}
                            taskid={props.taskid}
                          />
                        );
                      })}
                    </DroppableContainer>
                  </>
                );
              } else {
                return child;
              }
            })}
          </div>
        </div>
        <div
          className="w-48 border-2 border-black border-solid"
          taskid={props.taskid}
        >
          <SortableContext items={wordbank} strategy={() => {}}>
            {wordbank.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? <Item label={activeId} /> : null}
          </DragOverlay>
        </div>
        {/* Drag Overlay ez kell majd ahhoz hogyha mozagtom lássam */}
        {/*
          amint rákattint erre a gombra történjen meg egy lekérés a szervertől
          elküldöm a kérdés id-jat a hozzá tartozó válaszokkal és a szerver
          válaszol hogy mi volt jó és mi nem?
        */}
        {!isSubmitted ? (
          <button
            className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
            onClick={() => {
              // dispatchQuestion({
              //   type: "SEND_ANSWERS",
              //   payload: gatherAnswers(), // vagy megváltoztatom a választ a stateban, questionState.answers = [] és ezt küldöm majd tovább, és akkor az adott komponensen belül mehet a dolog
              // });
              handleSubmit();
              setIsSubmitted(true);
            }}
          >
            Submit
          </button>
        ) : (
          <button
            className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400"
            onClick={() => {
              dispatchQuestion({ type: "NEXT_QUESTION" });
              setIsSubmitted(false);
              console.log("asdads", questionState.correctAnswerCount);
            }}
          >
            Next
          </button>
        )}
      </DndContext>
    </div>
  );
};

export default Dnd;
