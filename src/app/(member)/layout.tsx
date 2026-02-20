import { Header, Footer } from "@/components/layout";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: 実際の認証チェックを追加
  // 仮のユーザー情報（後でバックエンドと連携）
  const isLoggedIn = true;
  const userName = "田中 さくら";

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn={isLoggedIn} userName={userName} />
      <main className="flex-1 bg-beige">{children}</main>
      <Footer />
    </div>
  );
}
