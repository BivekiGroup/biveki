"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import {
  Building2,
  User,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Hash,
  Landmark
} from "lucide-react";
import FioAutocomplete from "@/components/FioAutocomplete";
import BikInput from "@/components/BikInput";
import InnInput from "@/components/InnInput";
import { useToast } from "@/components/ToastProvider";
import { useRouter } from "next/navigation";

const ME = gql`
  query {
    me {
      id
      name
      email
      clientProfile {
        id
        type
        lastName
        firstName
        middleName
        inn
        companyName
        legalAddress
        bik
        accountNumber
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateClientProfile(
    $type: ClientType!
    $lastName: String
    $firstName: String
    $middleName: String
    $inn: String
    $companyName: String
    $legalAddress: String
    $bik: String
    $accountNumber: String
  ) {
    updateClientProfile(
      type: $type
      lastName: $lastName
      firstName: $firstName
      middleName: $middleName
      inn: $inn
      companyName: $companyName
      legalAddress: $legalAddress
      bik: $bik
      accountNumber: $accountNumber
    )
  }
`;

type ClientType = "INDIVIDUAL" | "LEGAL";

export default function LegalInfoPage() {
  const { data, refetch } = useQuery(ME);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const { showToast } = useToast();
  const router = useRouter();

  const user = data?.me;
  const profile = user?.clientProfile;

  const [type, setType] = useState<ClientType>(profile?.type || "INDIVIDUAL");

  // Физлицо
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");

  // Юрлицо
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [legalAddress, setLegalAddress] = useState("");

  // Общее
  const [bik, setBik] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Load existing data
  useState(() => {
    if (profile) {
      setType(profile.type);
      setLastName(profile.lastName || "");
      setFirstName(profile.firstName || "");
      setMiddleName(profile.middleName || "");
      setInn(profile.inn || "");
      setCompanyName(profile.companyName || "");
      setLegalAddress(profile.legalAddress || "");
      setBik(profile.bik || "");
      setAccountNumber(profile.accountNumber || "");
    }
  });

  if (!user) return null;

  async function onSave(e: React.FormEvent) {
    e.preventDefault();

    const variables: any = { type };

    if (type === "INDIVIDUAL") {
      if (!lastName.trim() || !firstName.trim()) {
        showToast("Фамилия и имя обязательны для физлица", "error");
        return;
      }
      variables.lastName = lastName.trim();
      variables.firstName = firstName.trim();
      if (middleName.trim()) variables.middleName = middleName.trim();
    } else {
      if (!inn.trim() || !companyName.trim() || !legalAddress.trim()) {
        showToast("ИНН, название и юридический адрес обязательны для юрлица", "error");
        return;
      }

      // Validate INN length (10 or 12 digits)
      const innTrimmed = inn.trim();
      if (!/^\d{10}$|^\d{12}$/.test(innTrimmed)) {
        showToast("ИНН должен содержать 10 цифр (юрлицо) или 12 цифр (ИП)", "error");
        return;
      }

      variables.inn = innTrimmed;
      variables.companyName = companyName.trim();
      variables.legalAddress = legalAddress.trim();
    }

    // Validate BIK (9 digits)
    const bikTrimmed = bik.trim();
    if (!/^\d{9}$/.test(bikTrimmed)) {
      showToast("БИК должен содержать ровно 9 цифр", "error");
      return;
    }

    // Validate account number (20 digits)
    const accountTrimmed = accountNumber.trim();
    if (!/^\d{20}$/.test(accountTrimmed)) {
      showToast("Номер счета должен содержать ровно 20 цифр", "error");
      return;
    }

    if (!bikTrimmed || !accountTrimmed) {
      showToast("БИК и номер счета обязательны", "error");
      return;
    }

    variables.bik = bikTrimmed;
    variables.accountNumber = accountTrimmed;

    try {
      await updateProfile({ variables });
      await refetch();
      showToast("Данные успешно сохранены!");
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      showToast(error.message || "Ошибка сохранения", "error");
    }
  }

  return (
    <AccountLayout>
      <main className="py-2 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Юридическая информация</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Укажите реквизиты для выставления счетов
            </p>
          </div>
        </div>

        {/* Type Selector */}
        <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 block">
            Тип плательщика
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setType("INDIVIDUAL")}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                type === "INDIVIDUAL"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-md dark:text-emerald-300"
                  : "border-neutral-900/10 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  type === "INDIVIDUAL"
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-400"
                }`}
              >
                <User className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Физическое лицо</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">ФИО и реквизиты</div>
              </div>
              {type === "INDIVIDUAL" && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setType("LEGAL")}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                type === "LEGAL"
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-700 shadow-md dark:text-blue-300"
                  : "border-neutral-900/10 bg-white hover:bg-neutral-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  type === "LEGAL"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-400"
                }`}
              >
                <Building2 className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Юрлицо / ИП</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">ИНН, название, адрес</div>
              </div>
              {type === "LEGAL" && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSave} className="space-y-6">
          {/* Conditional Fields */}
          {type === "INDIVIDUAL" ? (
            <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-2xl"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white shadow-lg">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Данные физлица</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Введите ФИО для выставления счетов
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <User className="h-4 w-4 text-neutral-500" />
                    ФИО *
                  </label>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    Начните вводить для автоподстановки
                  </p>
                  <FioAutocomplete
                    onSelect={(surname, name, patronymic) => {
                      setLastName(surname);
                      setFirstName(name);
                      setMiddleName(patronymic);
                    }}
                    initialValue={lastName && firstName ? `${lastName} ${firstName} ${middleName}`.trim() : ""}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Фамилия *
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Иванов"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Имя *
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Иван"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Отчество
                    </label>
                    <input
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      placeholder="Иванович"
                      className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 text-white shadow-lg">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Данные юрлица/ИП</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Введите реквизиты организации
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <Hash className="h-4 w-4 text-neutral-500" />
                    ИНН *
                  </label>
                  <InnInput
                    value={inn}
                    onChange={setInn}
                    onPartyFound={(data) => {
                      setCompanyName(data.companyName);
                      setLegalAddress(data.legalAddress);
                    }}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <Building2 className="h-4 w-4 text-neutral-500" />
                    Название организации *
                  </label>
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder='ООО "Компания"'
                    required
                    className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <MapPin className="h-4 w-4 text-neutral-500" />
                    Юридический адрес *
                  </label>
                  <textarea
                    value={legalAddress}
                    onChange={(e) => setLegalAddress(e.target.value)}
                    placeholder="г. Москва, ул. Ленина, д. 1"
                    required
                    rows={2}
                    className="w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bank Details */}
          <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-t-2xl"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-3 text-white shadow-lg">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Банковские реквизиты</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Для получения оплаты
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Hash className="h-4 w-4 text-neutral-500" />
                  БИК банка *
                </label>
                <BikInput value={bik} onChange={setBik} />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <CreditCard className="h-4 w-4 text-neutral-500" />
                  Номер счета получателя *
                </label>
                <input
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="40817810099910004312"
                  required
                  maxLength={20}
                  pattern="\d{20}"
                  className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm font-mono transition-all duration-200 placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group/btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Сохранить реквизиты
          </button>
        </form>
      </main>
    </AccountLayout>
  );
}
