"use client";

import { useState, useEffect } from "react";
import { Building2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface PartyData {
  value: string;
  data: {
    inn: string;
    kpp: string | null;
    ogrn: string;
    type: "LEGAL" | "INDIVIDUAL";
    name: {
      full_with_opf: string;
      short_with_opf: string;
    };
    address: {
      value: string;
      unrestricted_value: string;
      data: {
        source: string;
      };
    };
    management: {
      name: string;
      post: string;
    } | null;
    state: {
      status: "ACTIVE" | "LIQUIDATING" | "LIQUIDATED" | "BANKRUPT" | "REORGANIZING";
      registration_date: number;
      liquidation_date: number | null;
    };
  };
}

interface InnInputProps {
  value: string;
  onChange: (value: string) => void;
  onPartyFound?: (data: {
    companyName: string;
    legalAddress: string;
    kpp?: string;
  }) => void;
}

export default function InnInput({ value, onChange, onPartyFound }: InnInputProps) {
  const [loading, setLoading] = useState(false);
  const [partyData, setPartyData] = useState<PartyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // ИНН: 10 цифр для юрлиц, 12 для ИП
      if (value.trim().length === 10 || value.trim().length === 12) {
        fetchPartyData(value.trim());
      } else {
        setPartyData(null);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  async function fetchPartyData(inn: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/dadata/party", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inn }),
      });

      if (!res.ok) {
        throw new Error("Ошибка запроса");
      }

      const data = await res.json();

      if (data.suggestions && data.suggestions.length > 0) {
        const party = data.suggestions[0];
        setPartyData(party);

        // Передаем данные наверх для автозаполнения
        if (onPartyFound) {
          onPartyFound({
            companyName: party.data.name.short_with_opf || party.data.name.full_with_opf,
            legalAddress: party.data.address.data.source || party.data.address.value,
            kpp: party.data.kpp || undefined,
          });
        }

        // Проверяем статус
        if (party.data.state.status !== "ACTIVE") {
          setError(getStatusText(party.data.state.status));
        }
      } else {
        setPartyData(null);
        setError("Организация не найдена");
      }
    } catch (err) {
      setError("Ошибка загрузки данных организации");
      setPartyData(null);
    } finally {
      setLoading(false);
    }
  }

  function getStatusText(status: string): string {
    const statuses: Record<string, string> = {
      ACTIVE: "Действующая",
      LIQUIDATING: "Ликвидируется",
      LIQUIDATED: "Ликвидирована",
      BANKRUPT: "Банкротство",
      REORGANIZING: "В процессе реорганизации",
    };
    return statuses[status] || status;
  }

  function formatDate(timestamp: number | null): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("ru-RU");
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          placeholder="7707083893 (10 или 12 цифр)"
          maxLength={12}
          pattern="\d{10}|\d{12}"
          required
          className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 pr-10 text-sm font-mono transition-all duration-200 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          </div>
        )}
        {partyData && !loading && partyData.data.state.status === "ACTIVE" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
        )}
        {partyData && !loading && partyData.data.state.status !== "ACTIVE" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
        )}
      </div>

      {partyData && (
        <div
          className={`rounded-xl border p-3 ${
            partyData.data.state.status === "ACTIVE"
              ? "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/10"
              : "border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/10"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                partyData.data.state.status === "ACTIVE"
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                  : "bg-gradient-to-br from-amber-500 to-orange-600"
              } text-white`}
            >
              <Building2 className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`text-sm font-semibold ${
                  partyData.data.state.status === "ACTIVE"
                    ? "text-emerald-900 dark:text-emerald-100"
                    : "text-amber-900 dark:text-amber-100"
                }`}
              >
                {partyData.data.name.short_with_opf || partyData.data.name.full_with_opf}
              </div>
              <div
                className={`text-xs mt-1 space-y-0.5 ${
                  partyData.data.state.status === "ACTIVE"
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-amber-700 dark:text-amber-300"
                }`}
              >
                <div>ИНН: {partyData.data.inn}</div>
                {partyData.data.kpp && <div>КПП: {partyData.data.kpp}</div>}
                <div>ОГРН: {partyData.data.ogrn}</div>
                {partyData.data.type === "LEGAL" ? (
                  <div>Тип: Юридическое лицо</div>
                ) : (
                  <div>Тип: Индивидуальный предприниматель</div>
                )}
                <div>Статус: {getStatusText(partyData.data.state.status)}</div>
                {partyData.data.state.registration_date && (
                  <div>Дата регистрации: {formatDate(partyData.data.state.registration_date)}</div>
                )}
                {partyData.data.management && (
                  <div className="mt-1 pt-1 border-t border-current/20">
                    <div>Руководитель: {partyData.data.management.name}</div>
                    {partyData.data.management.post && (
                      <div>Должность: {partyData.data.management.post}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-50/50 p-3 dark:bg-amber-500/10">
          <p className="text-xs text-amber-700 dark:text-amber-300">{error}</p>
        </div>
      )}
    </div>
  );
}
