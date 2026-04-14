import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, ArrowRight, Monitor } from "lucide-react";

// ダミーデータ
const events = [
  {
    id: "1",
    title: "ベビーヨガ体験会",
    description: "赤ちゃんと一緒に楽しむヨガ体験。初めての方でも安心して参加できます。リラックスしながら親子の絆を深めましょう。",
    date: "2026年3月5日（水）",
    time: "10:00〜11:30",
    location: "渋谷コミュニティセンター 3F",
    address: "東京都渋谷区渋谷1-1-1",
    capacity: 10,
    remaining: 3,
    price: 500,
    category: "EXERCISE",
    eventType: "offline" as const,
    image: null,
  },
  {
    id: "2",
    title: "ママランチ交流会",
    description: "美味しいランチを食べながら、ママ同士で交流しませんか？子育ての悩みや情報交換ができる楽しい時間です。",
    date: "2026年3月8日（土）",
    time: "12:00〜14:00",
    location: "代官山カフェ",
    address: "東京都渋谷区代官山町1-1-1",
    capacity: 10,
    remaining: 5,
    price: 1500,
    category: "MAMA_KAI",
    eventType: "offline" as const,
    image: null,
  },
  {
    id: "3",
    title: "親子リトミック教室",
    description: "音楽に合わせて体を動かすリトミック。お子さまの感性を育みながら、親子で楽しい時間を過ごしましょう。",
    date: "2026年3月12日（水）",
    time: "11:00〜12:00",
    location: "目黒区民センター",
    address: "東京都目黒区目黒2-2-2",
    capacity: 8,
    remaining: 8,
    price: 800,
    category: "LEARNING",
    eventType: "offline" as const,
    image: null,
  },
  {
    id: "4",
    title: "ベビーマッサージ講座",
    description: "赤ちゃんとのスキンシップを深めるベビーマッサージ。基本的な手技から応用まで、丁寧にお教えします。",
    date: "2026年3月15日（土）",
    time: "10:30〜12:00",
    location: "世田谷区民会館",
    address: "東京都世田谷区世田谷3-3-3",
    capacity: 12,
    remaining: 7,
    price: 1000,
    category: "EXERCISE",
    eventType: "offline" as const,
    image: null,
  },
  {
    id: "5",
    title: "離乳食講座（初期〜中期）",
    description: "離乳食の基本から実践まで、栄養士がわかりやすく解説します。試食タイムもあります。",
    date: "2026年3月20日（木）",
    time: "13:00〜15:00",
    location: "品川区立総合区民会館",
    address: "東京都品川区品川4-4-4",
    capacity: 15,
    remaining: 10,
    price: 1200,
    category: "LEARNING",
    eventType: "online" as const,
    image: null,
  },
  {
    id: "6",
    title: "ママのためのストレッチ教室",
    description: "育児で凝り固まった体をほぐすストレッチ教室。お子さま連れOKで、リフレッシュしましょう。",
    date: "2026年3月25日（火）",
    time: "10:00〜11:00",
    location: "中野区産業振興センター",
    address: "東京都中野区中野5-5-5",
    capacity: 10,
    remaining: 4,
    price: 600,
    category: "EXERCISE",
    eventType: "offline" as const,
    image: null,
  },
];

const categoryLabels: Record<string, { name: string; color: string }> = {
  MAMA_KAI: { name: "ママ会", color: "bg-pink-100 text-pink-700" },
  EXERCISE: { name: "運動", color: "bg-green-100 text-green-700" },
  LEARNING: { name: "学び", color: "bg-blue-100 text-blue-700" },
};

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-beige">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-b from-cream to-beige py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
                イベント一覧
              </h1>
              <p className="mt-4 text-text-secondary">
                会員限定のイベントに参加して、ママ友との素敵な時間を過ごしましょう
              </p>
            </div>
          </div>
        </section>

        {/* イベント一覧 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="h-full overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                    {/* イベント画像 */}
                    <div className="aspect-video bg-gradient-to-br from-brand-light to-cream" />

                    <CardContent className="p-5">
                      {/* カテゴリ・残席 */}
                      <div className="mb-3 flex items-center gap-2">
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
                      <h3 className="font-heading text-lg font-semibold text-text-primary line-clamp-2">
                        {event.title}
                      </h3>

                      {/* 説明 */}
                      <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                        {event.description}
                      </p>

                      {/* 詳細情報 */}
                      <div className="mt-4 space-y-2 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-brand" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-brand" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.eventType === "online" ? (
                            <>
                              <Monitor className="h-4 w-4 text-brand" />
                              <span className="line-clamp-1">オンライン</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="h-4 w-4 text-brand" />
                              <span className="line-clamp-1">{event.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* 価格 */}
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <div>
                          <span className="text-lg font-bold text-text-primary">
                            ¥{event.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-text-secondary">/人</span>
                        </div>
                        <span className="flex items-center text-sm font-medium text-brand">
                          詳細を見る
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
