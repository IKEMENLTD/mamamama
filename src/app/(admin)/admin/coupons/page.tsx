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
  Gift,
  Calendar,
  ImagePlus,
} from "lucide-react";

// ダミーデータ
const coupons = [
  {
    id: "1",
    title: "ベビー用品10%OFF",
    description: "協賛店舗「ベビーランド」にてベビー用品が10%OFF。レジにて画面を提示してください。",
    sponsor: "ベビーランド渋谷店",
    imageUrl: null,
    allowedPlans: ["exercise", "learning", "premium"],
    expiresAt: "2026/03/31",
    status: "active" as const,
    createdAt: "2026/01/01",
  },
  {
    id: "2",
    title: "カフェドリンク1杯無料",
    description: "協賛カフェ「ママカフェ」にてドリンク1杯無料。お子様連れの方限定。",
    sponsor: "ママカフェ代官山",
    imageUrl: null,
    allowedPlans: ["mama-kai", "exercise", "learning", "premium"],
    expiresAt: "2026/04/30",
    status: "active" as const,
    createdAt: "2026/01/15",
  },
  {
    id: "3",
    title: "写真館撮影料50%OFF",
    description: "お子様の記念撮影が半額に！予約時にmamamama会員とお伝えください。",
    sponsor: "スマイルフォトスタジオ",
    imageUrl: null,
    allowedPlans: ["premium"],
    expiresAt: "2026/06/30",
    status: "active" as const,
    createdAt: "2026/02/01",
  },
  {
    id: "4",
    title: "おむつサンプルプレゼント",
    description: "新商品のおむつサンプルをプレゼント。数量限定。",
    sponsor: "ベビーケア株式会社",
    imageUrl: null,
    allowedPlans: ["mama-kai", "exercise", "learning", "premium"],
    expiresAt: "2026/02/28",
    status: "expired" as const,
    createdAt: "2026/01/10",
  },
];

const statusLabels = {
  active: { name: "有効", color: "bg-success/10 text-success" },
  expired: { name: "期限切れ", color: "bg-destructive/10 text-destructive" },
  draft: { name: "下書き", color: "bg-muted text-muted-foreground" },
};

const planLabels: Record<string, string> = {
  "mama-kai": "ママ会部",
  exercise: "運動部",
  learning: "学び部",
  premium: "プレミアム部",
};

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    title: "",
    description: "",
    sponsor: "",
    expiresAt: "",
    allowedPlans: ["mama-kai", "exercise", "learning", "premium"],
  });

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.sponsor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlanToggle = (plan: string) => {
    setNewCoupon((prev) => ({
      ...prev,
      allowedPlans: prev.allowedPlans.includes(plan)
        ? prev.allowedPlans.filter((p) => p !== plan)
        : [...prev.allowedPlans, plan],
    }));
  };

  const getDaysUntilExpiry = (expiresAt: string) => {
    const expiry = new Date(expiresAt.replace(/\//g, "-"));
    const today = new Date();
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            会員クーポン管理
          </h1>
          <p className="mt-1 text-text-secondary">
            あんしんパス会員向けの特典クーポンを管理します
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              クーポンを追加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>クーポンを追加</DialogTitle>
              <DialogDescription>
                協賛企業からの特典クーポンを追加します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="couponTitle">クーポン名 *</Label>
                <Input
                  id="couponTitle"
                  value={newCoupon.title}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, title: e.target.value })
                  }
                  placeholder="例：ベビー用品10%OFF"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsor">協賛企業名 *</Label>
                <Input
                  id="sponsor"
                  value={newCoupon.sponsor}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, sponsor: e.target.value })
                  }
                  placeholder="例：ベビーランド渋谷店"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="couponDescription">利用条件・説明 *</Label>
                <textarea
                  id="couponDescription"
                  value={newCoupon.description}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, description: e.target.value })
                  }
                  placeholder="クーポンの利用方法、条件などを入力..."
                  className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>クーポン画像</Label>
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 hover:border-brand/50">
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-8 w-8 text-text-light" />
                    <p className="mt-1 text-xs text-text-secondary">
                      画像をアップロード
                    </p>
                  </div>
                </div>
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
                <Label>利用可能プラン</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(planLabels).map(([value, label]) => (
                    <Badge
                      key={value}
                      variant={
                        newCoupon.allowedPlans.includes(value)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${
                        newCoupon.allowedPlans.includes(value)
                          ? "bg-brand hover:bg-brand-dark"
                          : "hover:bg-brand/10"
                      }`}
                      onClick={() => handlePlanToggle(value)}
                    >
                      {label}
                    </Badge>
                  ))}
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

      {/* 検索 */}
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="relative flex max-w-md items-center">
            <Search className="absolute left-3 h-4 w-4 text-text-light pointer-events-none" />
            <Input
              placeholder="クーポン名または協賛企業で検索..."
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
                <TableHead className="pl-6">クーポン</TableHead>
                <TableHead>協賛企業</TableHead>
                <TableHead>対象プラン</TableHead>
                <TableHead>有効期限</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => {
                const daysLeft = getDaysUntilExpiry(coupon.expiresAt);
                return (
                  <TableRow key={coupon.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                          <Gift className="h-5 w-5 text-brand" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {coupon.title}
                          </p>
                          <p className="text-sm text-text-secondary line-clamp-1 max-w-xs">
                            {coupon.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      {coupon.sponsor}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {coupon.allowedPlans.map((plan) => (
                          <Badge
                            key={plan}
                            variant="outline"
                            className="text-xs"
                          >
                            {planLabels[plan]}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-text-light" />
                        <span className={daysLeft <= 7 && daysLeft > 0 ? "text-warning" : ""}>
                          {coupon.expiresAt}
                        </span>
                      </div>
                      {daysLeft > 0 && daysLeft <= 7 && (
                        <p className="text-xs text-warning">
                          あと{daysLeft}日
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusLabels[coupon.status].color}
                      >
                        {statusLabels[coupon.status].name}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
              <Gift className="mx-auto h-12 w-12 text-text-light" />
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
