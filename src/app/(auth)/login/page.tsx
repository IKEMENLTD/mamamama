"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // ダミーのログイン処理（後でバックエンドと連携）
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 簡易的なバリデーション
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      setIsLoading(false);
      return;
    }

    // ダミー認証（開発用）
    setTimeout(() => {
      // 成功時はマイページへリダイレクト
      router.push("/mypage");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-cream to-white">
      {/* ヘッダー */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="font-heading text-2xl font-bold text-brand">
            mamamama
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-heading text-2xl">ログイン</CardTitle>
            <CardDescription>
              メールアドレスとパスワードを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mama@example.com"
                  autoComplete="email"
                  className="rounded-xl"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="rounded-xl pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="/reset-password"
                  className="text-sm text-brand hover:underline"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ログイン中...
                  </>
                ) : (
                  "ログイン"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              <p>
                会員登録をご希望の方は
                <a
                  href="https://instagram.com/mamamama.circle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Instagram
                </a>
                からお問い合わせください
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* フッター */}
      <footer className="py-6 text-center text-sm text-text-light">
        <p>&copy; {new Date().getFullYear()} mamamama. All rights reserved.</p>
      </footer>
    </div>
  );
}
