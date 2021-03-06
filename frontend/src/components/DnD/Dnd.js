/* eslint-disable no-unused-vars */
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionsContext";
import {PATH} from "../../fileWithConstan";
import { firebase } from "../../Firebase/firebase";
import Button from "../Button";
import DroppableContainer from "./DroppableContainer";
import { Item } from "./Item";
import { SortableItem } from "./SortableItem";
export const WORD_BANK = "WORD_BANK";

const Dnd = (props) => {
  const [questionState, dispatchQuestion] = useContext(QuestionContext);
  const [activeId, setActiveId] = useState(null);
  const [wordbank, setWordbank] = useState(props.words); // Containing the answers
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor)); // if I drag over a container this will handle it

  const childrenWithBlanks = React.Children.toArray(props.children).map(
    (child, index) => {
      // get every question that provides dnd
      if (child.props?.id) {
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

  blanks[WORD_BANK] = { items: wordbank }; // add the blanks to the wordbank
  const [items, setItems] = useState(blanks);

  function gatherAnswers() {
    // get the answers from the blanks
    let answers = {};
    for (const [key, value] of Object.entries(items)) {
      if (key !== "WORD_BANK") {
        answers[key] = value.items[0];
      }
    }

    return answers;
  }

  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };
  // find the blank/droppableContainer that an item is in
  const findContainer = (id) => {
    if (id in items) {
      // if its in the list we know its droppable
      return id;
    }
    // if i move over container

    return Object.keys(items).find((key) => items[key].items.includes(id));
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findContainer(active.id); // where i take out
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
        // inside container
        setItems((prevItems) => {
          let activeItems = [...items[activeContainer].items];
          let overItems = [...items[overContainer].items];
          // first check if overContainer is word bank or a blank
          // if it's a blank (NOT the word bank), swap contents with activeContainer
          // if it IS word bank, just move activeContainer contents to word bank
          if (overContainer === WORD_BANK) {
            activeItems = [];
            overItems.push(active.id);
          } else {
            activeItems.splice(activeIndex, 1);
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
    axios
      .post(`${PATH}/api/dnd/${questionState.algorithm}`, {
        answers: answers,
        algorithm: questionState.algorithm,
        questionsType: questionState.currentQuestionType,
        id: props.currentQuestionId,
        uid: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        Object.keys(result.data).map((key, value) => {
          document.getElementById(key).className = result.data[key]
            ? `blank-style bg-green-400`
            : `blank-style bg-red-700`;
        });
      })
      .catch(() => {});
  };

  return (
    <div className="mx-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancle}
      >
        <div className="flex-col items-start">
          <div>
            {childrenWithBlanks.map((child, index) => {
              const { id } = child;
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
                      {blankItems.map((value, index) => {
                        return (
                          <SortableItem
                            key={`sortable-item-${index}`}
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
          <SortableContext
            key={props.taskid}
            items={wordbank}
            strategy={() => {}}
          >
            {wordbank.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? <Item label={activeId} /> : null}
          </DragOverlay>
        </div>
        <div className="pt-4">
          {!isSubmitted ? (
            <Button
              function={() => {
                handleSubmit();
                setIsSubmitted(true);
              }}
              name="Submit"
              questionSection={true}
            />
          ) : (
            <Button
              function={() => {
                dispatchQuestion({ type: "NEXT_QUESTION" });
                setIsSubmitted(false);
              }}
              name="Next"
              questionSection={true}
            />
          )}
        </div>
      </DndContext>
    </div>
  );
};

Dnd.propTypes = {
  children: PropTypes.node.isRequired,
  taskid: PropTypes.number.isRequired,
  currentQuestionId: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  questionState: PropTypes.object,
  dispatchQuestion: PropTypes.func,
};

export default Dnd;
