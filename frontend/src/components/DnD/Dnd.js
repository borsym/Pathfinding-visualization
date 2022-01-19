import React, { useState } from "react";
// import Droppable from "./Droppable";
// import Draggable from "./Draggable";
// import MultipleDroppables from "./MultipleDroppables";
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
export const WORD_BANK = "WORD_BANK";

const Dnd = (props) => {
  const [activeId, setActiveId] = useState(null);
  const [wordbank, setWordbank] = useState(props.words);

  const sensors = useSensors(useSensor(PointerSensor));
  const childrenWithBlanks = React.Children.toArray(props.children).map(
    (child, index) => {
      // lekérünk minden szöveget ami a dnd körbevesz
      if (child.props?.solution) {
        // ha van solution adattagja
        const { solution } = child.props;
        const solutions = Array.isArray(solution) ? solution : [solution]; // ja több jó megoldás is van
        return {
          id: `blank-${index}`,
          solutions,
          items: [],
        };
      }
      return child;
    }
  );
  const solutions = [];
  const blanks = childrenWithBlanks.reduce((acc, currChild) => {
    if (currChild.solutions) {
      solutions.push(...currChild.solutions);
      return {
        ...acc,
        [currChild.id]: currChild,
      };
    }

    return acc;
  }, {});

  blanks[WORD_BANK] = { items: wordbank };
  const [items, setItems] = useState(blanks);

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
  return (
    <div className="bg-red-100 mx-auto">
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
              const { solutions, id } = child;
              if (solutions) {
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
                        return (
                          <SortableItem
                            key={`sortable-item--${value}`}
                            id={value}
                            taskId={props.taskId}
                            // isCorrect={isBlankCorrect}
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
          taskId={props.taskId}
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
        <div className="mt-2 ml-5">
          <button
            className="ml-4 px-6 py-3 leading-none font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900"
            onClick={handleButtonClick}
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-3 leading-none font-semibold rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </DndContext>
    </div>
  );
};

export default Dnd;
