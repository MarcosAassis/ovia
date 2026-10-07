"use client";

import { FormEvent, useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { useSearchParams } from "next/navigation";
import { interests, site, whatsappLink, whatsappUrl, type Interest } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70";

export function Contact() {
  const params = useSearchParams();
  const preset = params.get("interesse");
  const [interest, setInterest] = useState<Interest>("geral");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (interests.some((item) => item.value === preset)) {
      setInterest(preset as Interest);
    }
  }, [preset]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      interest,
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const error = validate(payload);
    if (error) {
      setStatus("error");
      setFeedback(error);
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as { detail?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setFeedback(body?.detail ?? "Não foi possível enviar. Tente novamente.");
        return;
      }
      setStatus("success");
      setFeedback(body?.detail ?? "Mensagem recebida. Em breve um especialista entra em contato.");
      form.reset();
      setInterest("geral");
    } catch {
      setStatus("error");
      setFeedback("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  return (
    <section id="contato" className="scroll-mt-24 border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-cyan-300">CONTATO</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Agende uma conversa com um especialista.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            Conte o cenário da operação. Retornamos com um caminho objetivo para consultoria de TI, inteligência
            artificial ou relatórios.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            {whatsappUrl() ? (
              <a
                {...whatsappLink()}
                className="inline-flex items-center gap-2 rounded-full bg-[#2ee9ff] px-5 py-3 text-sm font-semibold text-[#041018] transition hover:bg-[#8ff6ff]"
              >
                <WhatsAppIcon />
                Chamar no WhatsApp
              </a>
            ) : null}
            <a href={`mailto:${site.email}`} className="text-sm text-cyan-200 hover:text-white">
              {site.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative rounded-3xl border border-cyan-300/15 bg-[#071022]/80 p-6 sm:p-8"
          noValidate
        >
          {status === "success" ? (
            <div className="grid gap-4">
              <p className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-5 text-sm leading-relaxed text-cyan-50" role="status">
                {feedback}
              </p>
              <button
                type="button"
                className="text-sm text-cyan-200 underline-offset-4 hover:underline"
                onClick={() => {
                  setStatus("idle");
                  setFeedback("");
                }}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Nome
                <input name="name" autoComplete="name" className={inputClass} placeholder="Seu nome" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-300">
                  E-mail
                  <input name="email" type="email" autoComplete="email" className={inputClass} placeholder="voce@empresa.com" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Empresa
                  <input name="company" autoComplete="organization" className={inputClass} placeholder="Opcional" />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-slate-300">
                Interesse
                <select
                  name="interest"
                  value={interest}
                  onChange={(event) => setInterest(event.target.value as Interest)}
                  className={inputClass}
                >
                  {interests.map((item) => (
                    <option key={item.value} value={item.value} className="bg-[#071022]">
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Mensagem
                <textarea name="message" rows={5} className={inputClass} placeholder="O que você quer resolver?" />
              </label>
              <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden>
                <label>
                  Site
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {status === "error" ? (
                <p className="text-sm text-rose-300" role="alert">
                  {feedback}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-full bg-[#2ee9ff] px-5 py-3 text-sm font-semibold text-[#041018] transition hover:bg-[#8ff6ff] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensagem"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function validate(payload: { name: string; email: string; message: string }) {
  if (payload.name.trim().length < 2) return "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) return "Informe um e-mail válido.";
  if (payload.message.trim().length < 10) return "A mensagem precisa ter pelo menos 10 caracteres.";
  return null;
}
