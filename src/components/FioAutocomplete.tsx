"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { User, Loader2 } from "lucide-react";

interface FioSuggestion {
  value: string;
  data: {
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: "MALE" | "FEMALE" | "UNKNOWN";
  };
}

interface FioAutocompleteProps {
  onSelect: (surname: string, name: string, patronymic: string) => void;
  initialValue?: string;
}

export default function FioAutocomplete({ onSelect, initialValue = "" }: FioAutocompleteProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<FioSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideWrapper = wrapperRef.current?.contains(target);
      const isInsideDropdown = dropdownRef.current?.contains(target);

      if (!isInsideWrapper && !isInsideDropdown) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function updatePosition() {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }

    if (showSuggestions) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [showSuggestions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchSuggestions(query.trim());
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  async function fetchSuggestions(q: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/dadata/fio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("DaData fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(suggestion: FioSuggestion) {
    setQuery(suggestion.value);
    setShowSuggestions(false);
    setSuggestions([]);
    onSelect(
      suggestion.data.surname || "",
      suggestion.data.name || "",
      suggestion.data.patronymic || ""
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  const dropdown = showSuggestions && mounted && (
    <>
      {suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            zIndex: 9999,
          }}
          className="rounded-xl border border-neutral-900/10 bg-white shadow-xl dark:border-white/10 dark:bg-neutral-900"
        >
          <div className="max-h-60 overflow-y-auto p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelect(suggestion)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  index === selectedIndex
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{suggestion.value}</div>
                  {suggestion.data.gender !== "UNKNOWN" && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {suggestion.data.gender === "MALE" ? "Мужской" : "Женский"}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {query.trim().length >= 2 && suggestions.length === 0 && !loading && (
        <div
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            zIndex: 9999,
          }}
          className="rounded-xl border border-neutral-900/10 bg-white p-4 text-center text-sm text-neutral-500 shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-400"
        >
          Ничего не найдено
        </div>
      )}
    </>
  );

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Начните вводить ФИО"
          className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 pr-10 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          </div>
        )}
      </div>

      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}
