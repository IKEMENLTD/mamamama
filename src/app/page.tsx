import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Video,
  Gift,
  Users,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "イベント予約",
    description: "ママ友との交流イベントにかんたん予約。お子さま連れでも安心して参加できます。",
  },
  {
    icon: Video,
    title: "限定動画",
    description: "子育てに役立つ動画コンテンツをいつでも視聴可能。すきま時間に学べます。",
  },
  {
    icon: Gift,
    title: "お得なクーポン",
    description: "協賛企業様からの特別クーポンで、子育てグッズをお得にゲット。",
  },
  {
    icon: Users,
    title: "コミュニティ",
    description: "同じ境遇のママたちとつながる、あなたの「第2のホーム」。",
  },
];

const plans = [
  {
    name: "あんしんパスママ会部",
    price: "980",
    color: "#F9A8D4",
    features: ["ママ会イベントに参加し放題", "コミュニティ参加"],
    highlight: false,
  },
  {
    name: "あんしんパス運動部",
    price: "2,480",
    color: "#86EFAC",
    features: [
      "運動系レッスンに参加し放題",
      "コミュニティ参加",
    ],
    highlight: false,
  },
  {
    name: "あんしんパス学び部",
    price: "2,480",
    color: "#93C5FD",
    features: [
      "学び系レッスンに参加し放題",
      "コミュニティ参加",
    ],
    highlight: false,
  },
  {
    name: "あんしんパスプレミアム部",
    price: "3,980",
    color: "#FDE68A",
    features: [
      "全イベント参加し放題",
      "限定動画の視聴",
      "クーポン利用",
      "コミュニティ参加",
    ],
    highlight: true,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "ベビーヨガ体験会",
    date: "2026年3月5日（水）10:00〜",
    location: "渋谷コミュニティセンター",
    spots: 3,
  },
  {
    id: 2,
    title: "ママランチ交流会",
    date: "2026年3月8日（土）12:00〜",
    location: "代官山カフェ",
    spots: 5,
  },
  {
    id: 3,
    title: "親子リトミック教室",
    date: "2026年3月12日（水）11:00〜",
    location: "目黒区民センター",
    spots: 8,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 w-48 md:w-64">
                <Image
                  src="/images/logo-vertical.png"
                  alt="mamamama - ママのままで わたしのままで"
                  width={256}
                  height={300}
                  className="mx-auto h-auto w-full"
                  priority
                />
              </div>
              <Badge className="mb-4 bg-brand/10 text-brand hover:bg-brand/20">
                0〜3歳児ママのためのコミュニティ
              </Badge>
              <h1 className="font-heading text-4xl font-bold leading-tight text-text-primary md:text-5xl lg:text-6xl">
                ママのままで
                <br />
                <span className="text-brand">わたしのままで</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary">
                転勤族でも、はじめての土地でも大丈夫。
                <br />
                mamamamaは、あなたの「第2のホーム」になります。
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="rounded-xl text-base" asChild>
                  <Link href="/login">
                    会員ログイン
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-brand text-base text-brand hover:bg-brand/5"
                  asChild
                >
                  <Link href="/sponsors">協賛企業を見る</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* 装飾 - たんぽぽイラスト */}
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />
          <div className="absolute -right-10 top-10 h-60 w-60 rounded-full bg-brand-light/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-6 -right-6 w-32 opacity-20 md:w-48 md:opacity-25">
            <Image
              src="/images/logo-vertical.png"
              alt=""
              width={192}
              height={225}
              className="h-auto w-full"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
                mamamamaでできること
              </h2>
              <p className="mt-4 text-text-secondary">
                忙しいママの毎日をもっと楽しく、もっと豊かに。
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-none bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                      <feature.icon className="h-6 w-6 text-brand" />
                    </div>
                    <CardTitle className="font-heading text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* イベントセクション */}
        <section className="bg-beige py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
                  近日開催のイベント
                </h2>
                <p className="mt-2 text-text-secondary">
                  会員限定のイベントに参加しよう
                </p>
              </div>
              <Button variant="ghost" className="hidden text-brand md:flex" asChild>
                <Link href="/events">
                  すべて見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="h-full overflow-hidden border-none bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-video bg-gradient-to-br from-brand-light to-cream" />
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-brand/10 text-brand"
                        >
                          残り{event.spots}席
                        </Badge>
                      </div>
                      <h3 className="font-heading text-lg font-semibold">
                        {event.title}
                      </h3>
                      <div className="mt-3 space-y-1 text-sm text-text-secondary">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {event.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Button variant="outline" className="rounded-xl" asChild>
                <Link href="/events">
                  すべてのイベントを見る
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 料金プランセクション */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
                料金プラン
              </h2>
              <p className="mt-4 text-text-secondary">
                あなたのライフスタイルに合わせて選べる4つのプラン
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative border-2 ${
                    plan.highlight
                      ? "border-brand shadow-lg"
                      : "border-transparent shadow-sm"
                  }`}
                  style={{ borderTopColor: plan.color, borderTopWidth: "4px" }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-brand text-white">
                        <Star className="mr-1 h-3 w-3" />
                        おすすめ
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-heading text-xl">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-text-primary">
                        ¥{plan.price}
                      </span>
                      <span className="text-text-secondary">/月（税込）</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                          <span className="text-sm text-text-secondary">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-text-light">
              ※ 会員登録は管理者による招待制です。詳しくは
              <a
                href="https://instagram.com/mamamama.circle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                Instagram
              </a>
              からお問い合わせください。
            </p>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="bg-gradient-to-r from-brand to-brand-dark py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <Image
              src="/images/logo-dandelion.png"
              alt=""
              width={80}
              height={96}
              className="mx-auto h-20 w-auto opacity-30"
            />
            <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl">
              一人じゃない、を実感しよう
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              mamamamaには、あなたと同じように子育てを頑張るママたちがいます。
              <br />
              一緒に笑って、一緒に悩んで、一緒に成長していきましょう。
            </p>
            <Button
              size="lg"
              className="mt-8 rounded-xl bg-white text-brand hover:bg-white/90"
              asChild
            >
              <Link href="/login">
                会員ログイン
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
