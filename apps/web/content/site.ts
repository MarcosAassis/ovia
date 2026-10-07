export const site = {
  name: "OVIA Tech",
  email: "contato@ovia.tech",
  // WhatsApp da empresa, com DDI e DDD, só números. Exemplo: 5511987654321
  whatsappNumber: "5531991738659",
  description:
    "Consultoria de TI, Inteligência Artificial e relatórios empresariais para acelerar resultados e simplificar a gestão.",
};

const whatsappMessage = "Olá, vim pelo site da OVIA Tech e quero falar com um especialista.";

export function whatsappUrl(text = whatsappMessage) {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 12) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function whatsappLink(text?: string): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  const href = whatsappUrl(text);
  if (!href) return { href: "#contato" };
  return { href, target: "_blank", rel: "noopener noreferrer" };
}

export const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#insights", label: "Insights" },
  { href: "#contato", label: "Contato" },
] as const;

export const interests = [
  { value: "consultoria", label: "Consultoria de TI" },
  { value: "ia", label: "Inteligência Artificial" },
  { value: "bi", label: "Relatórios e BI" },
  { value: "geral", label: "Conversa geral" },
] as const;

export type Interest = (typeof interests)[number]["value"];

export const solutions = [
  {
    title: "Consultoria de TI",
    interest: "consultoria" as Interest,
    description:
      "Modernize sua infraestrutura, aumente a segurança e garanta a escalabilidade do seu negócio.",
    icon: "cloud",
  },
  {
    title: "Inteligência Artificial",
    interest: "ia" as Interest,
    description:
      "Automatize processos, extraia insights e crie novas oportunidades com o poder da IA.",
    icon: "brain",
  },
  {
    title: "Relatórios e BI",
    interest: "bi" as Interest,
    description:
      "Visualize o que importa, com dados confiáveis e dashboards que facilitam a tomada de decisão.",
    icon: "chart",
  },
] as const;

export const pillars = [
  {
    title: "Estratégia",
    description: "Planejamento de tecnologia alinhado ao seu negócio.",
    icon: "target",
  },
  {
    title: "Automação",
    description: "Processos mais eficientes, menos esforço humano.",
    icon: "gear",
  },
  {
    title: "Decisões orientadas por dados",
    description: "Mais previsibilidade, mais resultados.",
    icon: "chart",
  },
] as const;

export const steps = [
  {
    title: "Diagnóstico",
    description: "Mapeamos a operação, os sistemas atuais e o resultado que o negócio precisa ver.",
  },
  {
    title: "Arquitetura",
    description: "Desenhamos a solução com segurança, integração e espaço para crescer.",
  },
  {
    title: "Entrega",
    description: "Implantamos com o seu time, medimos o uso e ajustamos o que não gera clareza.",
  },
] as const;

export const insights = [
  {
    tag: "Infraestrutura",
    title: "Como modernizar a TI sem parar a operação",
    excerpt:
      "Trocar sistema de uma vez costuma custar mais do que evoluir em etapas, com um plano de risco e um dono para cada frente.",
  },
  {
    tag: "Inteligência artificial",
    title: "Onde a IA devolve tempo já no primeiro ciclo",
    excerpt:
      "O retorno aparece primeiro em tarefas repetitivas e bem definidas: triagem, leitura de documentos e respostas internas.",
  },
  {
    tag: "Dados",
    title: "Dashboards que a diretoria realmente abre",
    excerpt:
      "Um painel útil cabe em uma decisão. Indicador demais vira ruído; a pergunta certa reduz o relatório ao que muda a semana.",
  },
] as const;
