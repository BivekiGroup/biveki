import Image from "next/image";

export default function BrandMark({ size = 32, padded = false }: { size?: number; padded?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Biveki"
        fill
        sizes={`${size}px`}
        className="object-contain"
        unoptimized
        priority
        style={padded ? { inset: 2 } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-10" />
    </div>
  );
}

