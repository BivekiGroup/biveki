"use client";

import { useState, useEffect } from "react";
import { Landmark, Loader2, CheckCircle2 } from "lucide-react";

interface BankData {
  value: string;
  data: {
    bic: string;
    swift: string | null;
    inn: string;
    kpp: string;
    correspondent_account: string;
    name: {
      payment: string;
    };
    payment_city: string;
  };
}

interface BikInputProps {
  value: string;
  onChange: (value: string) => void;
  onBankFound?: (bankName: string) => void;
}

export default function BikInput({ value, onChange, onBankFound }: BikInputProps) {
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState<BankData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim().length === 9) {
        fetchBankData(value.trim());
      } else {
        setBankData(null);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  async function fetchBankData(bik: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/dadata/bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: bik }),
      });

      if (!res.ok) {
        throw new Error("Ошибка запроса");
      }

      const data = await res.json();

      if (data.suggestions && data.suggestions.length > 0) {
        const bank = data.suggestions[0];
        setBankData(bank);
        if (onBankFound) {
          onBankFound(bank.data.name.payment);
        }
      } else {
        setBankData(null);
        setError("Банк не найден");
      }
    } catch (err) {
      setError("Ошибка загрузки данных банка");
      setBankData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          placeholder="044525225"
          maxLength={9}
          pattern="\d{9}"
          required
          className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 pr-10 text-sm font-mono transition-all duration-200 placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          </div>
        )}
        {bankData && !loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
        )}
      </div>

      {bankData && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-3 dark:bg-emerald-500/10">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <Landmark className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                {bankData.data.name.payment}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 space-y-0.5">
                <div>БИК: {bankData.data.bic}</div>
                {bankData.data.correspondent_account && (
                  <div>К/С: {bankData.data.correspondent_account}</div>
                )}
                {bankData.data.payment_city && (
                  <div>Город: {bankData.data.payment_city}</div>
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
