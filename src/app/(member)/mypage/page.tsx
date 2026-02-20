import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Video,
  Gift,
  User,
  ArrowRight,
  Clock,
  MapPin,
  Star,
} from "lucide-react";

type Plan = "trial" | "standard" | "premium";

// ダミーデータ（後でバックエンドと連携）
const userData: {
  name: string;
  plan: Plan;
  planName: string;
  monthlyLimit: number;
  monthlyUsed: number;
} = {
  name: "田中 さくら",
  plan: "standard",
  planName: "スタンダードプラン",
  monthlyLimit: 5,
  monthlyUsed: 2,
};

const planLabels = {
  trial: { name: "お試しプラン", color: "bg-text-light" },
  standard: { name: "スタンダードプラン", color: "bg-brand" },
  premium: { name: "プレミアムプラン", color: "bg-brand-dark" },
};

const upcomingReservations = [
  {
    id: 1,
    title: "ベビーヨガ体験会",
    date: "2026年3月5日（水）",
    time: "10:00〜11:30",
    location: "渋谷コミュニティセンター",
  },
  {
    id: 2,
    title: "ママランチ交流会",
    date: "2026年3月8日（土）",
    time: "12:00〜14:00",
    location: "代官山カフェ",
  },
];

const quickLinks = [
  {
    href: "/events",
    icon: Calendar,
    label: "イベント予約",
    description: "新しいイベントを探す",
  },
  {
    href: "/videos",
    icon: Video,
    label: "限定動画",
    description: "動画コンテンツを見る",
  },
  {
    href: "/coupons",
    icon: Gift,
    label: "クーポン",
    description: "お得なクーポンをチェック",
  },
  {
    href: "/profile",
    icon: User,
    label: "プロフィール",
    description: "設定を変更する",
  },
];

export default function MyPage() {
  const remainingEvents = userData.monthlyLimit - userData.monthlyUsed;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ウェルカムセクション */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
          こんにちは、{userData.name}さん
        </h1>
        <p className="mt-1 text-text-secondary">
          今日も素敵な1日をお過ごしください
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* メインコンテンツ（左側2/3） */}
        <div className="space-y-6 lg:col-span-2">
          {/* プラン情報カード */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">プラン情報</CardTitle>
              <Badge className={planLabels[userData.plan].color}>
                {userData.plan === "premium" && (
                  <Star className="mr-1 h-3 w-3" />
                )}
                {planLabels[userData.plan].name}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-xl bg-cream p-4">
                <div>
                  <p className="text-sm text-text-secondary">
                    今月のイベント参加
                  </p>
                  <p className="mt-1 text-2xl font-bold text-text-primary">
                    {userData.monthlyUsed}
                    <span className="text-base font-normal text-text-secondary">
                      {" "}
                      / {userData.monthlyLimit}回
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">残り</p>
                  <p className="text-2xl font-bold text-brand">
                    {remainingEvents}回
                  </p>
                </div>
              </div>
              {remainingEvents <= 1 && (
                <p className="mt-3 text-sm text-warning">
                  残り参加回数が少なくなっています。プランのアップグレードをご検討ください。
                </p>
              )}
            </CardContent>
          </Card>

          {/* 予約一覧カード */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                今後の予約
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-brand" asChild>
                <Link href="/reservations">
                  すべて見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingReservations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex gap-4 rounded-xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-sm"
                    >
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10">
                        <Calendar className="h-6 w-6 text-brand" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-text-primary">
                          {reservation.title}
                        </h3>
                        <div className="mt-1 space-y-1 text-sm text-text-secondary">
                          <p className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {reservation.date} {reservation.time}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {reservation.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-cream py-8 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-text-light" />
                  <p className="mt-2 text-text-secondary">
                    予約中のイベントはありません
                  </p>
                  <Button className="mt-4 rounded-xl" asChild>
                    <Link href="/events">イベントを探す</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* サイドバー（右側1/3） */}
        <div className="space-y-6">
          {/* クイックリンク */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">メニュー</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-cream"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                    <link.icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{link.label}</p>
                    <p className="text-xs text-text-light">{link.description}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* お知らせカード */}
          <Card className="border-none bg-gradient-to-br from-brand/10 to-brand-light/20 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <Gift className="mx-auto h-10 w-10 text-brand" />
                <h3 className="mt-3 font-heading font-medium text-text-primary">
                  新しいクーポンが届いています
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  協賛企業様からの特別オファー
                </p>
                <Button
                  size="sm"
                  className="mt-4 rounded-xl"
                  asChild
                >
                  <Link href="/coupons">クーポンを見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
