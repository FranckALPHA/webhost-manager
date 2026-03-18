import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { LoginForm } from "./components/LoginForm";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (username: string, password: string) => {
    try {
      await api.auth.login(username, password);
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur WebHostManager",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Identifiants invalides",
      });
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement password reset logic
    console.log("Password reset requested");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-[512px] p-6">
        <div className="rounded-[42px] bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-3 mb-8">
            <div className="flex h-[61px] w-[61px] items-center justify-center rounded-[10.95px] bg-primary">
              <Globe className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-[34.82px] font-bold text-foreground">WebHostManager</h1>
            <p className="text-sm text-muted-foreground">Connectez-vous à votre compte</p>
          </div>

          <LoginForm onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
        </div>
      </div>
    </div>
  );
};

export default Login;
