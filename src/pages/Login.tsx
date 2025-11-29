import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Anchor, Ship, Waves, BarChart3, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Preencha todos os campos");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-moss-dark/20" />
        
        {/* Animated waves background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="hsl(var(--moss))" fillOpacity="0.5" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
                M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,234.7C672,203,768,149,864,138.7C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "/>
            </path>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Logo size="lg" />
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Monitoramento Inteligente<br />
                <span className="gradient-text-moss">de Bioincrustação</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Plataforma de IA preditiva para otimização de limpeza de cascos, 
                redução de custos com combustível e minimização de emissões de CO₂.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FeatureCard 
                icon={<BarChart3 className="w-5 h-5" />}
                title="Análise Preditiva"
                description="IA que prevê níveis de incrustação"
              />
              <FeatureCard 
                icon={<Ship className="w-5 h-5" />}
                title="Rastreamento em Tempo Real"
                description="Localização de toda a frota"
              />
              <FeatureCard 
                icon={<Waves className="w-5 h-5" />}
                title="Economia de Combustível"
                description="Redução de até 40% nos custos"
              />
              <FeatureCard 
                icon={<Shield className="w-5 h-5" />}
                title="Sustentabilidade"
                description="Menor emissão de CO₂"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Desenvolvido para</span>
            <span className="font-semibold text-foreground">Petrobras/Transpetro</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="seu.email@petrobras.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Senha</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border bg-secondary" />
                    <span className="text-muted-foreground">Lembrar de mim</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Esqueci a senha
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    "Entrar no Sistema"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Demo: use qualquer email e senha para entrar</p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            © 2025 ShipSense AI. Hackathon Petrobras/Transpetro.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-card/30 border border-border/30 backdrop-blur">
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
