"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Ban,
  CreditCard,
} from "lucide-react";

// ダミーデータ（後でAPI連携に置き換え）
const plans = [
  {
    id: "1",
    name: "あんしんパスママ会部",
    slug: "mama-kai",
    price: 980,
    categories: ["MAMA_KAI"],
    color: "#F9A8D4",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "2",
    name: "あんしんパス運動部",
    slug: "exercise",
    price: 2480,
    categories: ["EXERCISE"],
    color: "#86EFAC",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "3",
    name: "あんしんパス学び部",
    slug: "learning",
    price: 2480,
    categories: ["LEARNING"],
    color: "#93C5FD",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "4",
    name: "あんしんパスプレミアム部",
    slug: "premium",
    price: 3980,
    categories: ["MAMA_KAI", "EXERCISE", "LEARNING"],
    color: "#FDE68A",
    isActive: true,
    sortOrder: 4,
  },
];

const categoryLabels: Record<string, { name: string; color: string }> = {
  MAMA_KAI: { name: "ママ会", color: "bg-pink-100 text-pink-700" },
  EXERCISE: { name: "運動", color: "bg-green-100 text-green-700" },
  LEARNING: { name: "学び", color: "bg-blue-100 text-blue-700" },
};

const statusLabels = {
  active: { name: "有効", color: "bg-success/10 text-success" },
  inactive: { name: "無効", color: "bg-muted text-muted-foreground" },
};

export default function PlansPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    slug: "",
    price: 0,
    categories: [] as string[],
    color: "#F9A8D4",
    sortOrder: 1,
  });

  const handleCategoryToggle = (category: string) => {
    setNewPlan((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            プラン管理
          </h1>
          <p className="mt-1 text-text-secondary">
            あんしんパスのプラン管理ができます
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              プランを追加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>プランを追加</DialogTitle>
              <DialogDescription>
                新しいプランの情報を入力してください
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="planName">プラン名 *</Label>
                <Input
                  id="planName"
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  placeholder="例：あんしんパスママ会部"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">スラッグ *</Label>
                <Input
                  id="slug"
                  value={newPlan.slug}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, slug: e.target.value })
                  }
                  placeholder="例：mama-kai"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">月額料金（円） *</Label>
                <Input
                  id="price"
                  type="number"
                  value={newPlan.price || ""}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="例：980"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>カテゴリ *</Label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={newPlan.categories.includes(key)}
                        onChange={() => handleCategoryToggle(key)}
                        className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                      />
                      <span className="text-sm text-text-primary">
                        {label.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="color">テーマカラー</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-8 w-8 shrink-0 rounded-lg border border-border"
                      style={{ backgroundColor: newPlan.color }}
                    />
                    <Input
                      id="color"
                      value={newPlan.color}
                      onChange={(e) =>
                        setNewPlan({ ...newPlan, color: e.target.value })
                      }
                      placeholder="#F9A8D4"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">表示順</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={newPlan.sortOrder}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        sortOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    placeholder="1"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button className="flex-1 rounded-xl">追加する</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* プラン一覧（カードグリッド） */}
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-none shadow-sm">
            <CardContent className="p-0">
              <div
                className="flex gap-4 rounded-xl p-5"
                style={{ borderLeft: `4px solid ${plan.color}` }}
              >
                <div className="flex-1 space-y-3">
                  {/* プラン名 + スラッグ */}
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-text-light">{plan.slug}</p>
                  </div>

                  {/* 月額料金 */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-text-primary">
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-text-secondary">/月</span>
                  </div>

                  {/* カテゴリバッジ */}
                  <div className="flex flex-wrap gap-1.5">
                    {plan.categories.map((cat) => (
                      <Badge
                        key={cat}
                        variant="secondary"
                        className={
                          categoryLabels[cat]?.color ||
                          "bg-gray-100 text-gray-700"
                        }
                      >
                        {categoryLabels[cat]?.name || cat}
                      </Badge>
                    ))}
                  </div>

                  {/* ステータス + 表示順 */}
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={
                        plan.isActive
                          ? statusLabels.active.color
                          : statusLabels.inactive.color
                      }
                    >
                      {plan.isActive
                        ? statusLabels.active.name
                        : statusLabels.inactive.name}
                    </Badge>
                    <span className="text-xs text-text-light">
                      表示順: {plan.sortOrder}
                    </span>
                  </div>
                </div>

                {/* アクションメニュー */}
                <div className="shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        編集する
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        無効にする
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* プランが0件の場合 */}
      {plans.length === 0 && (
        <Card className="border-none shadow-sm">
          <CardContent>
            <div className="py-12 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-text-light" />
              <p className="mt-2 text-text-secondary">
                プランが登録されていません
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
