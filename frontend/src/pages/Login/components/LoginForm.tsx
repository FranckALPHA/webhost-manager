import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
  onForgotPassword?: () => void;
}

export const LoginForm = ({ onLogin, onForgotPassword }: LoginFormProps = {}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    setError("");
    onLogin?.(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-foreground">
          Identifiant
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="admin ou agent1"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="pl-10 h-[55px] rounded-[7.5px]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="pl-10 h-[55px] rounded-[7.5px]"
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-[56px] rounded-[8px] text-base font-semibold">
        Se connecter
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Mot de passe oublié ?{" "}
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={onForgotPassword}
        >
          Réinitialiser
        </button>
      </p>
    </form>
  );
};
