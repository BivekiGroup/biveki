"use client";

import { useState, useRef } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react";
import { User, Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { useToast } from "./ToastProvider";

const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatarUrl: String!) {
    updateAvatar(avatarUrl: $avatarUrl)
  }
`;

interface AvatarUploadProps {
  currentAvatar?: string | null;
  userName: string;
  onSuccess?: () => void;
}

export default function AvatarUpload({ currentAvatar, userName, onSuccess }: AvatarUploadProps) {
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      showToast("Пожалуйста, выберите изображение", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Файл слишком большой (макс 5MB)", "error");
      return;
    }

    setUploading(true);

    try {
      // Upload to /api/upload-avatar
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Ошибка загрузки");
      }

      const data = await res.json();
      const url = data.url;

      // Update avatar in GraphQL
      await updateAvatar({ variables: { avatarUrl: url } });

      setPreview(url);
      showToast("Аватар успешно обновлён");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(err.message || "Ошибка загрузки", "error");
    } finally {
      setUploading(false);
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative group">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleClick}
        disabled={uploading}
        className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white/20 backdrop-blur-sm ring-4 ring-white/30 shadow-2xl transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {preview ? (
          <img src={preview} alt={userName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 text-2xl font-bold text-white">
            {initials}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          ) : (
            <Upload className="h-8 w-8 text-white" />
          )}
        </div>
      </button>

      {/* Success badge */}
      {preview && !uploading && (
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 ring-4 ring-white/30 shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}
