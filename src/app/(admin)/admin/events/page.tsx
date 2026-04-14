"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Users,
  Calendar,
} from "lucide-react";

// ダミーデータ
const events = [
  {
    id: "1",
    title: "ベビーヨガ体験会",
    date: "2026/03/05",
    time: "10:00〜11:30",
    location: "渋谷コミュニティセンター",
    capacity: 10,
    reservations: 7,
    priceMember: 500,
    priceGuest: 1500,
    status: "published" as const,
    allowGuest: true,
    category: "EXERCISE" as const,
    eventType: "offline" as const,
  },
  {
    id: "2",
    title: "ママランチ交流会",
    date: "2026/03/08",
    time: "12:00〜14:00",
    location: "代官山カフェ",
    capacity: 10,
    reservations: 5,
    priceMember: 1000,
    priceGuest: 2000,
    status: "published" as const,
    allowGuest: true,
    category: "MAMA_KAI" as const,
    eventType: "offline" as const,
  },
  {
    id: "3",
    title: "親子リトミック教室",
    date: "2026/03/12",
    time: "11:00〜12:00",
    location: "目黒区民センター",
    capacity: 8,
    reservations: 2,
    priceMember: 800,
    priceGuest: 1800,
    status: "published" as const,
    allowGuest: false,
    category: "LEARNING" as const,
    eventType: "online" as const,
  },
  {
    id: "4",
    title: "ベビーマッサージ講座",
    date: "2026/03/15",
    time: "10:30〜11:30",
    location: "自由が丘スタジオ",
    capacity: 6,
    reservations: 0,
    priceMember: 1200,
    priceGuest: 2500,
    status: "draft" as const,
    allowGuest: true,
    category: "EXERCISE" as const,
    eventType: "offline" as const,
  },
];

const categoryLabels: Record<string, { name: string; color: string }> = {
  MAMA_KAI: { name: "ママ会", color: "bg-pink-100 text-pink-700" },
  EXERCISE: { name: "運動", color: "bg-green-100 text-green-700" },
  LEARNING: { name: "学び", color: "bg-blue-100 text-blue-700" },
};

const statusLabels = {
  published: { name: "公開中", color: "bg-success/10 text-success" },
  draft: { name: "下書き", color: "bg-muted text-muted-foreground" },
  cancelled: { name: "中止", color: "bg-destructive/10 text-destructive" },
};

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            イベント管理
          </h1>
          <p className="mt-1 text-text-secondary">
            イベントの作成・編集・管理ができます
          </p>
        </div>
        <Button className="rounded-xl" asChild>
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Link>
        </Button>
      </div>

      {/* 検索 */}
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="relative flex max-w-md items-center">
            <Search className="absolute left-3 h-4 w-4 text-text-light pointer-events-none" />
            <Input
              placeholder="イベント名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* イベント一覧 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">イベント</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>日時</TableHead>
                <TableHead>予約状況</TableHead>
                <TableHead>料金</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => {
                const occupancy = Math.round(
                  (event.reservations / event.capacity) * 100
                );
                return (
                  <TableRow key={event.id}>
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-medium text-text-primary">
                          {event.title}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {event.location}
                          {event.eventType === "online" && (
                            <Badge
                              variant="secondary"
                              className="ml-2 bg-info/10 text-info"
                            >
                              オンライン
                            </Badge>
                          )}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={categoryLabels[event.category].color}
                      >
                        {categoryLabels[event.category].name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{event.date}</p>
                        <p className="text-text-secondary">{event.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-32">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {event.reservations}/{event.capacity}名
                          </span>
                          <span className="text-text-light">{occupancy}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${
                              occupancy >= 80 ? "bg-warning" : "bg-brand"
                            }`}
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>会員: ¥{event.priceMember.toLocaleString()}</p>
                        {event.allowGuest && (
                          <p className="text-text-secondary">
                            非会員: ¥{event.priceGuest.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusLabels[event.status].color}
                      >
                        {statusLabels[event.status].name}
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
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/events/${event.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              詳細を見る
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/events/${event.id}/reservations`}>
                              <Users className="mr-2 h-4 w-4" />
                              予約者一覧
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/events/${event.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              編集する
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            複製する
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

          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-text-light" />
              <p className="mt-2 text-text-secondary">
                イベントが見つかりませんでした
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
