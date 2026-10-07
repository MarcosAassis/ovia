import logging
import os
from contextlib import asynccontextmanager

import sqlite3
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.db import init_db, insert_contact
from app.schemas import ContactCreate, ContactResponse, HealthResponse

logger = logging.getLogger("ovia")

RECEIVED = "Mensagem recebida. Em breve um especialista entra em contato."


@asynccontextmanager
async def lifespan(_app: FastAPI):
    logging.basicConfig(level=logging.INFO)
    init_db()
    yield


app = FastAPI(title="OVIA Tech API", version="1.0.0", lifespan=lifespan)

origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_handler(_request: Request, _exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={"detail": "Verifique os campos e tente novamente."},
    )


def require_api_key(request: Request) -> None:
    expected = os.getenv("API_KEY", "").strip()
    if not expected:
        return
    if request.headers.get("x-api-key") != expected:
        raise HTTPException(status_code=401, detail="Não autorizado.")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.post("/contacts", response_model=ContactResponse, status_code=201)
def create_contact(payload: ContactCreate, request: Request) -> ContactResponse:
    require_api_key(request)

    if payload.website:
        logger.info("contato descartado pelo campo de proteção")
        return ContactResponse(id=0, detail=RECEIVED)

    try:
        contact_id = insert_contact(
            name=payload.name,
            email=str(payload.email),
            company=payload.company,
            interest=payload.interest,
            message=payload.message,
        )
    except sqlite3.Error:
        logger.exception("falha ao gravar contato")
        raise HTTPException(
            status_code=500,
            detail="Não foi possível registrar sua mensagem.",
        ) from None

    logger.info("contato registrado id=%s", contact_id)
    return ContactResponse(id=contact_id, detail=RECEIVED)
