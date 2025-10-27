"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import {
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Save,
  Key,
  Shield,
  Sparkles,
  FileText,
  ArrowRight,
  AlertTriangle,
  Clock,
  Building2,
  Hash,
  CreditCard,
  MapPin
} from "lucide-react";
import Link from "next/link";
import AvatarUpload from "@/components/AvatarUpload";
import { useToast } from "@/components/ToastProvider";

const ME = gql`query{
  me {
    id
    name
    email
    avatarUrl
    clientProfile {
      id
      type
      lastName
      firstName
      middleName
      bik
      accountNumber
      inn
      companyName
      legalAddress
    }
  }
}`;
const UPDATE = gql`mutation($name:String!){ updateProfile(name:$name) }`;
const CHANGE = gql`mutation($current:String!,$next:String!){ changePassword(current:$current,next:$next) }`;

export default function ProfilePage() {
  const { data, refetch } = useQuery(ME);
  const [update] = useMutation(UPDATE);
  const [change] = useMutation(CHANGE);
  const { showToast } = useToast();
  const user = data?.me;
  const [name, setName] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  if (!user) return null;

  // Check if legal info is filled
  const profile = user.clientProfile;
  const isLegalInfoFilled = profile && profile.bik && profile.accountNumber && (
    (profile.type === "INDIVIDUAL" && profile.lastName && profile.firstName) ||
    (profile.type === "LEGAL" && profile.inn && profile.companyName)
  );

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    const v = name.trim() || user.name;
    await update({ variables: { name: v } });
    await refetch();
    showToast("Профиль успешно обновлён");
    setName("");
  }

  async function onChange(e: React.FormEvent) {
    e.preventDefault();
    if (p1.length < 6 || p2.length < 6) {
      showToast("Пароль должен содержать минимум 6 символов", "error");
      return;
    }
    try {
      await change({ variables: { current: p1, next: p2 } });
      setP1("");
      setP2("");
      showToast("Пароль успешно изменён");
    } catch {
      showToast("Неверный текущий пароль", "error");
    }
  }

  return (
    <AccountLayout>
      <main className="py-2 space-y-6">
        {/* Header with Avatar */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-8 text-white dark:border-white/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="relative flex items-center gap-6">
            <AvatarUpload
              currentAvatar={user.avatarUrl}
              userName={user.name}
              onSuccess={refetch}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <div className="mt-2 flex items-center gap-2 text-purple-100">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Form */}
          <form
            onSubmit={onSave}
            className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 text-white shadow-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Личные данные</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Обновите информацию профиля
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <User className="h-4 w-4 text-neutral-500" />
                  Имя
                </label>
                <input
                  className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Mail className="h-4 w-4 text-neutral-500" />
                  Email
                </label>
                <input
                  className="h-11 w-full rounded-xl border border-neutral-900/10 bg-neutral-50 px-4 text-sm text-neutral-500 dark:border-white/10 dark:bg-white/[0.02]"
                  value={user.email}
                  disabled
                />
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Email нельзя изменить
                </p>
              </div>

              <button className="group/btn mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]">
                <Save className="h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-12" />
                Сохранить изменения
              </button>
            </div>
          </form>

          {/* Password Form */}
          <form
            onSubmit={onChange}
            className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-3 text-white shadow-lg">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Безопасность</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Смените пароль аккаунта
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Key className="h-4 w-4 text-neutral-500" />
                  Текущий пароль
                </label>
                <input
                  type="password"
                  className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  placeholder="Введите текущий пароль"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Shield className="h-4 w-4 text-neutral-500" />
                  Новый пароль
                </label>
                <input
                  type="password"
                  className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                  placeholder="Минимум 6 символов"
                />
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Используйте сложный пароль для защиты аккаунта
                </p>
              </div>

              <button className="group/btn mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.98]">
                <Lock className="h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
                Изменить пароль
              </button>
            </div>
          </form>
        </div>

        {/* Legal Info Block */}
        {isLegalInfoFilled ? (
          <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Юридическая информация</h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {profile.type === "INDIVIDUAL" ? "Физическое лицо" : "Юридическое лицо / ИП"}
                  </p>
                </div>
              </div>
              <Link
                href="/profile/legal"
                className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/40"
              >
                Изменить
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {profile.type === "INDIVIDUAL" ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-white/10 dark:from-blue-500/10 dark:to-indigo-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                        <User className="h-3 w-3" />
                        ФИО
                      </div>
                      <div className="text-base font-semibold">
                        {profile.lastName} {profile.firstName}{profile.middleName ? ` ${profile.middleName}` : ""}
                      </div>
                    </div>
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-white/10 dark:from-purple-500/10 dark:to-pink-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                        <CreditCard className="h-3 w-3" />
                        БИК
                      </div>
                      <div className="font-mono text-base font-semibold">{profile.bik}</div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-white/10 dark:from-green-500/10 dark:to-emerald-500/10">
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
                      <Hash className="h-3 w-3" />
                      Номер счета
                    </div>
                    <div className="font-mono text-base font-semibold">{profile.accountNumber}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-white/10 dark:from-blue-500/10 dark:to-indigo-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                        <Building2 className="h-3 w-3" />
                        Организация
                      </div>
                      <div className="text-base font-semibold">{profile.companyName}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:border-white/10 dark:from-violet-500/10 dark:to-purple-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                        <Hash className="h-3 w-3" />
                        ИНН
                      </div>
                      <div className="font-mono text-base font-semibold">{profile.inn}</div>
                    </div>
                  </div>
                  {profile.legalAddress && (
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-amber-50 to-orange-50 p-4 dark:border-white/10 dark:from-amber-500/10 dark:to-orange-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                        <MapPin className="h-3 w-3" />
                        Юридический адрес
                      </div>
                      <div className="text-base font-semibold">{profile.legalAddress}</div>
                    </div>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-white/10 dark:from-purple-500/10 dark:to-pink-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                        <CreditCard className="h-3 w-3" />
                        БИК
                      </div>
                      <div className="font-mono text-base font-semibold">{profile.bik}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-900/10 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-white/10 dark:from-green-500/10 dark:to-emerald-500/10">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
                        <Hash className="h-3 w-3" />
                        Номер счета
                      </div>
                      <div className="font-mono text-base font-semibold">{profile.accountNumber}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 shadow-lg shadow-amber-500/20 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-red-500/10">
            {/* Animated gradient bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>

            {/* Pulsing badge */}
            <div className="absolute right-4 top-4">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-amber-500 opacity-75"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="pr-12">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/40">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                    Заполните юридическую информацию
                  </h3>
                  <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                    Укажите ваши реквизиты для выставления счетов и получения оплаты
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/profile/legal"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/40 active:scale-[0.98]"
                >
                  <FileText className="h-4 w-4" />
                  Заполнить реквизиты
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Займет 2 минуты</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </AccountLayout>
  );
}
