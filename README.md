# OVIA Tech

Site da OVIA Tech com frontend em Next.js (Vercel) e API em Python (Render, via Docker).

```text
apps/web   Next.js — publicado na Vercel
apps/api   FastAPI — imagem Docker publicada no Render
```

O formulário de contato envia para `/api/contact` no Next.js. Essa rota encaminha o pedido para a API Python, que grava o contato e dispara um e-mail pelo Resend para `oviatechsolutions@gmail.com`. A chave da API, quando existir, fica só no servidor.

## Local

API:

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Com Docker:

```bash
docker compose up --build
```

Frontend, em outro terminal:

```bash
cd apps/web
npm install
npm run dev
```

Abra http://localhost:3000. A API responde em http://localhost:8000/health.

## Vercel

- Root Directory: `apps/web`
- Variável `API_URL`: URL pública da API no Render, por exemplo `https://ovia-api.onrender.com`
- Variável `API_KEY`: o mesmo valor configurado no Render, se você usar chave

`API_URL` entra no build e no runtime do servidor Next. Não use o prefixo `NEXT_PUBLIC_`.

## Render

O arquivo `render.yaml` descreve o serviço Docker. Na criação do serviço, aponte o Dockerfile para `apps/api/Dockerfile` e o contexto para `apps/api`.

Defina `API_KEY` com um valor longo e aleatório. Sem essa variável, a API aceita contatos sem chave — útil na máquina local, inadequado em produção.

Defina também `RESEND_API_KEY` com a chave do Resend. O destino padrão é `CONTACT_TO_EMAIL=oviatechsolutions@gmail.com`. Com conta nova, o remetente pode ser `OVIA Tech <onboarding@resend.dev>`; depois de verificar o domínio, troque `CONTACT_FROM_EMAIL`.

`DATABASE_PATH` aponta para um SQLite. No plano sem disco persistente, os contatos se perdem quando o serviço reinicia. Para guardar de verdade, troque depois por Postgres no Render.
