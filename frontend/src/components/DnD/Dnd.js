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

const Dnd = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "logaritmikus",
    "negyzetes",
    "sulyozott",
    "nem sulyozott",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="w-48 border-2 border-black border-solid">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragEnd}
      >
        <SortableContext items={items} strategy={() => {}}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
        <DragOverlay>{activeId ? <Item label={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragOver(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }
};

export default Dnd;
