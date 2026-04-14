"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Banknote,
  CheckCircle,
  Info,
  Monitor,
} from "lucide-react";

// ダミーデータ
const eventsData: Record<string, {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  address: string;
  capacity: number;
  remaining: number;
  price: number;
  category: string;
  eventType: "online" | "offline";
  zoomUrl?: string;
  zoomPasscode?: string;
  instructor: string;
  notes: string[];
  whatToBring: string[];
}> = {
  "1": {
    id: "1",
    title: "ベビーヨガ体験会",
    description: "赤ちゃんと一緒に楽しむヨガ体験。初めての方でも安心して参加できます。",
    longDescription: `赤ちゃんとのスキンシップを深めながら、ママもリフレッシュできるベビーヨガ体験会です。

経験豊富なインストラクターが、赤ちゃんの発達に合わせた安全なポーズを丁寧に指導します。ヨガが初めての方でも安心してご参加いただけます。

赤ちゃんの便秘解消や寝つきの改善、ママの産後の体調回復にも効果的です。同じ月齢のお子さまを持つママ同士の交流の場としてもお楽しみください。`,
    date: "2026年3月5日（水）",
    time: "10:00〜11:30",
    location: "渋谷コミュニティセンター 3F 多目的室",
    address: "東京都渋谷区渋谷1-1-1",
    capacity: 10,
    remaining: 3,
    price: 500,
    category: "EXERCISE",
    eventType: "offline",
    instructor: "山田 花子 先生（ベビーヨガインストラクター）",
    notes: [
      "対象月齢：生後2ヶ月〜1歳半",
      "授乳・おむつ替えスペースあり",
      "ベビーカー置き場あり",
    ],
    whatToBring: [
      "バスタオル",
      "赤ちゃんの着替え",
      "おむつ・おしりふき",
      "飲み物（ママ用・赤ちゃん用）",
    ],
  },
  "2": {
    id: "2",
    title: "ママランチ交流会",
    description: "美味しいランチを食べながら、ママ同士で交流しませんか？",
    longDescription: `おしゃれなカフェで美味しいランチを楽しみながら、ママ同士で交流する会です。

子育ての悩みや地域の情報交換、趣味の話など、リラックスした雰囲気で楽しくおしゃべりしましょう。

お店は子連れに優しいお店を厳選。キッズスペースや離乳食の持ち込みもOKです。新しいママ友を作る絶好の機会です！`,
    date: "2026年3月8日（土）",
    time: "12:00〜14:00",
    location: "代官山カフェ MAMA TERRACE",
    address: "東京都渋谷区代官山町1-1-1",
    capacity: 10,
    remaining: 5,
    price: 1500,
    category: "MAMA_KAI",
    eventType: "offline",
    instructor: "mamamamaスタッフ",
    notes: [
      "ランチ代込みの価格です",
      "お子さま用の離乳食・おやつ持ち込みOK",
      "キッズスペースあり",
    ],
    whatToBring: [
      "お子さまの食事（必要な方）",
      "おむつ・おしりふき",
      "お気に入りのおもちゃ",
    ],
  },
  "3": {
    id: "3",
    title: "親子リトミック教室",
    description: "音楽に合わせて体を動かすリトミック。お子さまの感性を育みます。",
    longDescription: `音楽のリズムに合わせて親子で体を動かすリトミック教室です。

リトミックは、音楽を通じてお子さまの感性・創造性・表現力を育む教育法です。0歳から参加できる内容で、歌やリズム遊び、楽器演奏を楽しみます。

親子の絆を深めながら、お子さまの発達を促す楽しい時間をお過ごしください。`,
    date: "2026年3月12日（水）",
    time: "11:00〜12:00",
    location: "目黒区民センター 音楽室",
    address: "東京都目黒区目黒2-2-2",
    capacity: 8,
    remaining: 8,
    price: 800,
    category: "LEARNING",
    eventType: "offline",
    instructor: "佐藤 美咲 先生（リトミック認定講師）",
    notes: [
      "対象年齢：0歳〜3歳",
      "動きやすい服装でお越しください",
      "楽器は教室で用意します",
    ],
    whatToBring: [
      "飲み物",
      "タオル",
      "おむつ・おしりふき",
    ],
  },
};

