"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2, CheckCircle, User, Lock } from "lucide-react";

// ダミーデータ（後でバックエンドと連携）
const userData = {
  email: "tanaka.sakura@example.com",
  displayName: "田中 さくら",
};

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState(userData.displayName);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProfileLoading(true);
    setProfileError("");
    setProfileSuccess(false);

    if (!displayName.trim()) {
      setProfileError("表示名を入力してください");
      setIsProfileLoading(false);
      return;
    }

    // ダミーの保存処理（後でバックエンドと連携）
    setTimeout(() => {
      setIsProfileLoading(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess(false);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("すべての項目を入力してください");
      setIsPasswordLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("新しいパスワードは8文字以上で入力してください");
      setIsPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("新しいパスワードが一致しません");
      setIsPasswordLoading(false);
      return;
    }

    // ダミーの保存処理（後でバックエンドと連携）
    setTimeout(() => {
      setIsPasswordLoading(false);
      setPasswordSuccess(true);
      // フォームをリセット
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
          プロフィール設定
        </h1>
        <p className="mt-1 text-text-secondary">
          アカウント情報の確認・変更ができます
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            プロフィール
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="h-4 w-4" />
            パスワード
          </TabsTrigger>
        </TabsList>

        {/* プロフィールタブ */}
        <TabsContent value="profile">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">基本情報</CardTitle>
              <CardDescription>
                表示名はイベント予約時などに使用されます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {profileError && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {profileError}
                  </div>
                )}

                {profileSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    プロフィールを更新しました
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled
                    className="rounded-xl bg-muted"
                  />
                  <p className="text-xs text-text-light">
                    メールアドレスの変更は管理者にお問い合わせください
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">表示名</Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="例：田中 さくら"
                    className="rounded-xl"
                    disabled={isProfileLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={isProfileLoading}
                >
                  {isProfileLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    "変更を保存"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* パスワードタブ */}
        <TabsContent value="password">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">パスワード変更</CardTitle>
              <CardDescription>
                セキュリティのため、定期的な変更をおすすめします
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {passwordError && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    パスワードを変更しました
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">現在のパスワード</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-xl pr-10"
                      disabled={isPasswordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary"
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="newPassword">新しいパスワード</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-xl pr-10"
                      disabled={isPasswordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary"
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-text-light">8文字以上で入力してください</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="rounded-xl pr-10"
                      disabled={isPasswordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      変更中...
                    </>
                  ) : (
                    "パスワードを変更"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
