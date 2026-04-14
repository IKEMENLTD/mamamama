import Link from "next/link";
import { Instagram } from "lucide-react";

const footerLinks = [
  { href: "/sponsors", label: "協賛企業" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/legal", label: "特定商取引法に基づく表記" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand/20 bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* ロゴ */}
          <div className="text-center md:text-left">
            <Link href="/" className="font-heading text-xl font-bold text-brand">
              mamamama
            </Link>
            <p className="mt-1 text-sm text-text-light">
              ママのままで わたしのままで
            </p>
          </div>

          {/* リンク */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* SNS */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/mamamama.circle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline">@mamamama.circle</span>
            </a>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 border-t border-brand/10 pt-6 text-center">
          <p className="text-xs text-text-light">
            &copy; {new Date().getFullYear()} mamamama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
