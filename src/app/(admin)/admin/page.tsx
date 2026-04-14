import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  UserPlus,
  Clock,
} from "lucide-react";

// ダミーデータ（後でバックエンドと連携）
const stats = {
  totalMembers: 78,
  mamaKaiMembers: 20,
  exerciseMembers: 18,
  learningMembers: 15,
  premiumMembers: 25,
  monthlyEvents: 12,
  upcomingReservations: 45,
};

const recentReservations = [
  {
    id: 1,
    memberName: "田中 さくら",
    eventTitle: "ベビーヨガ体験会",
    date: "2026/03/05",
    createdAt: "5分前",
  },
  {
    id: 2,
    memberName: "鈴木 あおい",
    eventTitle: "ママランチ交流会",
    date: "2026/03/08",
    createdAt: "15分前",
  },
  {
    id: 3,
    memberName: "佐藤 ひなた",
    eventTitle: "親子リトミック教室",
    date: "2026/03/12",
    createdAt: "1時間前",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "ベビーヨガ体験会",
    date: "2026/03/05 10:00",
    reservations: 7,
    capacity: 10,
  },
  {
    id: 2,
    title: "ママランチ交流会",
    date: "2026/03/08 12:00",
    reservations: 5,
    capacity: 10,
  },
  {
    id: 3,
    title: "親子リトミック教室",
    date: "2026/03/12 11:00",
    reservations: 2,
    capacity: 8,
  },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "山田さんの決済が失敗しています",
    link: "/admin/members/1",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            ダッシュボード
          </h1>
          <p className="mt-1 text-text-secondary">
            mamamamaの運営状況を確認できます
          </p>
        </div>
        <Button className="rounded-xl" asChild>
          <Link href="/admin/members/new">
            <UserPlus className="mr-2 h-4 w-4" />
            会員を登録
          </Link>
        </Button>
      </div>

      {/* アラート */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-warning" />
              <p className="flex-1 text-sm text-text-primary">{alert.message}</p>
              <Button variant="ghost" size="sm" className="text-warning" asChild>
                <Link href={alert.link}>
                  確認する
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              総会員数
            </CardTitle>
            <Users className="h-5 w-5 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalMembers}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <Badge variant="outline" className="border-[#F9A8D4]/50 text-[#F9A8D4]">
                ママ会部 {stats.mamaKaiMembers}
              </Badge>
              <Badge variant="outline" className="border-[#86EFAC]/50 text-green-600">
                運動部 {stats.exerciseMembers}
              </Badge>
              <Badge variant="outline" className="border-[#93C5FD]/50 text-blue-600">
                学び部 {stats.learningMembers}
              </Badge>
              <Badge variant="outline" className="border-[#FDE68A]/50 text-yellow-700">
                プレミアム部 {stats.premiumMembers}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              今月のイベント
            </CardTitle>
            <Calendar className="h-5 w-5 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.monthlyEvents}</div>
            <p className="mt-2 text-xs text-text-light">件のイベントを開催予定</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              予約数
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.upcomingReservations}</div>
            <p className="mt-2 text-xs text-text-light">件の予約があります</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              平均予約率
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">72%</div>
            <p className="mt-2 text-xs text-text-light">前月比 +5%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 最近の予約 */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">最近の予約</CardTitle>
            <Button variant="ghost" size="sm" className="text-brand" asChild>
              <Link href="/admin/reservations">
                すべて見る
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                >
                  <div>
                    <p className="font-medium text-text-primary">
                      {reservation.memberName}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {reservation.eventTitle}（{reservation.date}）
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-light">
                    <Clock className="h-3 w-3" />
                    {reservation.createdAt}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 今後のイベント */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">今後のイベント</CardTitle>
            <Button variant="ghost" size="sm" className="text-brand" asChild>
              <Link href="/admin/events">
                すべて見る
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const occupancy = Math.round(
                  (event.reservations / event.capacity) * 100
                );
                return (
                  <div
                    key={event.id}
                    className="rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-text-primary">{event.title}</p>
                      <Badge
                        variant="secondary"
                        className={
                          occupancy >= 80
                            ? "bg-warning/10 text-warning"
                            : "bg-brand/10 text-brand"
                        }
                      >
                        {event.reservations}/{event.capacity}名
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{event.date}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          occupancy >= 80 ? "bg-warning" : "bg-brand"
                        }`}
                        style={{ width: `${occupancy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
