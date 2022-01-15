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

const Dnd = (props) => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "logaritmikus",
    "negyzetes",
    "sulyozott",
    "nem sulyozott",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));
  // const childrenWithBlanks = [...props.children];
  return (
    <div className="bg-red-100 mx-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragEnd}
        // collisionDetection={closestCorners}
      >
        <div className="flex-col items-start ">
          {/* itt lesz a szöveg ahova majd be kell huzni a válaszokat*/}
          <div>
            {props.children.map((child, index) => {
              // console.log(child.props.map((item) => console.log(item)));
              // console.log(index);
              console.log("child", child);
              // const solution = child.props;
              // console.log("lista? ", Array.isArray(solution));
              // if (child.type === Blank) {
              //   console.log("igen ez blank");
              // }
              return (
                <>
                  {" "}
                  {child.type === Blank ? (
                    <DroppableContainer id={index} key={index}>
                      a
                    </DroppableContainer>
                  ) : (
                    child
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="w-48 border-2 border-black border-solid">
          <SortableContext items={items} strategy={() => {}}>
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? <Item label={activeId} /> : null}
          </DragOverlay>
        </div>

        {/* Drag Overlay ez kell majd ahhoz hogyha mozagtom lássam */}
        <div className="mt-2 ml-5">
          <Button name="Submit" />
        </div>
      </DndContext>
    </div>
  );

  function handleDragOver(e) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragStart(e) {
    setActiveId(e.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }
};

export default Dnd;
