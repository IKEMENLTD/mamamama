"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  User,
  Calendar,
  CreditCard,
  Upload,
  Loader2,
  CheckCircle,
  Save,
  Mail,
  AlertCircle,
} from "lucide-react";

// ダミーデータ（後でバックエンドと連携）
const memberData = {
  id: "1",
  displayName: "田中 さくら",
  email: "tanaka.sakura@example.com",
  plan: "standard" as const,
  status: "active" as const,
  monthlyUsed: 2,
  createdAt: "2025/12/01",
  photoUrl: null,
  squareCustomerId: "sq_customer_123",
  squareSubscriptionId: "sq_subscription_456",
};

const reservationHistory = [
  {
    id: 1,
    eventTitle: "ベビーヨガ体験会",
    date: "2026/03/05",
    status: "confirmed" as const,
  },
  {
    id: 2,
    eventTitle: "ママランチ交流会",
    date: "2026/02/15",
    status: "completed" as const,
  },
  {
    id: 3,
    eventTitle: "親子リトミック教室",
    date: "2026/01/20",
    status: "cancelled" as const,
  },
];

const planOptions = [
  { value: "trial", label: "お試しプラン", price: "¥980/月" },
  { value: "standard", label: "スタンダードプラン", price: "¥2,980/月" },
  { value: "premium", label: "プレミアムプラン", price: "¥4,980/月" },
];

const statusOptions = [
  { value: "active", label: "有効" },
  { value: "suspended", label: "停止中" },
  { value: "cancelled", label: "退会" },
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

const reservationStatusLabels = {
  confirmed: { name: "予約確定", color: "bg-brand/10 text-brand" },
  completed: { name: "参加済み", color: "bg-success/10 text-success" },
  cancelled: { name: "キャンセル", color: "bg-destructive/10 text-destructive" },
};

export default function MemberDetailPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    displayName: memberData.displayName,
    email: memberData.email,
    plan: memberData.plan,
    status: memberData.status,
  });

  const handleSave = async () => {
    setIsLoading(true);
    // ダミーの保存処理
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            会員詳細
          </h1>
          <p className="text-text-secondary">
            会員情報の確認・編集ができます
          </p>
        </div>
        <Button
          className="rounded-xl"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : success ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              保存しました
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              保存
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左側：会員情報 */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                基本情報
              </TabsTrigger>
              <TabsTrigger value="reservations" className="gap-2">
                <Calendar className="h-4 w-4" />
                予約履歴
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-2">
                <CreditCard className="h-4 w-4" />
                決済情報
              </TabsTrigger>
            </TabsList>

            {/* 基本情報タブ */}
            <TabsContent value="profile">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">基本情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">表示名</Label>
                      <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData({ ...formData, displayName: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plan">プラン</Label>
                      <select
                        id="plan"
                        value={formData.plan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            plan: e.target.value as typeof formData.plan,
                          })
                        }
                        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {planOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} ({option.price})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">ステータス</Label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value as typeof formData.status,
                          })
                        }
                        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 予約履歴タブ */}
            <TabsContent value="reservations">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">予約履歴</CardTitle>
                  <CardDescription>
                    今月の参加: {memberData.monthlyUsed}回
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reservationHistory.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between rounded-xl border border-border/50 p-4"
                      >
                        <div>
                          <p className="font-medium text-text-primary">
                            {reservation.eventTitle}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {reservation.date}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            reservationStatusLabels[reservation.status].color
                          }
                        >
                          {reservationStatusLabels[reservation.status].name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 決済情報タブ */}
            <TabsContent value="payment">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">決済情報</CardTitle>
                  <CardDescription>
                    Squareとの連携情報を確認できます
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl bg-cream p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-text-secondary">顧客ID</p>
                        <p className="font-mono text-sm">
                          {memberData.squareCustomerId || "未連携"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">
                          サブスクリプションID
                        </p>
                        <p className="font-mono text-sm">
                          {memberData.squareSubscriptionId || "未連携"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <AlertCircle className="h-4 w-4" />
                    決済情報の詳細はSquareダッシュボードで確認してください
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右側：サマリー */}
        <div className="space-y-6">
          {/* プロフィールカード */}
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  {memberData.photoUrl && (
                    <AvatarImage src={memberData.photoUrl} />
                  )}
                  <AvatarFallback className="bg-brand/10 text-2xl text-brand">
                    {memberData.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 rounded-xl"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  写真を変更
                </Button>
                <p className="mt-4 text-xs text-text-light">
                  ※ 管理画面でのみ表示されます
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">プラン</span>
                  <Badge className={planLabels[memberData.plan].color}>
                    {planLabels[memberData.plan].name}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">ステータス</span>
                  <Badge
                    variant="secondary"
                    className={statusLabels[memberData.status].color}
                  >
                    {statusLabels[memberData.status].name}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">登録日</span>
                  <span className="text-sm">{memberData.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* アクション */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">アクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Mail className="mr-2 h-4 w-4" />
                パスワードリセットメールを送信
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                アカウントを停止
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
