from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

Interest = Literal["consultoria", "ia", "bi", "geral"]
ContactPreference = Literal["email", "whatsapp"]


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=30)
    company: str | None = Field(default=None, max_length=160)
    interest: Interest = "geral"
    contact_preference: ContactPreference = "email"
    message: str = Field(min_length=10, max_length=4000)
    website: str | None = Field(default=None, max_length=200)

    @field_validator("company", "website", mode="before")
    @classmethod
    def blank_to_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, value: str) -> str:
        digits = "".join(char for char in value if char.isdigit())
        if len(digits) < 10:
            raise ValueError("Telefone inválido.")
        return value.strip()

    @model_validator(mode="after")
    def require_phone_for_whatsapp(self) -> "ContactCreate":
        digits = "".join(char for char in self.phone if char.isdigit())
        if self.contact_preference == "whatsapp" and len(digits) < 10:
            raise ValueError("Informe um telefone válido para contato por WhatsApp.")
        return self


class ContactResponse(BaseModel):
    id: int
    detail: str


class HealthResponse(BaseModel):
    status: str
