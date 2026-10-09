import html
import logging
import os
import re

import resend

from app.schemas import ContactCreate

logger = logging.getLogger("ovia")

INTEREST_LABELS = {
    "consultoria": "Consultoria de TI",
    "ia": "Inteligência Artificial",
    "bi": "Relatórios e BI",
    "geral": "Conversa geral",
}

PREFERENCE_LABELS = {
    "email": "E-mail",
    "whatsapp": "WhatsApp",
}


def _phone_digits(phone: str) -> str:
    return re.sub(r"\D", "", phone)


def _whatsapp_link(phone: str) -> str | None:
    digits = _phone_digits(phone)
    if len(digits) < 10:
        return None
    if not digits.startswith("55"):
        digits = f"55{digits}"
    return f"https://wa.me/{digits}"


def build_contact_html(
    *,
    name: str,
    email: str,
    phone: str,
    company: str,
    interest: str,
    preference: str,
    message: str,
    reply_href: str,
    reply_label: str,
) -> str:
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Novo contato — OVIA Tech</title>
  </head>
  <body style="margin:0;padding:0;background-color:#040918;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#040918;background-image:radial-gradient(circle at 80% 10%,rgba(92,54,255,0.28),transparent 45%),radial-gradient(circle at 12% 0%,rgba(0,170,255,0.16),transparent 40%);">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;border-collapse:separate;">
            <tr>
              <td style="padding:0 0 20px 0;text-align:center;">
                <div style="display:inline-block;padding:10px 18px;border:1px solid rgba(46,233,255,0.35);border-radius:999px;color:#9befff;font-size:11px;letter-spacing:0.28em;font-weight:700;">
                  OVIA TECH
                </div>
              </td>
            </tr>
            <tr>
              <td style="background-color:#071022;border:1px solid rgba(46,233,255,0.18);border-radius:24px;overflow:hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:28px 28px 8px 28px;background:linear-gradient(135deg,rgba(46,233,255,0.12),rgba(124,108,255,0.18));border-bottom:1px solid rgba(46,233,255,0.12);">
                      <p style="margin:0 0 8px 0;color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">
                        Novo contato
                      </p>
                      <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.25;font-weight:700;">
                        Mensagem recebida pelo site
                      </h1>
                      <p style="margin:10px 0 0 0;color:#94a3b8;font-size:14px;line-height:1.5;">
                        Um lead acabou de enviar o formulário da OVIA Tech.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 28px 8px 28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding:0 0 14px 0;">
                            <p style="margin:0 0 4px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Nome</p>
                            <p style="margin:0;color:#e8eefc;font-size:16px;line-height:1.4;">{name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 14px 0;">
                            <p style="margin:0 0 4px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">E-mail</p>
                            <p style="margin:0;"><a href="mailto:{email}" style="color:#2ee9ff;font-size:16px;line-height:1.4;text-decoration:none;">{email}</a></p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 14px 0;">
                            <p style="margin:0 0 4px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Telefone</p>
                            <p style="margin:0;color:#e8eefc;font-size:16px;line-height:1.4;">{phone}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 14px 0;">
                            <p style="margin:0 0 4px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Empresa</p>
                            <p style="margin:0;color:#e8eefc;font-size:16px;line-height:1.4;">{company}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 14px 0;">
                            <p style="margin:0 0 8px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Preferência de contato</p>
                            <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(124,108,255,0.16);border:1px solid rgba(168,139,250,0.4);color:#d8b4fe;font-size:13px;font-weight:700;">
                              {preference}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 8px 0;">
                            <p style="margin:0 0 8px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Interesse</p>
                            <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(46,233,255,0.12);border:1px solid rgba(46,233,255,0.35);color:#9befff;font-size:13px;font-weight:700;">
                              {interest}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#040918;border:1px solid rgba(140,180,255,0.12);border-radius:16px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0 0 10px 0;color:#67e8f9;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Mensagem</p>
                            <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.6;">{message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 28px 28px 28px;">
                      <a href="{reply_href}" style="display:inline-block;padding:12px 20px;border-radius:999px;background-color:#2ee9ff;color:#041018;font-size:14px;font-weight:700;text-decoration:none;">
                        {reply_label}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 8px 0 8px;text-align:center;">
                <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">
                  Tecnologia · Inteligência · Resultados<br />
                  Este e-mail foi gerado automaticamente pelo formulário do site.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""


def send_contact_email(payload: ContactCreate) -> None:
    api_key = os.getenv("RESEND_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("RESEND_API_KEY não configurada.")

    to_email = os.getenv("CONTACT_TO_EMAIL", "oviatechsolutions@gmail.com").strip()
    from_email = os.getenv(
        "CONTACT_FROM_EMAIL",
        "OVIA Tech <onboarding@resend.dev>",
    ).strip()

    interest = INTEREST_LABELS.get(payload.interest, payload.interest)
    preference = PREFERENCE_LABELS.get(payload.contact_preference, payload.contact_preference)
    company = payload.company or "Não informado"
    safe_name = html.escape(payload.name)
    safe_email = html.escape(str(payload.email))
    safe_phone = html.escape(payload.phone)
    safe_company = html.escape(company)
    safe_interest = html.escape(interest)
    safe_preference = html.escape(preference)
    safe_message = html.escape(payload.message).replace("\n", "<br>")

    whatsapp = _whatsapp_link(payload.phone)
    if payload.contact_preference == "whatsapp" and whatsapp:
        reply_href = html.escape(whatsapp, quote=True)
        reply_label = "Abrir WhatsApp"
    else:
        reply_href = f"mailto:{safe_email}"
        reply_label = "Responder por e-mail"

    resend.api_key = api_key
    result = resend.Emails.send(
        {
            "from": from_email,
            "to": [to_email],
            "reply_to": str(payload.email),
            "subject": f"Novo contato pelo site — {payload.name}",
            "html": build_contact_html(
                name=safe_name,
                email=safe_email,
                phone=safe_phone,
                company=safe_company,
                interest=safe_interest,
                preference=safe_preference,
                message=safe_message,
                reply_href=reply_href,
                reply_label=reply_label,
            ),
            "text": (
                f"Novo contato pelo site da OVIA Tech\n\n"
                f"Nome: {payload.name}\n"
                f"E-mail: {payload.email}\n"
                f"Telefone: {payload.phone}\n"
                f"Empresa: {company}\n"
                f"Preferência de contato: {preference}\n"
                f"Interesse: {interest}\n\n"
                f"Mensagem:\n{payload.message}"
            ),
        }
    )
    email_id = result["id"] if isinstance(result, dict) else getattr(result, "id", result)
    logger.info("e-mail de contato enviado id=%s", email_id)
