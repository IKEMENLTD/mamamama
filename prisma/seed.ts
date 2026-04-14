import { PrismaClient, Category, Role, UserStatus, EventType, EventStatus, ReservationStatus, VideoStatus, MemberCouponStatus, DiscountType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 12;

async function main() {
  console.log("🌱 Seeding mamamama database...\n");

  // ------------------------------------------
  // 1. Plans (4プラン)
  // ------------------------------------------
  console.log("📋 Creating plans...");

  const planMamaKai = await prisma.plan.upsert({
    where: { slug: "mama-kai" },
    update: {},
    create: {
      slug: "mama-kai",
      name: "あんしんパスママ会部",
      price: 980,
      categories: [Category.MAMA_KAI],
      color: "#F9A8D4",
      description: "ママ会イベントに参加し放題",
      sortOrder: 1,
      isActive: true,
    },
  });

  const planExercise = await prisma.plan.upsert({
    where: { slug: "exercise" },
    update: {},
    create: {
      slug: "exercise",
      name: "あんしんパス運動部",
      price: 2480,
      categories: [Category.EXERCISE],
      color: "#86EFAC",
      description: "運動系レッスンに参加し放題",
      sortOrder: 2,
      isActive: true,
    },
  });

  const planLearning = await prisma.plan.upsert({
    where: { slug: "learning" },
    update: {},
    create: {
      slug: "learning",
      name: "あんしんパス学び部",
      price: 2480,
      categories: [Category.LEARNING],
      color: "#93C5FD",
      description: "学び系レッスンに参加し放題",
      sortOrder: 3,
      isActive: true,
    },
  });

  const planPremium = await prisma.plan.upsert({
    where: { slug: "premium" },
    update: {},
    create: {
      slug: "premium",
      name: "あんしんパスプレミアム部",
      price: 3980,
      categories: [Category.MAMA_KAI, Category.EXERCISE, Category.LEARNING],
      color: "#FDE68A",
      description: "全イベント参加し放題",
      sortOrder: 4,
      isActive: true,
    },
  });

  console.log(`  ✓ ${planMamaKai.name} (¥${planMamaKai.price})`);
  console.log(`  ✓ ${planExercise.name} (¥${planExercise.price})`);
  console.log(`  ✓ ${planLearning.name} (¥${planLearning.price})`);
  console.log(`  ✓ ${planPremium.name} (¥${planPremium.price})`);

  // ------------------------------------------
  // 2. Admin User
  // ------------------------------------------
  console.log("\n👤 Creating admin user...");

  const adminHash = await bcrypt.hash("Admin1234!", SALT_ROUNDS);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mamamama.jp" },
    update: {},
    create: {
      email: "admin@mamamama.jp",
      passwordHash: adminHash,
      displayName: "管理者",
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      mustChangePassword: false,
    },
  });
  console.log(`  ✓ ${admin.displayName} (${admin.email})`);

  // ------------------------------------------
  // 3. Member Users (5名)
  // ------------------------------------------
  console.log("\n👥 Creating member users...");

  const memberHash = await bcrypt.hash("Member1234!", SALT_ROUNDS);

  const members = [
    { email: "tanaka.sakura@example.com", displayName: "田中 さくら", planId: planMamaKai.id, status: UserStatus.ACTIVE },
    { email: "suzuki.aoi@example.com", displayName: "鈴木 あおい", planId: planExercise.id, status: UserStatus.ACTIVE },
    { email: "sato.hinata@example.com", displayName: "佐藤 ひなた", planId: planLearning.id, status: UserStatus.ACTIVE },
    { email: "takahashi.rin@example.com", displayName: "高橋 りん", planId: planPremium.id, status: UserStatus.ACTIVE },
    { email: "ito.mio@example.com", displayName: "伊藤 みお", planId: planMamaKai.id, status: UserStatus.SUSPENDED },
  ];

  const createdMembers = [];
  for (const m of members) {
    const user = await prisma.user.upsert({
      where: { email: m.email },
      update: {},
      create: {
        email: m.email,
        passwordHash: memberHash,
        displayName: m.displayName,
        role: Role.MEMBER,
        planId: m.planId,
        status: m.status,
        mustChangePassword: false,
      },
    });
    createdMembers.push(user);
    console.log(`  ✓ ${user.displayName} (${m.status})`);
  }

  // ------------------------------------------
  // 4. Events (6件)
  // ------------------------------------------
  console.log("\n📅 Creating events...");

  const events = [
    {
      title: "ママ会ランチ交流会",
      description: "おしゃれなカフェで美味しいランチを楽しみながら、ママ同士で交流する会です。子育ての悩みや地域の情報交換、趣味の話など、リラックスした雰囲気で楽しくおしゃべりしましょう。お店は子連れに優しいお店を厳選。キッズスペースや離乳食の持ち込みもOKです。",
      category: Category.MAMA_KAI,
      eventType: EventType.OFFLINE,
      startAt: new Date("2026-05-10T12:00:00+09:00"),
      endAt: new Date("2026-05-10T14:00:00+09:00"),
      location: "代官山カフェ mamamama",
      capacity: 10,
      priceMember: 500,
      priceGuest: 1500,
      allowGuest: true,
      status: EventStatus.PUBLISHED,
    },
    {
      title: "ベビーヨガ体験会",
      description: "赤ちゃんとのスキンシップを深めながら、ママもリフレッシュできるベビーヨガ体験会です。経験豊富なインストラクターが、赤ちゃんの発達に合わせた安全なポーズを丁寧に指導します。ヨガが初めての方でも安心してご参加いただけます。",
      category: Category.EXERCISE,
      eventType: EventType.OFFLINE,
      startAt: new Date("2026-05-14T10:00:00+09:00"),
      endAt: new Date("2026-05-14T11:30:00+09:00"),
      location: "渋谷コミュニティセンター 3F",
      capacity: 8,
      priceMember: 800,
      priceGuest: 2000,
      allowGuest: true,
      status: EventStatus.PUBLISHED,
    },
    {
      title: "親子リトミック教室",
      description: "音楽のリズムに合わせて親子で体を動かすリトミック教室です。リトミックは、音楽を通じてお子さまの感性・創造性・表現力を育む教育法です。0歳から参加できる内容で、歌やリズム遊び、楽器演奏を楽しみます。",
      category: Category.LEARNING,
      eventType: EventType.OFFLINE,
      startAt: new Date("2026-05-20T11:00:00+09:00"),
      endAt: new Date("2026-05-20T12:00:00+09:00"),
      location: "目黒区民センター 和室",
      capacity: 12,
      priceMember: 600,
      priceGuest: 1800,
      allowGuest: false,
      status: EventStatus.PUBLISHED,
    },
    {
      title: "オンラインママ会",
      description: "ご自宅からZoomで参加できるオンラインママ会です。お子さまがお昼寝中でも、授乳中でも、気軽にご参加ください。テーマは毎回変わります。今回のテーマは「0歳児の夜泣き対策」。先輩ママのアドバイスも聞けます。",
      category: Category.MAMA_KAI,
      eventType: EventType.ONLINE,
      startAt: new Date("2026-05-17T21:00:00+09:00"),
      endAt: new Date("2026-05-17T22:00:00+09:00"),
      zoomUrl: "https://zoom.us/j/1234567890",
      zoomPasscode: "mama0517",
      capacity: 20,
      priceMember: 0,
      priceGuest: 500,
      allowGuest: true,
      status: EventStatus.PUBLISHED,
    },
    {
      title: "ストレッチ教室",
      description: "育児で凝り固まった体をほぐすストレッチ教室。お子さま連れOKで、リフレッシュしましょう。産後の体をケアする簡単ストレッチを中心に、1日5分から始められるメニューもお伝えします。",
      category: Category.EXERCISE,
      eventType: EventType.OFFLINE,
      startAt: new Date("2026-05-24T10:00:00+09:00"),
      endAt: new Date("2026-05-24T11:00:00+09:00"),
      location: "自由が丘スタジオ B1F",
      capacity: 6,
      priceMember: 1000,
      priceGuest: 2500,
      allowGuest: true,
      status: EventStatus.DRAFT,
    },
    {
      title: "離乳食オンライン講座",
      description: "離乳食の基本から実践まで、栄養士がわかりやすく解説するオンライン講座です。月齢別の進め方、おすすめ食材、簡単レシピを紹介します。質問タイムもありますので、普段のお悩みもお気軽にご相談ください。",
      category: Category.LEARNING,
      eventType: EventType.ONLINE,
      startAt: new Date("2026-05-28T14:00:00+09:00"),
      endAt: new Date("2026-05-28T15:30:00+09:00"),
      zoomUrl: "https://zoom.us/j/9876543210",
      zoomPasscode: "rinyuu0528",
      capacity: 30,
      priceMember: 500,
      priceGuest: 1500,
      allowGuest: true,
      status: EventStatus.PUBLISHED,
    },
  ];

  const createdEvents = [];
  for (const e of events) {
    const event = await prisma.event.create({ data: e });
    createdEvents.push(event);
    const typeLabel = e.eventType === EventType.ONLINE ? "ONLINE" : "OFFLINE";
    console.log(`  ✓ ${event.title} (${e.category}, ${typeLabel})`);
  }

  // ------------------------------------------
  // 5. Reservations (4件)
  // ------------------------------------------
  console.log("\n🎫 Creating reservations...");

  const reservations = [
    { eventId: createdEvents[0].id, userId: createdMembers[0].id },
    { eventId: createdEvents[1].id, userId: createdMembers[1].id },
    { eventId: createdEvents[2].id, userId: createdMembers[2].id },
    { eventId: createdEvents[3].id, userId: createdMembers[3].id },
  ];

  for (const r of reservations) {
    const reservation = await prisma.reservation.create({
      data: {
        eventId: r.eventId,
        userId: r.userId,
        isGuest: false,
        status: ReservationStatus.CONFIRMED,
      },
    });
    console.log(`  ✓ Reservation ${reservation.id.slice(0, 8)}...`);
  }

  // ------------------------------------------
  // 6. Sponsors (3社)
  // ------------------------------------------
  console.log("\n🏢 Creating sponsors...");

  const sponsors = [
    {
      name: "ベビーグッズ ABC",
      description: "安心・安全なベビー用品を提供するブランド。オーガニック素材にこだわった商品ラインナップ。",
      websiteUrl: "https://example.com/abc",
      contactPerson: "山田 花子",
      email: "yamada@abc-baby.co.jp",
      phone: "03-1234-5678",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "ママカフェ HELLO",
      description: "キッズスペース完備のカフェ。離乳食の持ち込みOK、ベビーチェア完備で安心。",
      websiteUrl: "https://example.com/hello",
      contactPerson: "鈴木 美咲",
      email: "suzuki@mamacafe-hello.jp",
      phone: "03-2345-6789",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "知育おもちゃ KIRA",
      description: "知育玩具の企画・販売。お子さまの発達段階に合わせた安全な木製おもちゃ。",
      websiteUrl: "https://example.com/kira",
      contactPerson: "佐藤 健太",
      email: "sato@kira-toys.co.jp",
      phone: "03-3456-7890",
      sortOrder: 3,
      isActive: true,
    },
  ];

  const createdSponsors = [];
  for (const s of sponsors) {
    const sponsor = await prisma.sponsor.create({ data: s });
    createdSponsors.push(sponsor);
    console.log(`  ✓ ${sponsor.name}`);
  }

  // ------------------------------------------
  // 7. Videos (3本)
  // ------------------------------------------
  console.log("\n🎬 Creating videos...");

  const videosData = [
    {
      title: "産後ストレッチ基本編",
      description: "産後のママ向けの基本ストレッチ。肩こり・腰痛解消に効果的な5分間プログラム。",
      youtubeUrl: "https://www.youtube.com/watch?v=example1",
      category: "運動",
      status: VideoStatus.PUBLISHED,
      sortOrder: 1,
      planSlugs: ["exercise", "premium"],
    },
    {
      title: "離乳食の進め方ガイド",
      description: "月齢別の離乳食の始め方、おすすめの食材とレシピを管理栄養士が解説します。",
      youtubeUrl: "https://www.youtube.com/watch?v=example2",
      category: "学び",
      status: VideoStatus.PUBLISHED,
      sortOrder: 2,
      planSlugs: ["learning", "premium"],
    },
    {
      title: "ママ会トーク集 #1",
      description: "先輩ママの子育て体験談。転勤族のママ、ワンオペ育児のママなど、リアルな声をお届けします。",
      youtubeUrl: "https://www.youtube.com/watch?v=example3",
      category: "ママ会",
      status: VideoStatus.DRAFT,
      sortOrder: 3,
      planSlugs: ["mama-kai", "premium"],
    },
  ];

  const allPlans = [planMamaKai, planExercise, planLearning, planPremium];

  for (const v of videosData) {
    const { planSlugs, ...videoData } = v;
    const video = await prisma.video.create({ data: videoData });

    for (const slug of planSlugs) {
      const plan = allPlans.find((p) => p.slug === slug);
      if (plan) {
        await prisma.videoPlanAccess.create({
          data: { videoId: video.id, planId: plan.id },
        });
      }
    }
    console.log(`  ✓ ${video.title}`);
  }

  // ------------------------------------------
  // 8. Member Coupons (2件)
  // ------------------------------------------
  console.log("\n🎟️ Creating member coupons...");

  const memberCouponsData = [
    {
      title: "ベビーグッズ ABC 10%OFF",
      description: "ABC店舗でのお買い物が10%OFF。レジにて画面を提示してください。他の割引との併用はできません。",
      sponsorId: createdSponsors[0].id,
      expiresAt: new Date("2026-08-31T23:59:59+09:00"),
      status: MemberCouponStatus.ACTIVE,
      planSlugs: ["mama-kai", "exercise", "learning", "premium"],
    },
    {
      title: "ママカフェ HELLO ドリンク無料",
      description: "HELLO店舗でドリンク1杯無料。お子さまとご一緒にどうぞ。テイクアウトも対象です。",
      sponsorId: createdSponsors[1].id,
      expiresAt: new Date("2026-06-30T23:59:59+09:00"),
      status: MemberCouponStatus.ACTIVE,
      planSlugs: ["premium"],
    },
  ];

  for (const c of memberCouponsData) {
    const { planSlugs, ...couponData } = c;
    const coupon = await prisma.memberCoupon.create({ data: couponData });

    for (const slug of planSlugs) {
      const plan = allPlans.find((p) => p.slug === slug);
      if (plan) {
        await prisma.memberCouponPlanAccess.create({
          data: { memberCouponId: coupon.id, planId: plan.id },
        });
      }
    }
    console.log(`  ✓ ${coupon.title}`);
  }

  // ------------------------------------------
  // 9. Guest Coupons (2件)
  // ------------------------------------------
  console.log("\n🏷️ Creating guest coupons...");

  const guestCoupons = [
    {
      code: "WELCOME500",
      title: "初回500円引き",
      discountType: DiscountType.AMOUNT,
      discountValue: 500,
      expiresAt: new Date("2026-12-31T23:59:59+09:00"),
      usageLimit: 100,
      usageCount: 0,
      isActive: true,
    },
    {
      code: "MAMA20",
      title: "ママ友紹介20%OFF",
      discountType: DiscountType.RATE,
      discountValue: 20,
      expiresAt: new Date("2026-12-31T23:59:59+09:00"),
      usageLimit: 50,
      usageCount: 0,
      isActive: true,
    },
  ];

  for (const gc of guestCoupons) {
    const coupon = await prisma.guestCoupon.upsert({
      where: { code: gc.code },
      update: {},
      create: gc,
    });
    console.log(`  ✓ ${coupon.code} (${coupon.title})`);
  }

  // ------------------------------------------
  // Summary
  // ------------------------------------------
  console.log("\n✅ Seeding complete!");
  console.log("   Plans: 4");
  console.log("   Users: 1 admin + 5 members");
  console.log("   Events: 6");
  console.log("   Reservations: 4");
  console.log("   Sponsors: 3");
  console.log("   Videos: 3");
  console.log("   Member Coupons: 2");
  console.log("   Guest Coupons: 2");
  console.log("\n📌 Login credentials:");
  console.log("   Admin: admin@mamamama.jp / Admin1234!");
  console.log("   Member: tanaka.sakura@example.com / Member1234!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
