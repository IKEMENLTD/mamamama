"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react";

type Step = "email" | "sent";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;

    if (!emailValue) {
      setError("メールアドレスを入力してください");
      setIsLoading(false);
      return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setError("有効なメールアドレスを入力してください");
      setIsLoading(false);
      return;
    }

    setEmail(emailValue);

    // ダミーの送信処理（後でバックエンドと連携）
    setTimeout(() => {
      setStep("sent");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-cream to-white">
      {/* ヘッダー */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo-vertical.png"
              alt="mamamama"
              width={160}
              height={190}
              className="h-24 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-lg">
          {step === "email" ? (
            <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="font-heading text-2xl">
                  パスワードをリセット
                </CardTitle>
                <CardDescription>
                  登録したメールアドレスを入力してください。
                  <br />
                  パスワード再設定用のリンクをお送りします。
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

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      "リセットリンクを送信"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-text-secondary hover:text-brand"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    ログインに戻る
                  </Link>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="font-heading text-2xl">
                  メールを送信しました
                </CardTitle>
                <CardDescription>
                  <span className="font-medium text-text-primary">{email}</span>
                  <br />
                  宛にパスワード再設定用のリンクを送信しました。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-cream p-4 text-sm text-text-secondary">
                  <p className="mb-2 font-medium text-text-primary">
                    メールが届かない場合
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>迷惑メールフォルダをご確認ください</li>
                    <li>入力したメールアドレスが正しいかご確認ください</li>
                    <li>数分待ってから再度お試しください</li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    setStep("email");
                    setEmail("");
                  }}
                >
                  別のメールアドレスで試す
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-text-secondary hover:text-brand"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    ログインに戻る
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </main>

      {/* フッター */}
      <footer className="py-6 text-center text-sm text-text-light">
        <p>&copy; {new Date().getFullYear()} mamamama. All rights reserved.</p>
      </footer>
    </div>
  );
}
