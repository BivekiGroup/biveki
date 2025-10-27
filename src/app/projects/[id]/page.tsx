"use client";

import { useParams, useRouter } from "next/navigation";
import { gql } from "@apollo/client/core";
import { useQuery, useMutation } from "@apollo/client/react";
import AccountLayout from "@/components/AccountLayout";
import {
  ArrowLeft,
  FolderKanban,
  Calendar,
  FileText,
  CheckSquare,
  Upload,
  Clock,
  User,
  MessageSquare,
  Plus,
  Circle,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
  Flag,
  CheckCircle2,
  PlayCircle,
  Eye,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

const PROJECT = gql`
  query($id: Int!) {
    project(id: $id) {
      id
      name
      description
      createdAt
      tasks {
        id
        title
        description
        status
        priority
        milestoneId
        dueDate
        createdAt
        updatedAt
      }
      milestones {
        id
        name
        description
        dueDate
        createdAt
        tasks {
          id
        }
      }
      files {
        id
        filename
        url
        size
        mimeType
        createdAt
      }
    }
  }
`;

const CREATE_TASK = gql`
  mutation($projectId: Int!, $title: String!, $description: String, $status: TaskStatus, $priority: TaskPriority, $milestoneId: Int, $dueDate: String) {
    createTask(projectId: $projectId, title: $title, description: $description, status: $status, priority: $priority, milestoneId: $milestoneId, dueDate: $dueDate) {
      id
      title
      description
      status
      priority
      milestoneId
      dueDate
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_TASK = gql`
  mutation($id: Int!, $title: String, $description: String, $status: TaskStatus, $priority: TaskPriority, $milestoneId: Int, $dueDate: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, priority: $priority, milestoneId: $milestoneId, dueDate: $dueDate) {
      id
      title
      description
      status
      priority
      milestoneId
      dueDate
      createdAt
      updatedAt
    }
  }
`;

const DELETE_TASK = gql`
  mutation($id: Int!) {
    deleteTask(id: $id)
  }
`;

const CREATE_MILESTONE = gql`
  mutation($projectId: Int!, $name: String!, $description: String, $dueDate: String) {
    createMilestone(projectId: $projectId, name: $name, description: $description, dueDate: $dueDate) {
      id
      name
      description
      dueDate
      createdAt
      tasks {
        id
      }
    }
  }
`;

const DELETE_MILESTONE = gql`
  mutation($id: Int!) {
    deleteMilestone(id: $id)
  }
