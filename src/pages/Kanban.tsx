import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddTaskDialog } from '@/components/dashboard/AddTaskDialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Types
interface KanbanTask {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

// Sample data
const initialColumns: { [key: string]: KanbanColumn } = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Create dashboard wireframes', priority: 'high', assignee: 'Jane Smith' },
      { id: 'task-2', content: 'Design database schema', priority: 'medium', assignee: 'Mike Johnson' },
      { id: 'task-3', content: 'Research API integration options', priority: 'low' },
    ],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 'task-4', content: 'Implement authentication service', priority: 'high', assignee: 'John Doe' },
      { id: 'task-5', content: 'Create component library', priority: 'medium', assignee: 'Lisa Brown' },
    ],
  },
  'review': {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 'task-6', content: 'Code review: User module', priority: 'medium', assignee: 'Tom Wilson' },
      { id: 'task-7', content: 'Test payment integration', priority: 'high', assignee: 'Emma Davis' },
    ],
  },
  'done': {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-8', content: 'Project setup', priority: 'low', assignee: 'John Doe' },
      { id: 'task-9', content: 'Define requirements', priority: 'medium', assignee: 'Jane Smith' },
    ],
  },
};

// Helper for priority styling
const getPriorityInfo = (priority: string) => {
  switch (priority) {
    case 'high':
      return {
        variant: 'destructive' as const,
        gradient: 'from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-600'
      };
    case 'medium':
      return {
        variant: 'default' as const,
        gradient: 'from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600'
      };
    case 'low':
      return {
        variant: 'outline' as const,
        gradient: 'from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600'
      };
    default:
      return {
        variant: 'outline' as const,
        gradient: 'from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600'
      };
  }
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialColumns);

  // Using any type for now as the exact type is not available
  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const newTasks = Array.from(sourceColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      // Moving from one column to another
      const sourceTasks = Array.from(sourceColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      const destTasks = Array.from(destColumn.tasks);
      destTasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destColumn.id]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  return (
    <div className="flex-1 space-y-3">
      <div className="flex items-end justify-end mb-4">
        <AddTaskDialog onAddTask={(newTask) => {
          const newTaskId = `task-${Date.now()}`;
          const todoColumn = columns['todo'];
          const newTasks = [...todoColumn.tasks, { id: newTaskId, ...newTask }];
          setColumns({
            ...columns,
            'todo': {
              ...todoColumn,
              tasks: newTasks
            }
          });
        }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(columns).map(column => (
            <div key={column.id} className="h-full">
              <Card className="border border-border shadow-md h-full">
                <CardHeader className="pb-2 border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">{column.title}</CardTitle>
                    <div className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {column.tasks.length}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <Droppable droppableId={column.id}>
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] rounded-md ${
                          snapshot.isDraggingOver ? 'bg-primary/10 dark:bg-primary/5' : ''
                        }`}
                      >
                        {column.tasks.map((task, index) => {
                          const priorityInfo = getPriorityInfo(task.priority);
                          
                          return (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided: any, snapshot: any) => (
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-2.5 mb-2 rounded-md border ${
                                        snapshot.isDragging 
                                          ? 'shadow-lg bg-card/95 dark:bg-card/80 border-primary/30 ring-1 ring-primary/20' 
                                          : 'shadow-sm bg-card hover:bg-accent/50 dark:hover:bg-accent/30 border-border transition-colors duration-200'
                                      } cursor-grab active:cursor-grabbing group`}
                                    >
                                      <div className="flex flex-col gap-1.5">
                                        <div className="text-sm font-medium group-hover:text-primary transition-colors">{task.content}</div>
                                        <div className="flex items-center justify-between">
                                          <Badge variant={priorityInfo.variant} className={`bg-gradient-to-r ${priorityInfo.gradient} dark:text-white`}>
                                            {task.priority}
                                          </Badge>
                                          {task.assignee && (
                                            <span className="text-xs text-muted-foreground">
                                              {task.assignee}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-80 border border-border shadow-lg bg-popover text-popover-foreground">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-semibold text-primary">Task Details</h4>
                                        <Badge variant={priorityInfo.variant} className={`bg-gradient-to-r ${priorityInfo.gradient} dark:text-white`}>
                                          {task.priority} priority
                                        </Badge>
                                      </div>
                                      <p className="text-sm">{task.content}</p>
                                      {task.assignee && (
                                        <div className="flex justify-between items-center mt-2">
                                          <span className="text-sm text-muted-foreground">Assigned to:</span>
                                          <span className="text-sm font-medium">{task.assignee}</span>
                                        </div>
                                      )}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
