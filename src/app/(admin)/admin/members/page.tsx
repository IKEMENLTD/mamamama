"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
} from "lucide-react";

// ダミーデータ（後でバックエンドと連携）
const members = [
  {
    id: "1",
    displayName: "田中 さくら",
    email: "tanaka.sakura@example.com",
    plan: "standard" as const,
    status: "active" as const,
    monthlyUsed: 2,
    createdAt: "2025/12/01",
    photoUrl: null,
  },
  {
    id: "2",
    displayName: "鈴木 あおい",
    email: "suzuki.aoi@example.com",
    plan: "premium" as const,
    status: "active" as const,
    monthlyUsed: 5,
    createdAt: "2025/11/15",
    photoUrl: null,
  },
  {
    id: "3",
    displayName: "佐藤 ひなた",
    email: "sato.hinata@example.com",
    plan: "trial" as const,
    status: "active" as const,
    monthlyUsed: 1,
    createdAt: "2026/01/20",
    photoUrl: null,
  },
  {
    id: "4",
    displayName: "高橋 りん",
    email: "takahashi.rin@example.com",
    plan: "standard" as const,
    status: "suspended" as const,
    monthlyUsed: 0,
    createdAt: "2025/10/05",
    photoUrl: null,
  },
  {
    id: "5",
    displayName: "伊藤 みお",
    email: "ito.mio@example.com",
    plan: "premium" as const,
    status: "active" as const,
    monthlyUsed: 8,
    createdAt: "2025/09/01",
    photoUrl: null,
  },
];

const planLabels = {
  trial: { name: "お試し", color: "bg-text-light text-white" },
  standard: { name: "スタンダード", color: "bg-brand text-white" },
  premium: { name: "プレミアム", color: "bg-brand-dark text-white" },
};

const statusLabels = {
  active: { name: "有効", color: "bg-success/10 text-success" },
  suspended: { name: "停止中", color: "bg-warning/10 text-warning" },
  cancelled: { name: "退会", color: "bg-destructive/10 text-destructive" },
};

const planLimits = {
  trial: 2,
  standard: 5,
  premium: 999,
};

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            会員管理
          </h1>
          <p className="mt-1 text-text-secondary">
            会員の登録・編集・管理ができます
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" />
            CSV出力
          </Button>
          <Button className="rounded-xl" asChild>
            <Link href="/admin/members/new">
              <UserPlus className="mr-2 h-4 w-4" />
              新規登録
            </Link>
          </Button>
        </div>
      </div>

      {/* 検索・フィルター */}
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
              <Input
                placeholder="名前またはメールアドレスで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl pl-10"
              />
            </div>
            <Button variant="outline" className="rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              フィルター
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 会員一覧テーブル */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">会員</TableHead>
                <TableHead>プラン</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>今月の参加</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {member.photoUrl && (
                          <AvatarImage src={member.photoUrl} />
                        )}
                        <AvatarFallback className="bg-brand/10 text-brand">
                          {member.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-text-primary">
                          {member.displayName}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={planLabels[member.plan].color}>
                      {planLabels[member.plan].name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusLabels[member.status].color}
                    >
                      {statusLabels[member.status].name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{member.monthlyUsed}</span>
                    <span className="text-text-light">
                      /{planLimits[member.plan] === 999 ? "∞" : planLimits[member.plan]}回
                    </span>
                  </TableCell>
                  <TableCell className="text-text-secondary">
                    {member.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">メニュー</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/members/${member.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            詳細を見る
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/members/${member.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集する
                          </Link>
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

          {filteredMembers.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-text-secondary">
                該当する会員が見つかりませんでした
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ページネーション（後で実装） */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          {filteredMembers.length}件の会員を表示
        </p>
      </div>
    </div>
  );
}
