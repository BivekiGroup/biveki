"use client";

import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { FolderKanban, Search, User, CheckSquare, Target, Calendar } from "lucide-react";
import { useState } from "react";

const ALL_PROJECTS = gql`
  query($limit: Int, $offset: Int, $search: String) {
    allProjects(limit: $limit, offset: $offset, search: $search) {
      id
      name
      description
      createdAt
      tasksCount
      milestonesCount
      user {
        id
        name
        email
      }
    }
  }
`;

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, loading } = useQuery(ALL_PROJECTS, {
    variables: { search: debouncedSearch || undefined },
    fetchPolicy: "cache-and-network",
  });

  // Debounce search
  const handleSearch = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timer);
  };

  const projects = data?.allProjects || [];

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Проекты клиентов</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Управление всеми проектами и задачами
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск проектов..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-neutral-800 dark:bg-neutral-900"
          />
        </div>

        {/* Projects List */}
        {loading && projects.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-6 w-3/4 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                    <FolderKanban className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-violet-600 transition-colors">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Client Info */}
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{project.user.name}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-xs">{project.user.email}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <CheckSquare className="h-4 w-4" />
                      <span className="font-semibold">{project.tasksCount}</span>
                      <span className="text-neutral-600 dark:text-neutral-400">задач</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                      <Target className="h-4 w-4" />
                      <span className="font-semibold">{project.milestonesCount}</span>
                      <span className="text-neutral-600 dark:text-neutral-400">этапов</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="h-3.5 w-3.5" />
                    Создан {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
            <FolderKanban className="mx-auto h-16 w-16 text-neutral-400" />
            <h3 className="mt-4 text-xl font-bold">Проекты не найдены</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {search ? "Попробуйте изменить поисковый запрос" : "Пока нет ни одного проекта"}
            </p>
          </div>
        )}
    </div>
  );
}
