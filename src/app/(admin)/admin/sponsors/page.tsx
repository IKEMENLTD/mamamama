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
  Building2,
  ExternalLink,
  Mail,
  Phone,
  ImagePlus,
} from "lucide-react";

// ダミーデータ
const sponsors = [
  {
    id: "1",
    name: "ベビーランド渋谷店",
    category: "ベビー用品",
    contactPerson: "田中 花子",
    email: "tanaka@babyland.co.jp",
    phone: "03-1234-5678",
    website: "https://babyland.co.jp",
    logoUrl: null,
    activeCoupons: 2,
    status: "active" as const,
    createdAt: "2026/01/01",
  },
  {
    id: "2",
    name: "ママカフェ代官山",
    category: "飲食",
    contactPerson: "鈴木 美咲",
    email: "suzuki@mamacafe.jp",
    phone: "03-2345-6789",
    website: "https://mamacafe.jp",
    logoUrl: null,
    activeCoupons: 1,
    status: "active" as const,
    createdAt: "2026/01/10",
  },
  {
    id: "3",
    name: "スマイルフォトスタジオ",
    category: "写真",
    contactPerson: "佐藤 健太",
    email: "sato@smilephoto.co.jp",
    phone: "03-3456-7890",
    website: "https://smilephoto.co.jp",
    logoUrl: null,
    activeCoupons: 1,
    status: "active" as const,
    createdAt: "2026/01/20",
  },
  {
    id: "4",
    name: "ベビーケア株式会社",
    category: "メーカー",
    contactPerson: "山田 太郎",
    email: "yamada@babycare.co.jp",
    phone: "03-4567-8901",
    website: "https://babycare.co.jp",
    logoUrl: null,
    activeCoupons: 0,
    status: "inactive" as const,
    createdAt: "2026/01/05",
  },
];

const statusLabels = {
  active: { name: "有効", color: "bg-success/10 text-success" },
  inactive: { name: "無効", color: "bg-muted text-muted-foreground" },
};

const categoryColors: Record<string, string> = {
  "ベビー用品": "bg-pink-100 text-pink-700",
  "飲食": "bg-orange-100 text-orange-700",
  "写真": "bg-purple-100 text-purple-700",
  "メーカー": "bg-blue-100 text-blue-700",
};

export default function SponsorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    category: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
  });

  const filteredSponsors = sponsors.filter(
    (sponsor) =>
      sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            協賛企業管理
          </h1>
          <p className="mt-1 text-text-secondary">
            協賛企業の登録・管理ができます
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              協賛企業を追加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>協賛企業を追加</DialogTitle>
              <DialogDescription>
                新しい協賛企業の情報を入力してください
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="sponsorName">企業名 *</Label>
                <Input
                  id="sponsorName"
                  value={newSponsor.name}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, name: e.target.value })
                  }
                  placeholder="例：ベビーランド渋谷店"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ *</Label>
                <Input
                  id="category"
                  value={newSponsor.category}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, category: e.target.value })
                  }
                  placeholder="例：ベビー用品、飲食、写真"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>企業ロゴ</Label>
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 hover:border-brand/50">
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-8 w-8 text-text-light" />
                    <p className="mt-1 text-xs text-text-secondary">
                      ロゴをアップロード
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">担当者名</Label>
                  <Input
                    id="contactPerson"
                    value={newSponsor.contactPerson}
                    onChange={(e) =>
                      setNewSponsor({
                        ...newSponsor,
                        contactPerson: e.target.value,
                      })
                    }
                    placeholder="例：田中 花子"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newSponsor.phone}
                    onChange={(e) =>
                      setNewSponsor({ ...newSponsor, phone: e.target.value })
                    }
                    placeholder="例：03-1234-5678"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSponsor.email}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, email: e.target.value })
                  }
                  placeholder="例：contact@company.co.jp"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">ウェブサイト</Label>
                <Input
                  id="website"
                  type="url"
                  value={newSponsor.website}
                  onChange={(e) =>
                    setNewSponsor({ ...newSponsor, website: e.target.value })
                  }
                  placeholder="例：https://company.co.jp"
                  className="rounded-xl"
                />
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
              placeholder="企業名またはカテゴリで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 協賛企業一覧 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">企業情報</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>連絡先</TableHead>
                <TableHead>クーポン数</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                        <Building2 className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {sponsor.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          担当: {sponsor.contactPerson}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        categoryColors[sponsor.category] ||
                        "bg-gray-100 text-gray-700"
                      }
                    >
                      {sponsor.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">
                          {sponsor.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-text-secondary">
                        <Phone className="h-3 w-3" />
                        <span>{sponsor.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="text-lg font-semibold text-text-primary">
                        {sponsor.activeCoupons}
                      </span>
                      <span className="text-sm text-text-secondary"> 件</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusLabels[sponsor.status].color}
                    >
                      {statusLabels[sponsor.status].name}
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
                        {sponsor.website && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            ウェブサイトを開く
                          </DropdownMenuItem>
                        )}
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
              ))}
            </TableBody>
          </Table>

          {filteredSponsors.length === 0 && (
            <div className="py-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-text-light" />
              <p className="mt-2 text-text-secondary">
                協賛企業が見つかりませんでした
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
