from datetime import datetime
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse

from services.database import JSONDatabase

app = FastAPI()


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> Quote:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)

    quote = Quote(name=name, message=message, time=now.isoformat())
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return quote


@app.get("/quotes")
def get_quotes(max_age: int) -> list[Quote]:
    """
    Retrieve quotes based on max age in seconds.
    If max_age is negative, return all quotes.
    """

    if max_age < 0:
        return database["quotes"]

    now = datetime.now().replace(microsecond=0)

    selected_quotes = []

    for quote in database["quotes"]:
        if now.timestamp() - datetime.fromisoformat(quote["time"]).timestamp() <= max_age:
            selected_quotes.append(quote)

    return selected_quotes
