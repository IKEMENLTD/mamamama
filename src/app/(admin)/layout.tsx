"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  Video,
  Gift,
  Ticket,
  Building2,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    label: "ダッシュボード",
  },
  {
    href: "/admin/members",
    icon: Users,
    label: "会員管理",
  },
  {
    href: "/admin/plans",
    icon: CreditCard,
    label: "プラン管理",
  },
  {
    href: "/admin/events",
    icon: Calendar,
    label: "イベント管理",
  },
  {
    href: "/admin/videos",
    icon: Video,
    label: "動画管理",
  },
  {
    href: "/admin/coupons",
    icon: Gift,
    label: "クーポン管理",
  },
  {
    href: "/admin/guest-coupons",
    icon: Ticket,
    label: "ゲストクーポン",
  },
  {
    href: "/admin/sponsors",
    icon: Building2,
    label: "協賛企業管理",
  },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      {/* ロゴ */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/admin" className="flex items-center">
          <Image
            src="/images/logo-horizontal.png"
            alt="mamamama"
            width={120}
            height={36}
            className="h-7 w-auto"
          />
        </Link>
        <span className="ml-2 rounded bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
          管理
        </span>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-text-secondary hover:bg-cream hover:text-text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* フッター */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-cream hover:text-text-primary"
        >
          <ExternalLink className="h-5 w-5" />
          サイトを見る
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-text-secondary hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          ログアウト
        </Button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* デスクトップサイドバー */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* モバイルサイドバー */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">管理メニュー</SheetTitle>
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col">
        {/* モバイルヘッダー */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-4 lg:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニュー</span>
              </Button>
            </SheetTrigger>
          </Sheet>
          <Link href="/admin" className="flex items-center">
            <Image
              src="/images/logo-horizontal.png"
              alt="mamamama"
              width={120}
              height={36}
              className="h-7 w-auto"
            />
          </Link>
          <span className="rounded bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
            管理
          </span>
        </header>

        {/* ページコンテンツ */}
        <main className="flex-1 bg-beige p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
