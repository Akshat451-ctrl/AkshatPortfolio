import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContest";
import { useToast } from "@/hooks/use-toast";
import { taskAPI, Task } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import DeleteConfirm from "@/components/DeleteConfirm";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = () => {
  const { email, role, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskAPI.getAll();
      setTasks(res.data);
    } catch {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data: { title: string; description: string }) => {
    await taskAPI.create(data);
    toast({ title: "Task Created", description: "New task added successfully." });
    fetchTasks();
  };

  const handleUpdate = async (data: { title: string; description: string; status?: string }) => {
    if (!editingTask) return;
    await taskAPI.update(editingTask.id, {
      title: data.title,
      description: data.description,
      status: data.status || editingTask.status,
    });
    toast({ title: "Task Updated", description: "Task updated successfully." });
    fetchTasks();
  };

  const handleDelete = async () => {
    if (!deletingTask) return;
    try {
      await taskAPI.delete(deletingTask.id);
      toast({ title: "Task Deleted", description: "Task removed successfully." });
      fetchTasks();
    } catch {
      // handled by interceptor
    }
    setDeleteOpen(false);
    setDeletingTask(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = role === "admin";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 md:static md:z-auto flex flex-col w-64 min-h-screen bg-card border-r border-border transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="text-lg font-bold text-foreground">
            Task<span className="text-primary">Flow</span>
          </span>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-foreground truncate">{email}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>

          {isAdmin && (
            <Button
              onClick={() => { setModalMode("create"); setEditingTask(null); setModalOpen(true); }}
              className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2"
            >
              <Plus className="h-4 w-4" /> New Task
            </Button>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {loading ? (
            <LoadingSpinner />
          ) : tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No tasks yet.</p>
              {isAdmin && (
                <Button
                  className="mt-4 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  onClick={() => { setModalMode("create"); setEditingTask(null); setModalOpen(true); }}
                >
                  Create your first task
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={(t) => { setModalMode("edit"); setEditingTask(t); setModalOpen(true); }}
                  onDelete={(t) => { setDeletingTask(t); setDeleteOpen(true); }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
        task={editingTask}
        mode={modalMode}
      />
      <DeleteConfirm
        open={deleteOpen}
        task={deletingTask}
        onClose={() => { setDeleteOpen(false); setDeletingTask(null); }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;