`;

type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const projectId = parseInt(params.id as string);

  const [activeTab, setActiveTab] = useState<"tasks" | "milestones" | "files">("tasks");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateMilestone, setShowCreateMilestone] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState<{ show: boolean; taskId: number | null; taskTitle: string }>({ show: false, taskId: null, taskTitle: "" });
  const [deleteMilestoneModal, setDeleteMilestoneModal] = useState<{ show: boolean; milestoneId: number | null; milestoneName: string }>({ show: false, milestoneId: null, milestoneName: "" });

  const { data, loading } = useQuery(PROJECT, {
    variables: { id: projectId },
    skip: !projectId,
    fetchPolicy: "cache-and-network",
  });

  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      const existingData: any = cache.readQuery({ query: PROJECT, variables: { id: projectId } });
      if (existingData?.project) {
        cache.writeQuery({
          query: PROJECT,
          variables: { id: projectId },
          data: {
            project: {
              ...existingData.project,
              tasks: [...existingData.project.tasks, createTask],
            },
          },
        });
      }
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    update(cache, { data: { updateTask } }) {
      const existingData: any = cache.readQuery({ query: PROJECT, variables: { id: projectId } });
      if (existingData?.project) {
        cache.writeQuery({
          query: PROJECT,
          variables: { id: projectId },
          data: {
            project: {
              ...existingData.project,
              tasks: existingData.project.tasks.map((t: any) =>
                t.id === updateTask.id ? updateTask : t
              ),
            },
          },
        });
      }
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data }, { variables }) {
      const existingData: any = cache.readQuery({ query: PROJECT, variables: { id: projectId } });
      if (existingData?.project && variables?.id) {
        cache.writeQuery({
          query: PROJECT,
          variables: { id: projectId },
          data: {
            project: {
              ...existingData.project,
              tasks: existingData.project.tasks.filter((t: any) => Number(t.id) !== Number(variables.id)),
            },
          },
        });
      }
    },
  });

  const [createMilestone] = useMutation(CREATE_MILESTONE, {
    update(cache, { data: { createMilestone } }) {
      const existingData: any = cache.readQuery({ query: PROJECT, variables: { id: projectId } });
      if (existingData?.project) {
        cache.writeQuery({
          query: PROJECT,
          variables: { id: projectId },
          data: {
            project: {
              ...existingData.project,
              milestones: [...existingData.project.milestones, createMilestone],
            },
          },
        });
      }
    },
  });

  const [deleteMilestone] = useMutation(DELETE_MILESTONE, {
    update(cache, { data }, { variables }) {
      const existingData: any = cache.readQuery({ query: PROJECT, variables: { id: projectId } });
      if (existingData?.project && variables?.id) {
        cache.writeQuery({
          query: PROJECT,
          variables: { id: projectId },
          data: {
            project: {
              ...existingData.project,
              milestones: existingData.project.milestones.filter((m: any) => Number(m.id) !== Number(variables.id)),
            },
          },
        });
      }
    },
  });

  const project = data?.project;

  if (loading) {
    return (
      <AccountLayout>
        <main className="py-2 space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-10 w-32 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-12 w-2/3 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-700"></div>
            ))}
          </div>
        </main>
      </AccountLayout>
    );
  }

  if (!project) {
    return (
      <AccountLayout>
        <main className="py-2">
          <div className="text-center py-12">
            <FolderKanban className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Проект не найден
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Возможно, он был удален или у вас нет доступа
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться к проектам
            </Link>
          </div>
        </main>
      </AccountLayout>
    );
  }

  const handleCreateTask = async (formData: any) => {
    try {
      await createTask({
        variables: {
          projectId,
          ...formData,
        },
      });
      setShowCreateTask(false);
      showToast("Задача создана");
    } catch (err: any) {
      showToast(err.message || "Ошибка создания задачи", "error");
    }
  };

  const handleUpdateTaskStatus = async (taskId: number, status: string) => {
    try {
      await updateTask({
        variables: { id: Number(taskId), status },
      });
      showToast("Статус обновлён");
    } catch (err: any) {
      showToast(err.message || "Ошибка", "error");
    }
  };

  const handleDeleteTask = async () => {
    if (!deleteTaskModal.taskId) return;
    try {
      await deleteTask({ variables: { id: Number(deleteTaskModal.taskId) } });
      setDeleteTaskModal({ show: false, taskId: null, taskTitle: "" });
      showToast("Задача удалена");
    } catch (err: any) {
      showToast(err.message || "Ошибка", "error");
    }
  };

  const handleCreateMilestone = async (formData: any) => {
    try {
      await createMilestone({
        variables: {
          projectId,
          ...formData,
        },
      });
      setShowCreateMilestone(false);
      showToast("Этап создан");
    } catch (err: any) {
      showToast(err.message || "Ошибка", "error");
    }
  };

  const handleDeleteMilestone = async () => {
    if (!deleteMilestoneModal.milestoneId) return;
    try {
      await deleteMilestone({ variables: { id: Number(deleteMilestoneModal.milestoneId) } });
      setDeleteMilestoneModal({ show: false, milestoneId: null, milestoneName: "" });
      showToast("Этап удалён");
    } catch (err: any) {
      showToast(err.message || "Ошибка", "error");
    }
  };

  const statusColumns = [
    { id: "TODO" as TaskStatus, label: "К выполнению", icon: Circle, color: "from-neutral-500 to-neutral-600" },
    { id: "IN_PROGRESS" as TaskStatus, label: "В работе", icon: PlayCircle, color: "from-blue-500 to-blue-600" },
    { id: "REVIEW" as TaskStatus, label: "На проверке", icon: Eye, color: "from-yellow-500 to-yellow-600" },
    { id: "DONE" as TaskStatus, label: "Готово", icon: CheckCircle2, color: "from-green-500 to-green-600" },
  ];

  const priorityConfig = {
    LOW: { label: "Низкий", color: "text-neutral-500", bg: "bg-neutral-100 dark:bg-neutral-800" },
    MEDIUM: { label: "Средний", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    HIGH: { label: "Высокий", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
    URGENT: { label: "Срочно", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
  };

  return (
    <AccountLayout>
      <main className="py-2 space-y-6">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к проектам
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
              <FolderKanban className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              {project.description && (
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>
              )}
              <div className="mt-3 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Создан {new Date(project.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-semibold transition-all ${
              activeTab === "tasks"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <CheckSquare className="h-4 w-4" />
            Задачи ({project.tasks?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-semibold transition-all ${
              activeTab === "milestones"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Target className="h-4 w-4" />
            Этапы ({project.milestones?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-semibold transition-all ${
              activeTab === "files"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Upload className="h-4 w-4" />
            Файлы ({project.files?.length || 0})
          </button>
        </div>

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Канбан доска</h2>
              <button
                onClick={() => setShowCreateTask(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Создать задачу
              </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statusColumns.map((column) => {
                const Icon = column.icon;
                const tasksInColumn = project.tasks?.filter((t: any) => t.status === column.id) || [];

                return (
                  <div key={column.id} className="flex flex-col gap-3">
                    <div className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${column.color} px-4 py-2 text-white shadow-lg`}>
                      <Icon className="h-4 w-4" />
                      <span className="font-semibold text-sm">{column.label}</span>
                      <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                        {tasksInColumn.length}
                      </span>
                    </div>

                    <div className="space-y-3 min-h-[200px]">
                      {tasksInColumn.map((task: any) => {
                        const priority = priorityConfig[task.priority as TaskPriority];
                        return (
                          <div
                            key={task.id}
                            className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-sm flex-1">{task.title}</h3>
                              <button
                                onClick={() => setDeleteTaskModal({ show: true, taskId: task.id, taskTitle: task.title })}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {task.description && (
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                                {task.description}
                              </p>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 rounded-lg ${priority.bg} px-2 py-1 text-xs font-semibold ${priority.color}`}>
                                <Flag className="h-3 w-3" />
                                {priority.label}
                              </span>

                              {task.dueDate && (
                                <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                  <Clock className="h-3 w-3" />
                                  {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                                </span>
                              )}
                            </div>

                            {/* Status change buttons - client can only move from REVIEW to DONE */}
                            <div className="mt-3 flex gap-1">
                              {task.status === "REVIEW" ? (
                                <button
                                  onClick={() => handleUpdateTaskStatus(task.id, "DONE")}
                                  className="flex-1 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-2 py-1 text-xs font-semibold text-white shadow transition-all hover:scale-105"
                                >
                                  Подтвердить выполнение
                                </button>
                              ) : (
                                <div className="text-xs text-center text-neutral-500 dark:text-neutral-400 py-1">
                                  {task.status === "DONE" && "Задача выполнена"}
                                  {task.status === "TODO" && "Задача ожидает начала работы"}
                                  {task.status === "IN_PROGRESS" && "Задача в работе"}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === "milestones" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Этапы проекта</h2>
              <button
                onClick={() => setShowCreateMilestone(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Создать этап
              </button>
            </div>

            {project.milestones && project.milestones.length > 0 ? (
              <div className="grid gap-4">
                {project.milestones.map((milestone: any) => (
                  <div
                    key={milestone.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                            <Target className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-bold">{milestone.name}</h3>
                        </div>

                        {milestone.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                            {milestone.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          {milestone.dueDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Срок: {new Date(milestone.dueDate).toLocaleDateString('ru-RU')}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            Задач: {milestone.tasks?.length || 0}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setDeleteMilestoneModal({ show: true, milestoneId: milestone.id, milestoneName: milestone.name })}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <Target className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  Пока нет этапов. Создайте первый этап для структурирования работы.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Files Tab */}
        {activeTab === "files" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Файлы проекта</h2>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <Upload className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <p className="text-neutral-600 dark:text-neutral-400">
                Функционал загрузки файлов будет добавлен позже
              </p>
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {showCreateTask && (
          <TaskModal
            projectId={projectId}
            milestones={project.milestones}
            onClose={() => setShowCreateTask(false)}
            onSubmit={handleCreateTask}
          />
        )}

        {/* Create Milestone Modal */}
        {showCreateMilestone && (
          <MilestoneModal
            onClose={() => setShowCreateMilestone(false)}
            onSubmit={handleCreateMilestone}
          />
        )}

        {/* Delete Task Confirmation Modal */}
        {deleteTaskModal.show && (
          <ConfirmModal
            title="Удалить задачу?"
            message={`Вы уверены, что хотите удалить задачу "${deleteTaskModal.taskTitle}"? Это действие нельзя отменить.`}
            confirmText="Удалить"
            cancelText="Отмена"
            onConfirm={handleDeleteTask}
            onCancel={() => setDeleteTaskModal({ show: false, taskId: null, taskTitle: "" })}
            danger
          />
        )}

        {/* Delete Milestone Confirmation Modal */}
        {deleteMilestoneModal.show && (
          <ConfirmModal
            title="Удалить этап?"
            message={`Вы уверены, что хотите удалить этап "${deleteMilestoneModal.milestoneName}"? Все задачи этого этапа останутся, но потеряют связь с этапом.`}
            confirmText="Удалить"
            cancelText="Отмена"
            onConfirm={handleDeleteMilestone}
            onCancel={() => setDeleteMilestoneModal({ show: false, milestoneId: null, milestoneName: "" })}
            danger
          />
        )}
      </main>
    </AccountLayout>
  );
}

// Task Modal Component
function TaskModal({ projectId, milestones, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as TaskPriority,
    milestoneId: null as number | null,
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Всегда создаем задачи в статусе TODO
    onSubmit({ ...formData, status: "TODO" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4">Создать задачу</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Название</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
              placeholder="Название задачи"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
              rows={3}
              placeholder="Описание задачи (опционально)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Приоритет</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
            >
              <option value="LOW">Низкий</option>
              <option value="MEDIUM">Средний</option>
              <option value="HIGH">Высокий</option>
              <option value="URGENT">Срочно</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Срок выполнения</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
            />
          </div>

          {milestones && milestones.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-2">Этап</label>
              <select
                value={formData.milestoneId || ""}
                onChange={(e) => setFormData({ ...formData, milestoneId: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
              >
                <option value="">Без этапа</option>
                {milestones.map((m: any) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-neutral-200 px-4 py-2 font-semibold transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Milestone Modal Component
function MilestoneModal({ onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4">Создать этап</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Название</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
              placeholder="Название этапа"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
              rows={3}
              placeholder="Описание этапа (опционально)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Срок выполнения</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-neutral-200 px-4 py-2 font-semibold transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg transition-all hover:scale-105"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Confirm Modal Component
function ConfirmModal({ title, message, confirmText, cancelText, onConfirm, onCancel, danger }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            {danger ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 ml-15">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl bg-neutral-200 px-4 py-2.5 font-semibold transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:scale-105 ${
              danger
                ? "bg-gradient-to-r from-red-600 to-red-700"
                : "bg-gradient-to-r from-violet-600 to-purple-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
