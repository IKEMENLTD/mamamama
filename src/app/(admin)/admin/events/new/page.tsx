"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Loader2,
  Plus,
  X,
  ImagePlus,
} from "lucide-react";

const planOptions = [
  { value: "trial", label: "お試しプラン" },
  { value: "standard", label: "スタンダードプラン" },
  { value: "premium", label: "プレミアムプラン" },
];

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    priceMember: "",
    priceGuest: "",
    allowGuest: true,
    allowedPlans: ["trial", "standard", "premium"],
    cancelDeadlineHours: "24",
    status: "draft",
  });

  const handlePlanToggle = (plan: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedPlans: prev.allowedPlans.includes(plan)
        ? prev.allowedPlans.filter((p) => p !== plan)
        : [...prev.allowedPlans, plan],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // ダミーの保存処理
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/events");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            イベントを作成
          </h1>
          <p className="text-text-secondary">
            新しいイベントを作成します
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">イベント名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="例：ベビーヨガ体験会"
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="イベントの詳細を入力..."
                className="min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>カバー画像</Label>
              <div className="flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-brand/50 hover:bg-muted/50">
                <div className="text-center">
                  <ImagePlus className="mx-auto h-10 w-10 text-text-light" />
                  <p className="mt-2 text-sm text-text-secondary">
                    クリックして画像をアップロード
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 日時・場所 */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">日時・場所</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">開催日 *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">開始時間 *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">終了時間 *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">場所 *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="例：渋谷コミュニティセンター 3F会議室"
                className="rounded-xl"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity">定員 *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  placeholder="例：10"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancelDeadlineHours">
                  キャンセル期限（開始何時間前まで）
                </Label>
                <Input
                  id="cancelDeadlineHours"
                  type="number"
                  min="0"
                  value={formData.cancelDeadlineHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cancelDeadlineHours: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 料金・参加条件 */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">料金・参加条件</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priceMember">会員価格（円） *</Label>
                <Input
                  id="priceMember"
                  type="number"
                  min="0"
                  value={formData.priceMember}
                  onChange={(e) =>
                    setFormData({ ...formData, priceMember: e.target.value })
                  }
                  placeholder="例：500"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceGuest">非会員価格（円）</Label>
                <Input
                  id="priceGuest"
                  type="number"
                  min="0"
                  value={formData.priceGuest}
                  onChange={(e) =>
                    setFormData({ ...formData, priceGuest: e.target.value })
                  }
                  placeholder="例：1500"
                  className="rounded-xl"
                  disabled={!formData.allowGuest}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>参加可能プラン</Label>
              <div className="flex flex-wrap gap-2">
                {planOptions.map((plan) => (
                  <Badge
                    key={plan.value}
                    variant={
                      formData.allowedPlans.includes(plan.value)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer ${
                      formData.allowedPlans.includes(plan.value)
                        ? "bg-brand hover:bg-brand-dark"
                        : "hover:bg-brand/10"
                    }`}
                    onClick={() => handlePlanToggle(plan.value)}
                  >
                    {plan.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="allowGuest"
                checked={formData.allowGuest}
                onChange={(e) =>
                  setFormData({ ...formData, allowGuest: e.target.checked })
                }
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="allowGuest" className="cursor-pointer">
                非会員の参加を許可する
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* 公開設定 */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">公開設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="h-4 w-4"
                />
                <span>下書き</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="h-4 w-4"
                />
                <span>公開</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* アクション */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            asChild
          >
            <Link href="/admin/events">キャンセル</Link>
          </Button>
          <Button type="submit" className="flex-1 rounded-xl" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              "イベントを作成"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
