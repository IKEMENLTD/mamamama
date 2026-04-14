import { Header, Footer } from "@/components/layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn={true} userName={session.user?.name ?? ""} />
      <main className="flex-1 bg-beige">{children}</main>
      <Footer />
    </div>
  );
}
