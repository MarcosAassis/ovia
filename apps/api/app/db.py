import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


def database_path() -> Path:
    path = Path(os.getenv("DATABASE_PATH", "data/ovia.db"))
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def connect() -> sqlite3.Connection:
    connection = sqlite3.connect(database_path())
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    connection = connect()
    try:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company TEXT,
                interest TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.commit()
    finally:
        connection.close()


def insert_contact(
    *,
    name: str,
    email: str,
    company: str | None,
    interest: str,
    message: str,
) -> int:
    connection = connect()
    try:
        cursor = connection.execute(
            """
            INSERT INTO contacts (name, email, company, interest, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                name,
                email,
                company,
                interest,
                message,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        connection.commit()
        if cursor.lastrowid is None:
            raise sqlite3.Error("insert sem id")
        return int(cursor.lastrowid)
    finally:
        connection.close()
