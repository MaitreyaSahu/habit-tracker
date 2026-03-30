import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import type { StudyTask } from "@/store/types";
import TaskCard from "@/features/tasks/components/TaskCard";

interface TaskBoardProps {
  tasks: StudyTask[];
  onReorder: (orderedIds: string[]) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StudyTask>) => void;
}

export default function TaskBoard({
  tasks,
  onReorder,
  onToggle,
  onDelete,
  onUpdate
}: TaskBoardProps) {
  const ordered = [...tasks].sort((a, b) => a.order - b.order);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const next = [...ordered];
    const [removed] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, removed);
    onReorder(next.map((task) => task.id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
            {ordered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided) => (
                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                    <TaskCard
                      task={task}
                      dragHandleProps={dragProvided.dragHandleProps ?? undefined}
                      onToggle={() => onToggle(task.id)}
                      onDelete={() => onDelete(task.id)}
                      onUpdate={(updates) => onUpdate(task.id, updates)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
