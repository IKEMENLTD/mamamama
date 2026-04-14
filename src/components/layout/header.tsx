"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const publicNavItems = [
  { href: "/", label: "ホーム" },
  { href: "/events", label: "イベント" },
  { href: "/sponsors", label: "協賛企業" },
];

const memberNavItems = [
  { href: "/events", label: "イベント" },
  { href: "/videos", label: "動画" },
  { href: "/coupons", label: "クーポン" },
  { href: "/mypage", label: "マイページ" },
];

export function Header({ isLoggedIn = false, userName = "" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const isAuthenticated = isLoggedIn || !!session?.user;
  const name = userName || session?.user?.name || "";
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const navItems = isAuthenticated
    ? [
        ...publicNavItems.slice(0, 1),
        ...memberNavItems,
        publicNavItems[1],
        ...(isAdmin ? [{ href: "/admin", label: "管理画面" }] : []),
      ]
    : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-2xl font-bold text-brand">
            mamamama
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* デスクトップ右側 */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 border-2 border-brand/30">
                    <AvatarFallback className="bg-brand/10 text-brand">
                      {name.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {isAdmin ? "管理者" : "会員"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      管理画面
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/mypage" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    マイページ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    プロフィール編集
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-xl">
              <Link href="/login">ログイン</Link>
            </Button>
          )}
        </div>

        {/* モバイルメニュー */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetTitle className="sr-only">メニュー</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              {isAuthenticated && (
                <div className="flex items-center gap-3 rounded-xl bg-cream p-4">
                  <Avatar className="h-12 w-12 border-2 border-brand/30">
                    <AvatarFallback className="bg-brand/10 text-brand">
                      {name.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">
                      {isAdmin ? "管理者" : "会員"}
                    </p>
                  </div>
                </div>
              )}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-cream hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t pt-4">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl text-destructive"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    ログアウト
                  </Button>
                ) : (
                  <Button asChild className="w-full rounded-xl">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      ログイン
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
