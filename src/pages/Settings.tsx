import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" />
          Configurações
        </h1>
        <p className="text-muted-foreground">Gerenciar preferências do sistema</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Perfil do Usuário
          </CardTitle>
          <CardDescription>Informações da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input defaultValue="Operador Petrobras" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="operador@petrobras.com.br" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cargo</label>
              <Input defaultValue="Engenheiro Naval" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Departamento</label>
              <Input defaultValue="Operações Marítimas" />
            </div>
          </div>
          <Button>Salvar Alterações</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notificações
          </CardTitle>
          <CardDescription>Configurar alertas e avisos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Bio-Score Crítico</p>
              <p className="text-sm text-muted-foreground">Receber notificação quando Bio-Score ≥ 60%</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Lembretes de Manutenção</p>
              <p className="text-sm text-muted-foreground">Avisar sobre manutenções programadas</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Relatórios Semanais</p>
              <p className="text-sm text-muted-foreground">Enviar resumo semanal por email</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Segurança
          </CardTitle>
          <CardDescription>Proteção da conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha Atual</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nova Senha</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmar Nova Senha</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button variant="outline">Alterar Senha</Button>
        </CardContent>
      </Card>

      {/* System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Sistema
          </CardTitle>
          <CardDescription>Informações do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Versão</p>
              <p className="font-medium">ShipSense AI v1.0.0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Ambiente</p>
              <p className="font-medium">Produção</p>
            </div>
            <div>
              <p className="text-muted-foreground">Última Sincronização</p>
              <p className="font-medium">{new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Banco de Dados</p>
              <p className="font-medium">Supabase (Conectado)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Sobre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ShipSense AI é uma plataforma de monitoramento inteligente de bioincrustação 
            desenvolvida para a Petrobras/Transpetro durante o Hackathon 2025.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Utiliza inteligência artificial preditiva para otimizar a programação de limpeza de cascos, 
            reduzindo custos com combustível e emissões de CO₂.
          </p>
          <div className="mt-4 p-4 rounded-lg bg-secondary">
            <p className="text-xs text-muted-foreground">
              © 2025 ShipSense AI. Desenvolvido com Next.js, Tailwind CSS, e XGBoost.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
