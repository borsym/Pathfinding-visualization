import React, { useState } from "react";
// import Droppable from "./Droppable";
// import Draggable from "./Draggable";
// import MultipleDroppables from "./MultipleDroppables";
import {
  closestCorners,
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
import Blank from "./Blank";
export const WORD_BANK = "WORD_BANK";

const Dnd = (props) => {
  const [activeId, setActiveId] = useState(null);
  const [wordbank, setWordbank] = useState([
    "logaritmikus",
    "negyzetes",
    "sulyozott",
    "nem sulyozott",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));
  const childrenWithBlanks = React.Children.toArray(props.children).map(
    (child, index) => {
      // lekérünk minden szöveget ami a dnd körbevesz
      // console.log(child, index);
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
  // console.log(items);
  // console.log("solutions", solutions);
  // console.log("blanks: ", blanks);
  // console.log("childwb: ", childrenWithBlanks);

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
              // console.log("itemek", items); // bennük van ha változás van
              if (solutions) {
                // console.log("items  :", items);
                // console.log("ez az id:", id);
                // console.log("egyutt:", items[id]);
                const { items: blankItems } = items[id];

                // console.log("blankek:", blankItems);
                // console.log("item", items);
                // console.log("blanki,:", blankItems);
                return (
                  <>
                    {" "}
                    <DroppableContainer id={id} key={id}>
                      {blankItems.map((value) => {
                        // console.log("iteral:", value);
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
        <div className="w-48 border-2 border-black border-solid">
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
        <div className="mt-2 ml-5">
          <Button name="Submit" function={handleButtonClick} />
        </div>
      </DndContext>
    </div>
  );
  function handleButtonClick() {
    console.log("submit");
    let isCorrect = true;
    Object.entries(items).map(([key, value]) => {
      console.log("key:", key);
      console.log("value:", value);
      if (key !== WORD_BANK) {
        isCorrect &= value.items.some((item) => value.solutions.includes(item));
      }
    });
    console.log("ez az is correct:", isCorrect);
    isCorrect ? alert("Jó") : alert("Rossz");
  }

  function handleDragStart(e) {
    setActiveId(e.active.id);
  }
  // find the blank/droppableContainer that an item is in
  function findContainer(id) {
    if (id in items) {
      // ha  benne van a listában akkor tudjuk hogy dropable
      return id;
    }
    // ha szöveg fölé húzom?

    return Object.keys(items).find((key) => items[key].items.includes(id));
  }
  function handleDragEnd({ active, over }) {
    const activeContainer = findContainer(active.id); // ahonnan kiveszed
    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    // console.log("asd", activeContainer);
    const overId = over?.id;
    const overContainer = findContainer(overId);
    console.log(items);
    console.log(wordbank);
    if (activeContainer && overContainer) {
      const activeIndex = items[activeContainer].items.indexOf(active.id);
      const overIndex = items[overContainer].items.indexOf(overId);
      if (activeContainer !== overContainer) {
        // vagyis más kontérbe helyezünk át
        setItems((prevItems) => {
          console.log(prevItems);
          let activeItems = [...items[activeContainer].items];
          let overItems = [...items[overContainer].items];
          // activeContainer gets what was in overContainer and vice versa
          // first check if overContainer is word bank or a blank
          // if it's a blank (NOT the word bank), swap contents with activeContainer
          // if it IS word bank, just move activeContainer contents to word bank
          if (overContainer === WORD_BANK) {
            activeItems = [];
            overItems.push(active.id); // az adott szöveg...
            console.log("== word", overItems);
          } else {
            activeItems.splice(activeIndex, 1); // kiveszem az adott elemet belőle...
            // if there's already something in the blank, push its contents to activeItems
            if (overItems.length) {
              activeItems.push(...overItems);
            }
            overItems = [active.id];
            console.log("else", overItems);
          }

          const updatedItems = {
            ...prevItems,
            [activeContainer]: {
              ...prevItems[activeContainer],
              items: activeItems,
            },
            [overContainer]: {
              ...prevItems[overContainer],
              items: overItems,
            },
          };
          console.log("update", updatedItems);
          setWordbank(updatedItems[WORD_BANK].items);
          return updatedItems;
        });
      } else if (activeIndex !== overIndex) {
        setItems((prevItems) => ({
          ...prevItems,
          [overContainer]: {
            ...prevItems[overContainer],
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
  }
  function handleDragCancle(e) {
    setActiveId(null);
  }
};

export default Dnd;