const categoryLabels: Record<string, { name: string; color: string }> = {
  MAMA_KAI: { name: "ママ会", color: "bg-pink-100 text-pink-700" },
  EXERCISE: { name: "運動", color: "bg-green-100 text-green-700" },
  LEARNING: { name: "学び", color: "bg-blue-100 text-blue-700" },
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const eventId = params.id as string;
  const event = eventsData[eventId];

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

  const handleApply = () => {
    setIsConfirmOpen(false);
    setIsCompleteOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-beige">
        {/* 戻るリンク */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/events"
            className="inline-flex items-center text-sm text-text-secondary hover:text-brand"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            イベント一覧に戻る
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2 space-y-6">
              {/* イベント画像 */}
              <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand-light to-cream" />

              {/* イベント情報 */}
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  {/* カテゴリ */}
                  <div className="mb-4 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={categoryLabels[event.category]?.color || "bg-gray-100 text-gray-700"}
                    >
                      {categoryLabels[event.category]?.name || event.category}
                    </Badge>
                    {event.eventType === "online" && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-600"
                      >
                        オンライン
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className={
                        event.remaining <= 3
                          ? "bg-destructive/10 text-destructive"
                          : "bg-brand/10 text-brand"
                      }
                    >
                      残り{event.remaining}席
                    </Badge>
                  </div>

                  {/* タイトル */}
                  <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
                    {event.title}
                  </h1>

                  {/* 説明 */}
                  <div className="mt-6">
                    <h2 className="font-heading text-lg font-semibold text-text-primary">
                      イベント概要
                    </h2>
                    <p className="mt-3 whitespace-pre-line text-text-secondary">
                      {event.longDescription}
                    </p>
                  </div>

                  {/* 講師情報 */}
                  <div className="mt-6">
                    <h2 className="font-heading text-lg font-semibold text-text-primary">
                      講師・担当
                    </h2>
                    <p className="mt-2 text-text-secondary">{event.instructor}</p>
                  </div>

                  {/* 持ち物 */}
                  <div className="mt-6">
                    <h2 className="font-heading text-lg font-semibold text-text-primary">
                      持ち物
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {event.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-text-secondary">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 注意事項 */}
                  <div className="mt-6">
                    <h2 className="font-heading text-lg font-semibold text-text-primary">
                      注意事項
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {event.notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2 text-text-secondary">
                          <Info className="mt-0.5 h-4 w-4 text-brand" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドバー（申し込みカード） */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">
                      イベント詳細
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 日時 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                        <Calendar className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">開催日</p>
                        <p className="font-medium text-text-primary">{event.date}</p>
                      </div>
                    </div>

                    {/* 時間 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                        <Clock className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">時間</p>
                        <p className="font-medium text-text-primary">{event.time}</p>
                      </div>
                    </div>

                    {/* 場所 */}
                    {event.eventType === "online" ? (
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                          <Monitor className="h-5 w-5 text-brand" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">オンライン開催</p>
                          <p className="font-medium text-text-primary">Zoom</p>
                          <p className="mt-1 text-xs text-text-secondary">
                            ZoomのURLは予約完了後にマイページとメールでお知らせします
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                          <MapPin className="h-5 w-5 text-brand" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">場所</p>
                          <p className="font-medium text-text-primary">{event.location}</p>
                          <p className="text-sm text-text-secondary">{event.address}</p>
                        </div>
                      </div>
                    )}

                    {/* 定員 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                        <Users className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">定員</p>
                        <p className="font-medium text-text-primary">
                          {event.capacity}名（残り{event.remaining}席）
                        </p>
                      </div>
                    </div>

                    {/* 参加費 */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                        <Banknote className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">参加費</p>
                        <p className="text-xl font-bold text-text-primary">
                          ¥{event.price.toLocaleString()}
                          <span className="text-sm font-normal text-text-secondary">/人</span>
                        </p>
                      </div>
                    </div>

                    {/* 申し込みボタン */}
                    <div className="pt-4">
                      <Button
                        className="w-full rounded-xl text-base"
                        size="lg"
                        onClick={() => setIsConfirmOpen(true)}
                        disabled={event.remaining === 0}
                      >
                        {event.remaining === 0 ? "満席です" : "このイベントに申し込む"}
                      </Button>
                      <p className="mt-2 text-center text-xs text-text-light">
                        キャンセルは開催24時間前まで可能です
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 申し込み確認ダイアログ */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申し込み確認</DialogTitle>
            <DialogDescription>
              以下のイベントに申し込みますか？
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-xl bg-cream p-4">
              <h3 className="font-heading font-semibold text-text-primary">
                {event.title}
              </h3>
              <div className="mt-2 space-y-1 text-sm text-text-secondary">
                <p>{event.date} {event.time}</p>
                <p>{event.location}</p>
                <p className="font-medium text-text-primary">
                  参加費: ¥{event.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setIsConfirmOpen(false)}
              >
                キャンセル
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={handleApply}
              >
                申し込む
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 申し込み完了ダイアログ */}
      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <DialogTitle className="text-center">申し込み完了</DialogTitle>
            <DialogDescription className="text-center">
              イベントへの申し込みが完了しました
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-xl bg-cream p-4">
              <h3 className="font-heading font-semibold text-text-primary">
                {event.title}
              </h3>
              <div className="mt-2 space-y-1 text-sm text-text-secondary">
                <p>{event.date} {event.time}</p>
                <p>{event.location}</p>
              </div>
            </div>
            <p className="text-center text-sm text-text-secondary">
              確認メールをお送りしました。
              <br />
              当日お会いできることを楽しみにしています！
            </p>
            <Button
              className="w-full rounded-xl"
              onClick={() => {
                setIsCompleteOpen(false);
                router.push("/events");
              }}
            >
              イベント一覧に戻る
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
