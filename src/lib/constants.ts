// Plan category labels and colors (used in admin, member, and public pages)
export const CATEGORY_LABELS: Record<string, { name: string; color: string }> = {
  MAMA_KAI: { name: "ママ会", color: "bg-pink-100 text-pink-700" },
  EXERCISE: { name: "運動", color: "bg-green-100 text-green-700" },
  LEARNING: { name: "学び", color: "bg-blue-100 text-blue-700" },
};

// Plan slug to display info mapping
export const PLAN_LABELS: Record<string, { name: string; color: string; textColor: string }> = {
  "mama-kai": { name: "ママ会部", color: "#F9A8D4", textColor: "text-white" },
  exercise: { name: "運動部", color: "#86EFAC", textColor: "text-white" },
  learning: { name: "学び部", color: "#93C5FD", textColor: "text-white" },
  premium: { name: "プレミアム部", color: "#FDE68A", textColor: "text-gray-800" },
};

// Event status labels
export const EVENT_STATUS_LABELS: Record<string, { name: string; color: string }> = {
  DRAFT: { name: "下書き", color: "bg-muted text-muted-foreground" },
  PUBLISHED: { name: "公開中", color: "bg-success/10 text-success" },
  CANCELLED: { name: "中止", color: "bg-destructive/10 text-destructive" },
};

// Reservation status labels
export const RESERVATION_STATUS_LABELS: Record<string, { name: string; color: string }> = {
  CONFIRMED: { name: "予約確定", color: "bg-brand/10 text-brand" },
  CANCELLED: { name: "キャンセル", color: "bg-destructive/10 text-destructive" },
  WAITLISTED: { name: "キャンセル待ち", color: "bg-warning/10 text-warning" },
};

// User status labels
export const USER_STATUS_LABELS: Record<string, { name: string; color: string }> = {
  ACTIVE: { name: "有効", color: "bg-success/10 text-success" },
  SUSPENDED: { name: "停止中", color: "bg-warning/10 text-warning" },
  CANCELLED: { name: "退会", color: "bg-destructive/10 text-destructive" },
};
