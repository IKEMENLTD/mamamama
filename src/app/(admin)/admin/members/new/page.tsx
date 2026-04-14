"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  Mail,
  Copy,
  AlertCircle,
} from "lucide-react";

const planOptions = [
  { value: "mama-kai", label: "あんしんパスママ会部", price: "¥980/月", description: "ママ会イベントに参加し放題", color: "#F9A8D4" },
  { value: "exercise", label: "あんしんパス運動部", price: "¥2,480/月", description: "運動系レッスンに参加し放題", color: "#86EFAC" },
  { value: "learning", label: "あんしんパス学び部", price: "¥2,480/月", description: "学び系レッスンに参加し放題", color: "#93C5FD" },
  { value: "premium", label: "あんしんパスプレミアム部", price: "¥3,980/月", description: "全イベント参加し放題", color: "#FDE68A" },
];

type Step = "input" | "confirm" | "complete";

export default function NewMemberPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    plan: "mama-kai",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.displayName.trim()) {
      setError("表示名を入力してください");
      return;
    }

    if (!formData.email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("有効なメールアドレスを入力してください");
      return;
    }

    setStep("confirm");
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    // ダミーのパスワード生成（後でバックエンドと連携）
    const password = Math.random().toString(36).slice(-10) + "A1!";

    // ダミーの登録処理
    setTimeout(() => {
      setGeneratedPassword(password);
      setIsLoading(false);
      setStep("complete");
    }, 1500);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPlan = planOptions.find((p) => p.value === formData.plan);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            会員を登録
          </h1>
          <p className="text-text-secondary">
            新しい会員を手動で登録します
          </p>
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="flex items-center justify-center gap-2">
        {["入力", "確認", "完了"].map((label, index) => {
          const stepIndex = ["input", "confirm", "complete"].indexOf(step);
          const isActive = index <= stepIndex;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-brand text-white"
                    : "bg-muted text-text-light"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm ${
                  isActive ? "text-text-primary" : "text-text-light"
                }`}
              >
                {label}
              </span>
              {index < 2 && (
                <div
                  className={`h-0.5 w-8 ${
                    index < stepIndex ? "bg-brand" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 入力ステップ */}
      {step === "input" && (
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">会員情報を入力</CardTitle>
            <CardDescription>
              登録する会員の情報を入力してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInputSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayName">表示名</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  placeholder="例：田中 さくら"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="例：mama@example.com"
                  className="rounded-xl"
                />
                <p className="text-xs text-text-light">
                  ログインIDとして使用されます
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>プランを選択</Label>
                <div className="grid gap-3">
                  {planOptions.map((plan) => (
                    <label
                      key={plan.value}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors ${
                        formData.plan === plan.value
                          ? "border-brand bg-brand/5"
                          : "border-border hover:border-brand/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan.value}
                        checked={formData.plan === plan.value}
                        onChange={(e) =>
                          setFormData({ ...formData, plan: e.target.value })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          formData.plan === plan.value
                            ? "border-brand"
                            : "border-text-light"
                        }`}
                      >
                        {formData.plan === plan.value && (
                          <div className="h-2.5 w-2.5 rounded-full bg-brand" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-text-primary">
                            {plan.label}
                          </p>
                          <p className="font-medium text-brand">{plan.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-text-secondary">
                          {plan.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  asChild
                >
                  <Link href="/admin/members">キャンセル</Link>
                </Button>
                <Button type="submit" className="flex-1 rounded-xl">
                  確認画面へ
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* 確認ステップ */}
      {step === "confirm" && (
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">入力内容を確認</CardTitle>
            <CardDescription>
              以下の内容で会員を登録します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-cream p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">表示名</span>
                  <span className="font-medium">{formData.displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">メールアドレス</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-text-secondary">プラン</span>
                  <span className="font-medium">{selectedPlan?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">月額</span>
                  <span className="font-medium text-brand">
                    {selectedPlan?.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-info/30 bg-info/10 p-4">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-info" />
                <div className="text-sm">
                  <p className="font-medium text-text-primary">
                    登録後、会員にメールが送信されます
                  </p>
                  <p className="mt-1 text-text-secondary">
                    ログイン情報（メールアドレスと自動生成されたパスワード）が記載されたメールが送信されます。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => setStep("input")}
              >
                戻る
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登録中...
                  </>
                ) : (
                  "登録する"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 完了ステップ */}
      {step === "complete" && (
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="mt-4 font-heading text-xl font-bold text-text-primary">
                会員を登録しました
              </h2>
              <p className="mt-2 text-text-secondary">
                ログイン情報がメールで送信されました
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-cream p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-text-secondary">表示名</p>
                  <p className="font-medium">{formData.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">
                    メールアドレス（ログインID）
                  </p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-text-secondary">
                    自動生成されたパスワード
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="flex-1 rounded bg-white px-3 py-2 font-mono text-sm">
                      {generatedPassword}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                      onClick={handleCopyPassword}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-text-light">
                    ※ 初回ログイン時にパスワードの変更が求められます
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" asChild>
                <Link href="/admin/members">会員一覧へ</Link>
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={() => {
                  setStep("input");
                  setFormData({ displayName: "", email: "", plan: "mama-kai" });
                  setGeneratedPassword("");
                }}
              >
                続けて登録
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
