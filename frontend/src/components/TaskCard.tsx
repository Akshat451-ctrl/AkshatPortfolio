import { Task } from "@/lib/api";
import { useAuth } from "@/context/AuthContest";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const isEditor = role === "editor";

  const statusColor =
    task.status === "completed"
      ? "bg-success/10 text-success"
      : "bg-warning/10 text-warning";

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{task.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(task.created_at).toLocaleDateString()}
        </div>

        <div className="flex gap-1.5">
          {(isAdmin || isEditor) && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 px-2.5">
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          )}
          {isAdmin && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(task)} className="h-8 px-2.5 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
