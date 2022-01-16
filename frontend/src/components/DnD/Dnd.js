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
import { values } from "lodash";
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
  blanks[WORD_BANK] = { wordbank };
  const [items, setItems] = useState(blanks);
  console.log(items);
  // console.log("solutions", solutions);
  // console.log("blanks: ", blanks);
  // console.log("childwb: ", childrenWithBlanks);

  return (
    <div className="bg-red-100 mx-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
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
              // console.log(child.props.map((item) => console.log(item)));
              // console.log(index);
              // console.log("child", child);
              // const solution = child.props;
              // console.log("lista? ", Array.isArray(solution));
              // if (child.type === Blank) {
              //   console.log("igen ez blank");
              // }
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

  function handleDragOver(e) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setWordbank((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
    console.log(active);
    console.log(over);
    // const activeContainer = findContainer(active.id);
    // console.log("asd", activeContainer);
    const overId = over?.id;
    const overContainer = findContainer(overId);
    let prev = null;
    if (items[overContainer].items.length === 1) {
      prev = items[overContainer].items.shift();
      wordbank.push(prev);
    }

    items[overContainer].items.push(active.id);
    setItems(items); // belerakja itt
    var index = wordbank.indexOf(active.id);
    if (index > -1) {
      wordbank.splice(index, 1);
    }
    setWordbank(wordbank);
    setActiveId(null); // ez kiszedi a kijelölt mezőből
  }

  function handleDragCancle(e) {
    setActiveId(null);
  }
};

export default Dnd;
