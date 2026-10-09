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


def _ensure_column(connection: sqlite3.Connection, column: str, definition: str) -> None:
    existing = {row["name"] for row in connection.execute("PRAGMA table_info(contacts)")}
    if column not in existing:
        connection.execute(f"ALTER TABLE contacts ADD COLUMN {column} {definition}")


def init_db() -> None:
    connection = connect()
    try:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                company TEXT,
                interest TEXT NOT NULL,
                contact_preference TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        _ensure_column(connection, "phone", "TEXT")
        _ensure_column(connection, "contact_preference", "TEXT")
        connection.commit()
    finally:
        connection.close()


def insert_contact(
    *,
    name: str,
    email: str,
    phone: str,
    company: str | None,
    interest: str,
    contact_preference: str,
    message: str,
) -> int:
    connection = connect()
    try:
        cursor = connection.execute(
            """
            INSERT INTO contacts (
                name, email, phone, company, interest, contact_preference, message, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                name,
                email,
                phone,
                company,
                interest,
                contact_preference,
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
