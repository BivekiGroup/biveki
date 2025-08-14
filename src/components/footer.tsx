import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-blue-800/50 py-8 text-center text-sm text-blue-200">
      <p>
        © {new Date().getFullYear()} Biveki. Built with love and lots of blue.
      </p>
      <p className="mt-2">
        <Link href="mailto:hello@biveki.com" className="underline hover:text-white">
          hello@biveki.com
        </Link>
      </p>
    </footer>
  );
}
