"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Banknote,
  CheckCircle,
  AlertCircle,
  Ticket,
  ShieldCheck,
} from "lucide-react";

// ダミーイベントデータ（ゲスト価格）
const eventsData: Record<
  string,
  {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    eventType: "online" | "offline";
    guestPrice: number;
  }
> = {
  "1": {
    id: "1",
    title: "ベビーヨガ体験会",
    date: "2026年3月5日（水）",
    time: "10:00〜11:30",
    location: "渋谷コミュニティセンター 3F 多目的室",
    eventType: "offline",
    guestPrice: 1500,
  },
  "2": {
    id: "2",
    title: "ママランチ交流会",
    date: "2026年3月8日（土）",
    time: "12:00〜14:00",
    location: "代官山カフェ MAMA TERRACE",
    eventType: "offline",
    guestPrice: 2500,
  },
  "3": {
    id: "3",
    title: "親子リトミック教室",
    date: "2026年3月12日（水）",
    time: "11:00〜12:00",
    location: "目黒区民センター 音楽室",
    eventType: "offline",
    guestPrice: 1500,
  },
};

type CouponState = "idle" | "applied" | "error";

export default function GuestBookingPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = eventsData[eventId];

  // フォーム状態
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
  });

  // クーポン状態
  const [couponCode, setCouponCode] = useState("");
  const [couponState, setCouponState] = useState<CouponState>("idle");
  const couponDiscount = 500; // ダミー割引額

  // バリデーション
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 入力時にエラーをクリア
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    // ダミー：「MAMA500」なら成功、それ以外はエラー
    if (couponCode.trim().toUpperCase() === "MAMA500") {
      setCouponState("applied");
    } else {
      setCouponState("error");
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponState("idle");
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "有効なメールアドレスを入力してください";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: 決済画面への遷移
    alert("決済画面に遷移します（未実装）");
  };

  const finalPrice =
    couponState === "applied"
      ? Math.max(0, (event?.guestPrice ?? 0) - couponDiscount)
      : event?.guestPrice ?? 0;

  // イベントが見つからない場合
  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-beige">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary">
              イベントが見つかりませんでした
            </h1>
            <p className="mt-2 text-text-secondary">
              お探しのイベントは存在しないか、終了した可能性があります。
            </p>
            <Button className="mt-6 rounded-xl" asChild>
              <Link href="/events">イベント一覧に戻る</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-beige">
        {/* 戻るリンク */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center text-sm text-text-secondary hover:text-brand"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            イベント詳細に戻る
          </Link>
        </div>

        <div className="container mx-auto max-w-2xl px-4 pb-32 lg:pb-12">
          {/* ページタイトル */}
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            ゲスト予約
          </h1>
          <p className="mt-1 text-text-secondary">
            会員登録なしでイベントに参加できます
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* イベント概要カード */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-5">
                <h2 className="font-heading text-lg font-semibold text-text-primary">
                  {event.title}
                </h2>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="h-4 w-4 text-brand" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock className="h-4 w-4 text-brand" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    {event.eventType === "online" ? (
                      <>
                        <Monitor className="h-4 w-4 text-brand" />
                        <span>オンライン</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-brand" />
                        <span>{event.location}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Banknote className="h-4 w-4 text-brand" />
                    <span className="font-semibold text-text-primary">
                      ゲスト価格 ¥{event.guestPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ゲスト情報フォーム */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-5">
                <h2 className="font-heading text-base font-semibold text-text-primary">
                  ご予約者情報
                </h2>
                <div className="mt-4 space-y-4">
                  {/* お名前 */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name">
                      お名前 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="例：田中 さくら"
                      className="rounded-xl"
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      メールアドレス <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="例：mama@example.com"
                      className="rounded-xl"
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* 電話番号 */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">
                      電話番号 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="例：090-1234-5678"
                      className="rounded-xl"
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* お子さまの年齢 */}
                  <div className="space-y-1.5">
                    <Label htmlFor="childAge">お子さまの年齢</Label>
                    <Input
                      id="childAge"
                      value={formData.childAge}
                      onChange={(e) =>
                        handleInputChange("childAge", e.target.value)
                      }
                      placeholder="例：1歳3ヶ月"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* クーポンコードセクション */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-brand" />
                  <h2 className="font-heading text-base font-semibold text-text-primary">
                    クーポンコード（お持ちの方）
                  </h2>
                </div>

                <div className="mt-4">
                  {couponState === "applied" ? (
                    <div className="rounded-xl bg-success/10 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-success">
                            ¥{couponDiscount.toLocaleString()} OFF適用済み
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-text-light hover:text-text-secondary"
                        >
                          取り消す
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Input
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            if (couponState === "error") {
                              setCouponState("idle");
                            }
                          }}
                          placeholder="コードを入力"
                          className="flex-1 rounded-xl"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl px-6"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim()}
                        >
                          適用
                        </Button>
                      </div>
                      {couponState === "error" && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          このコードは無効または期限切れです
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* 料金内訳 */}
                {couponState === "applied" && (
                  <div className="mt-4 space-y-2 rounded-xl bg-cream p-4">
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>元の金額</span>
                      <span>¥{event.guestPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-success">
                      <span>クーポン割引</span>
                      <span>-¥{couponDiscount.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-text-primary">
                      <span>お支払い金額</span>
                      <span>¥{finalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* デスクトップ用の料金サマリ + ボタン */}
            <div className="hidden lg:block">
              <Card className="border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>イベント参加費</span>
                      <span>¥{event.guestPrice.toLocaleString()}</span>
                    </div>
                    {couponState === "applied" && (
                      <div className="flex justify-between text-sm text-success">
                        <span>クーポン割引</span>
                        <span>-¥{couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-text-primary">
                      <span>お支払い金額</span>
                      <span>¥{finalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full rounded-xl text-base"
                    size="lg"
                  >
                    決済に進む
                  </Button>
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs text-text-light">
                    <ShieldCheck className="h-3 w-3" />
                    決済はSquareの安全な決済システムを利用します
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 会員案内 */}
            <div className="rounded-xl bg-brand/5 p-4 text-center">
              <p className="text-sm text-text-secondary">
                あんしんパス会員なら、面倒な入力なしで予約できます
              </p>
              <Link
                href="/login"
                className="mt-1 inline-block text-sm font-medium text-brand hover:underline"
              >
                ログイン / 会員登録はこちら
              </Link>
            </div>

            {/* モバイル用スティッキー料金バー */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 shadow-lg lg:hidden">
              <div className="container mx-auto max-w-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-light">お支払い金額</p>
                    <p className="text-xl font-bold text-text-primary">
                      ¥{finalPrice.toLocaleString()}
                    </p>
                    {couponState === "applied" && (
                      <p className="text-xs text-success">
                        -¥{couponDiscount.toLocaleString()} OFF適用中
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="rounded-xl px-8 text-base"
                    size="lg"
                  >
                    決済に進む
                  </Button>
                </div>
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-text-light">
                  <ShieldCheck className="h-3 w-3" />
                  決済はSquareの安全な決済システムを利用します
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
