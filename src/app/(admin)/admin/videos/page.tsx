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
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Video,
  Play,
  ExternalLink,
} from "lucide-react";

// ダミーデータ
const videos = [
  {
    id: "1",
    title: "はじめてのベビーマッサージ",
    description: "赤ちゃんとのスキンシップを深めるベビーマッサージの基本をご紹介します。",
    youtubeUrl: "https://www.youtube.com/watch?v=xxxxx",
    thumbnailUrl: null,
    category: "育児",
    allowedPlans: ["standard", "premium"],
    status: "published" as const,
    createdAt: "2026/01/15",
  },
  {
    id: "2",
    title: "離乳食の始め方ガイド",
    description: "生後5〜6ヶ月からの離乳食の始め方、おすすめの食材を解説します。",
    youtubeUrl: "https://www.youtube.com/watch?v=yyyyy",
    thumbnailUrl: null,
    category: "食事",
    allowedPlans: ["standard", "premium"],
    status: "published" as const,
    createdAt: "2026/01/20",
  },
  {
    id: "3",
    title: "ママのためのストレッチ",
    description: "産後の体をケアする簡単ストレッチ。1日5分から始められます。",
    youtubeUrl: "https://www.youtube.com/watch?v=zzzzz",
    thumbnailUrl: null,
    category: "健康",
    allowedPlans: ["premium"],
    status: "published" as const,
    createdAt: "2026/02/01",
  },
  {
    id: "4",
    title: "寝かしつけのコツ",
    description: "なかなか寝てくれない赤ちゃんの寝かしつけテクニックを紹介。",
    youtubeUrl: "",
    thumbnailUrl: null,
    category: "育児",
    allowedPlans: ["standard", "premium"],
    status: "draft" as const,
    createdAt: "2026/02/10",
  },
];

const statusLabels = {
  published: { name: "公開中", color: "bg-success/10 text-success" },
  draft: { name: "下書き", color: "bg-muted text-muted-foreground" },
};

const planLabels: Record<string, string> = {
  trial: "お試し",
  standard: "スタンダード",
  premium: "プレミアム",
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    category: "",
    allowedPlans: ["standard", "premium"],
  });

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlanToggle = (plan: string) => {
    setNewVideo((prev) => ({
      ...prev,
      allowedPlans: prev.allowedPlans.includes(plan)
        ? prev.allowedPlans.filter((p) => p !== plan)
        : [...prev.allowedPlans, plan],
    }));
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            動画管理
          </h1>
          <p className="mt-1 text-text-secondary">
            会員向け動画コンテンツの管理ができます
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              動画を追加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>動画を追加</DialogTitle>
              <DialogDescription>
                YouTube限定公開のURLを入力してください
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="videoTitle">タイトル *</Label>
                <Input
                  id="videoTitle"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  placeholder="例：はじめてのベビーマッサージ"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                <Input
                  id="youtubeUrl"
                  value={newVideo.youtubeUrl}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, youtubeUrl: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoDescription">説明</Label>
                <textarea
                  id="videoDescription"
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  placeholder="動画の説明を入力..."
                  className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ</Label>
                <Input
                  id="category"
                  value={newVideo.category}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, category: e.target.value })
                  }
                  placeholder="例：育児、食事、健康"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>視聴可能プラン</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(planLabels).map(([value, label]) => (
                    <Badge
                      key={value}
                      variant={
                        newVideo.allowedPlans.includes(value)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${
                        newVideo.allowedPlans.includes(value)
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
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
            <Input
              placeholder="動画タイトルで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 動画一覧（カード形式） */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden border-none shadow-sm">
            {/* サムネイル */}
            <div className="relative aspect-video bg-gradient-to-br from-brand-light/50 to-cream">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md">
                  <Play className="h-6 w-6 text-brand" />
                </div>
              </div>
              <div className="absolute right-2 top-2">
                <Badge
                  variant="secondary"
                  className={statusLabels[video.status].color}
                >
                  {statusLabels[video.status].name}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                    {video.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      YouTubeで開く
                    </DropdownMenuItem>
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
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {video.allowedPlans.map((plan) => (
                    <Badge
                      key={plan}
                      variant="outline"
                      className="text-xs"
                    >
                      {planLabels[plan]}
                    </Badge>
                  ))}
                </div>
                {video.category && (
                  <Badge variant="secondary" className="bg-brand/10 text-brand text-xs">
                    {video.category}
                  </Badge>
                )}
              </div>

              <p className="mt-3 text-xs text-text-light">
                追加日: {video.createdAt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="py-12 text-center">
          <Video className="mx-auto h-12 w-12 text-text-light" />
          <p className="mt-2 text-text-secondary">
            動画が見つかりませんでした
          </p>
        </div>
      )}
    </div>
  );
}
