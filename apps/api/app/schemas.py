from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

Interest = Literal["consultoria", "ia", "bi", "geral"]


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    interest: Interest = "geral"
    message: str = Field(min_length=10, max_length=4000)
    website: str | None = Field(default=None, max_length=200)

    @field_validator("company", "website", mode="before")
    @classmethod
    def blank_to_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value


class ContactResponse(BaseModel):
    id: int
    detail: str


class HealthResponse(BaseModel):
    status: str
