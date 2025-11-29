import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Ship, Fuel, Calendar, Anchor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ships } from "@/data/ships";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Ship, label: "Status da frota", prompt: "Qual é o status atual da frota?" },
  { icon: Fuel, label: "Consumo de combustível", prompt: "Qual é o impacto da bioincrustação no consumo de combustível?" },
  { icon: Calendar, label: "Próximas manutenções", prompt: "Quais são as próximas manutenções programadas?" },
  { icon: Anchor, label: "Embarcações críticas", prompt: "Quais embarcações estão em estado crítico?" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Olá! 👋 Sou o assistente **ShipSense AI**, especializado em análise de bioincrustação marítima.

Posso ajudá-lo com:
- **Análise da frota**: Status e localização das embarcações
- **Previsões de bioincrustação**: Níveis atuais e projeções
- **Recomendações de limpeza**: Momento ideal para manutenção
- **Impacto econômico**: Custos de combustível e economia potencial
- **Relatórios**: Geração de análises detalhadas

Como posso ajudá-lo hoje?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('status') || lowerMessage.includes('frota')) {
      const navigating = ships.filter(s => s.status === 'navigating').length;
      const inPort = ships.filter(s => s.status === 'port').length;
      const maintenance = ships.filter(s => s.status === 'maintenance').length;
      return `📊 **Status Atual da Frota**

A Transpetro opera atualmente **${ships.length} embarcações**:

- 🚢 **${navigating} navegando** - Em operação no momento
- ⚓ **${inPort} no porto** - Aguardando carga/descarga
- 🔧 **${maintenance} em manutenção** - Realizando serviços

**Bio-Score médio**: ${Math.round(ships.reduce((sum, s) => sum + s.bioScore, 0) / ships.length)}%
**Penalidade média de combustível**: +${(ships.reduce((sum, s) => sum + s.fuelPenalty, 0) / ships.length).toFixed(1)}%

Deseja mais detalhes sobre alguma embarcação específica?`;
    }
    
    if (lowerMessage.includes('crítico') || lowerMessage.includes('critico') || lowerMessage.includes('alerta')) {
      const critical = ships.filter(s => s.bioScore >= 60);
      if (critical.length === 0) {
        return `✅ **Excelente notícia!**

Não há embarcações em estado crítico no momento. Todas estão operando dentro dos parâmetros aceitáveis de bioincrustação.

Recomendo manter o monitoramento regular para garantir a eficiência da frota.`;
      }
      return `⚠️ **Embarcações em Estado Crítico** (Bio-Score ≥ 60%)

${critical.map(s => `- **${s.name}** (${s.sigla}): Bio-Score ${s.bioScore}%, penalidade +${s.fuelPenalty}%`).join('\n')}

**Recomendação**: Essas embarcações devem ser priorizadas para limpeza IWS ou docagem. O custo adicional de combustível justifica a intervenção imediata.

Posso gerar um relatório detalhado para essas embarcações?`;
    }
    
    if (lowerMessage.includes('combustível') || lowerMessage.includes('combustivel') || lowerMessage.includes('consumo')) {
      const avgPenalty = (ships.reduce((sum, s) => sum + s.fuelPenalty, 0) / ships.length).toFixed(1);
      return `⛽ **Análise de Consumo de Combustível**

A bioincrustação causa um aumento significativo no consumo de combustível da frota:

- **Penalidade média**: +${avgPenalty}%
- **Custo extra estimado**: R$ 12.4 milhões/ano
- **CO₂ adicional**: ~8.500 toneladas/ano

**Top 3 embarcações com maior impacto:**
${ships.sort((a, b) => b.fuelPenalty - a.fuelPenalty).slice(0, 3).map((s, i) => `${i + 1}. ${s.name}: +${s.fuelPenalty}%`).join('\n')}

💡 **Potencial de economia**: Com limpeza otimizada pelo ShipSense AI, é possível reduzir esses custos em até **60%**.`;
    }
    
    if (lowerMessage.includes('manutenção') || lowerMessage.includes('manutencao') || lowerMessage.includes('limpeza') || lowerMessage.includes('próxima')) {
      const upcoming = ships
        .sort((a, b) => new Date(a.nextScheduledCleaning).getTime() - new Date(b.nextScheduledCleaning).getTime())
        .slice(0, 5);
      return `📅 **Próximas Limpezas Programadas**

${upcoming.map(s => {
  const days = Math.ceil((new Date(s.nextScheduledCleaning).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return `- **${s.name}**: ${new Date(s.nextScheduledCleaning).toLocaleDateString('pt-BR')} (${days > 0 ? `${days} dias` : 'VENCIDA'})`;
}).join('\n')}

⚠️ Embarcações com Bio-Score alto devem ter a limpeza antecipada para evitar custos adicionais.

Posso simular o impacto econômico de antecipar alguma dessas limpezas?`;
    }

    if (lowerMessage.includes('relatório') || lowerMessage.includes('relatorio') || lowerMessage.includes('gerar')) {
      return `📋 **Geração de Relatório**

Posso gerar os seguintes tipos de relatório:

1. **Relatório de Status da Frota** - Visão geral de todas as embarcações
2. **Relatório de Bioincrustação** - Análise detalhada de Bio-Score
3. **Relatório de Custos** - Impacto econômico e projeções
4. **Relatório de Manutenção** - Histórico e programação
5. **Relatório Ambiental** - Emissões de CO₂ e sustentabilidade

Qual relatório você gostaria de gerar?`;
    }
    
    return `Entendi sua pergunta sobre "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}".

Para fornecer uma análise mais precisa, posso consultar os dados da frota da Transpetro. Aqui estão algumas informações que posso oferecer:

- 📊 Status e localização das embarcações
- 📈 Níveis de bioincrustação (Bio-Score)
- ⛽ Impacto no consumo de combustível
- 📅 Programação de manutenções
- 💰 Análise de custos

Gostaria que eu aprofundasse em algum desses tópicos?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = generateResponse(input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="p-6 h-[calc(100vh-24px)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Assistente ShipSense AI
        </h1>
        <p className="text-muted-foreground">Chatbot inteligente para análise de bioincrustação</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="flex-1 flex flex-col p-4 min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <div className="prose prose-sm prose-invert max-w-none">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ 
                          __html: line
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }} />
                      ))}
                    </div>
                    <p className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-ocean/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-ocean" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="mt-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua pergunta..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="w-72 space-y-4 hidden lg:block">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
                >
                  <action.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Sobre o Assistente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                O ShipSense AI utiliza inteligência artificial para analisar dados de bioincrustação 
                e fornecer recomendações precisas para otimização da frota.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-primary font-medium">
                  ⚡ Modelo: GPT-4o-mini
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Treinado com dados da Petrobras/Transpetro
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
