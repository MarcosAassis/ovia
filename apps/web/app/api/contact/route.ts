const RECEIVED = "Mensagem recebida. Em breve um especialista entra em contato.";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ detail: "Envie os dados em JSON." }, { status: 400 });
  }

  const apiUrl = process.env.API_URL ?? "http://localhost:8000";
  const apiKey = process.env.API_KEY?.trim();

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-Api-Key": apiKey } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(60_000),
    });

    const data: unknown = await response.json().catch(() => ({ detail: RECEIVED }));
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { detail: "Não foi possível enviar agora. Tente novamente em instantes." },
      { status: 502 },
    );
  }
}
