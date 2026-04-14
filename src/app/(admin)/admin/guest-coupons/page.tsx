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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Ticket,
  Copy,
} from "lucide-react";

// ダミーデータ
const guestCoupons = [
  {
    id: "1",
    code: "WELCOME500",
    title: "初回500円引き",
    discountType: "AMOUNT" as const,
    discountValue: 500,
    expiresAt: "2026/12/31",
    usageLimit: 100,
    usageCount: 12,
    isActive: true,
  },
  {
    id: "2",
    code: "MAMA20",
    title: "ママ友紹介20%OFF",
    discountType: "RATE" as const,
    discountValue: 20,
    expiresAt: "2026/12/31",
    usageLimit: 50,
    usageCount: 3,
    isActive: true,
  },
  {
    id: "3",
    code: "SPRING2026",
    title: "春キャンペーン",
    discountType: "AMOUNT" as const,
    discountValue: 1000,
    expiresAt: "2026/04/30",
    usageLimit: 30,
    usageCount: 30,
    isActive: false,
  },
];

type DiscountType = "AMOUNT" | "RATE";

function getDiscountLabel(type: DiscountType, value: number) {
  return type === "AMOUNT" ? `¥${value.toLocaleString()} OFF` : `${value}% OFF`;
}

function getStatusBadge(coupon: (typeof guestCoupons)[number]) {
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { name: "上限到達", color: "bg-orange-100 text-orange-700" };
  }
  if (coupon.isActive) {
    return { name: "有効", color: "bg-success/10 text-success" };
  }
  return { name: "無効", color: "bg-muted text-muted-foreground" };
}

export default function GuestCouponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    title: "",
    discountType: "AMOUNT" as DiscountType,
    discountValue: "",
    expiresAt: "",
    usageLimit: "",
    isActive: true,
  });

  const filteredCoupons = guestCoupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            ゲストクーポン管理
          </h1>
          <p className="mt-1 text-text-secondary">
            ゲスト予約時に使用する割引コードの管理
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              クーポンを作成
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>ゲストクーポンを作成</DialogTitle>
              <DialogDescription>
                SNSやチラシで配布する割引コードを作成します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="couponCode">割引コード *</Label>
                <Input
                  id="couponCode"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="例：WELCOME500（半角英数字・大文字推奨）"
                  className="rounded-xl font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="couponTitle">管理名 *</Label>
                <Input
                  id="couponTitle"
                  value={newCoupon.title}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, title: e.target.value })
                  }
                  placeholder="例：初回500円引き"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>割引タイプ *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="discountType"
                      checked={newCoupon.discountType === "AMOUNT"}
                      onChange={() =>
                        setNewCoupon({ ...newCoupon, discountType: "AMOUNT" })
                      }
                      className="accent-brand"
                    />
                    <span className="text-sm">固定金額</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="discountType"
                      checked={newCoupon.discountType === "RATE"}
                      onChange={() =>
                        setNewCoupon({ ...newCoupon, discountType: "RATE" })
                      }
                      className="accent-brand"
                    />
                    <span className="text-sm">割引率</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  {newCoupon.discountType === "AMOUNT"
                    ? "割引額（円）"
                    : "割引率（%）"}{" "}
                  *
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={newCoupon.discountValue}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      discountValue: e.target.value,
                    })
                  }
                  placeholder={
                    newCoupon.discountType === "AMOUNT"
                      ? "例：500"
                      : "例：20"
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiresAt">有効期限 *</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usageLimit">利用上限回数</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={newCoupon.usageLimit}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, usageLimit: e.target.value })
                  }
                  placeholder="空欄で無制限"
                  className="rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="isActive">有効にする</Label>
                <button
                  id="isActive"
                  type="button"
                  role="switch"
                  aria-checked={newCoupon.isActive}
                  onClick={() =>
                    setNewCoupon({
                      ...newCoupon,
                      isActive: !newCoupon.isActive,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    newCoupon.isActive ? "bg-brand" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      newCoupon.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setIsDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button className="flex-1 rounded-xl">作成する</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 検索 */}
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="relative flex max-w-md items-center">
            <Search className="absolute left-3 h-4 w-4 text-text-light pointer-events-none" />
            <Input
              placeholder="コードまたは管理名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* クーポン一覧 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">コード</TableHead>
                <TableHead>管理名</TableHead>
                <TableHead>割引内容</TableHead>
                <TableHead>有効期限</TableHead>
                <TableHead>利用状況</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => {
                const status = getStatusBadge(coupon);
                const usagePercent = coupon.usageLimit
                  ? Math.min(
                      (coupon.usageCount / coupon.usageLimit) * 100,
                      100
                    )
                  : 0;

                return (
                  <TableRow key={coupon.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-1 font-mono text-sm font-medium text-text-primary">
                          {coupon.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleCopyCode(coupon.id, coupon.code)
                          }
                        >
                          <Copy className="h-3.5 w-3.5 text-text-light" />
                          <span className="sr-only">コピー</span>
                        </Button>
                        {copiedId === coupon.id && (
                          <span className="text-xs text-success">
                            コピー済
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-text-primary font-medium">
                      {coupon.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getDiscountLabel(
                          coupon.discountType,
                          coupon.discountValue
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      {coupon.expiresAt}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="text-sm text-text-secondary">
                          {coupon.usageCount}/{coupon.usageLimit}回
                        </span>
                        <div className="h-1.5 w-20 rounded-full bg-muted">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              usagePercent >= 100
                                ? "bg-orange-500"
                                : usagePercent >= 70
                                  ? "bg-warning"
                                  : "bg-brand"
                            }`}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={status.color}>
                        {status.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除する
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredCoupons.length === 0 && (
            <div className="py-12 text-center">
              <Ticket className="mx-auto h-12 w-12 text-text-light" />
              <p className="mt-2 text-text-secondary">
                クーポンが見つかりませんでした
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
