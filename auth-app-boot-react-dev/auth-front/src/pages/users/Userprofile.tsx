import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import useAuth from "@/auth/store";
import { useState, useRef } from "react";

function Userprofile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useAuth((state) => state.user);
  const accessToken = useAuth((state) => state.accessToken);
  const logout = useAuth((state) => state.logout);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  // ─── Change Picture ────────────────────────────────────────────
  const handleChangePicture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    // Upload
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/v1/users/${user?.id}/upload-image`, {
        method: "POST",
        headers: authHeaders,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");
      const data = await res.json();
      setPreviewImage(data.imageUrl);
      showMessage("Profile picture updated!", "success");
    } catch {
      showMessage("Failed to upload image. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Edit Profile ──────────────────────────────────────────────
  const handleEditClick = () => {
    setEditedName(user?.name || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      showMessage("Name cannot be empty!", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/users/${user?.id}`, {
        method: "PUT",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: editedName }),
      });
      if (!res.ok) throw new Error("Failed to update");
      showMessage("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch {
      showMessage("Failed to update profile. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Change Password ───────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showMessage("Please fill all password fields!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("New passwords do not match!", "error");
      return;
    }
    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters!", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/users/${user?.id}/change-password`, {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (!res.ok) throw new Error("Failed");
      showMessage("Password changed successfully!", "success");
      setShowChangePassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      showMessage("Failed to change password. Check old password.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete Account ────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure? This action is permanent and cannot be undone!"
    );
    if (!confirmed) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/users/${user?.id}`, {
        method: "DELETE",
        headers: authHeaders,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      logout();
    } catch {
      showMessage("Failed to delete account. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        User Profile
      </motion.h1>

      {message && (
        <div className={`text-center py-2 px-4 rounded-xl text-sm font-medium ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <Card className="rounded-2xl shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-28 h-28 border shadow-md">
              <AvatarImage src={previewImage || user?.image || "https://api.dicebear.com/7.x/thumbs/svg?seed=user"} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              variant="outline"
              className="rounded-xl px-5"
              onClick={handleChangePicture}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Change Picture"}
            </Button>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={isEditing ? editedName : user?.name}
                readOnly={!isEditing}
                onChange={(e) => setEditedName(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email} readOnly className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Input id="provider" value={user?.provider} readOnly className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enabled">Enabled</Label>
              <Input id="enabled" value={user?.enabled ? "Yes" : "No"} readOnly className="rounded-xl" />
            </div>
          </div>

          {!isEditing ? (
            <Button onClick={handleEditClick} className="w-full rounded-2xl mt-4 text-lg">
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="rounded-2xl w-full" onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button className="rounded-2xl w-full" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full rounded-xl py-3 text-base"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            {showChangePassword ? "Cancel" : "Change Password"}
          </Button>

          {showChangePassword && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 border rounded-2xl p-4"
            >
              <div className="space-y-1">
                <Label>Old Password</Label>
                <Input type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-xl" />
              </div>
              <Button className="w-full rounded-xl" onClick={handleChangePassword} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </motion.div>
          )}

          <Button variant="destructive" className="w-full rounded-xl py-3 text-base" onClick={handleDeleteAccount} disabled={loading}>
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Userprofile;