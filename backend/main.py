import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)
MODEL = os.getenv("GROQ_MODEL")

COMPANY_INFO = """
Name: Devansh Insurance Broking LLP
Tagline: Built on Trust, Clarity & Claim Readiness
LLPIN: ACH-8744
Type: Limited Liability Partnership
Incorporated: 20 June 2024
Registrar: ROC Bangalore
Status: Active
Designated Partner: Vasanthraj Dheeraj
Address: 332-39, 58th Cross, 3rd Block, Rajajinagar, Bangalore North, Karnataka 560010
Team size: 11-50 employees
Revenue band: Below Rs. 10 Cr (FY ending 31 Mar 2025)
About: Insurance advisory firm helping individuals, families and businesses
make informed insurance decisions with confidence.
Values: Trust, Clarity, Claim Ready, Growth Focused
Products: Motor Insurance, Health Insurance, Business Insurance
"""

SYSTEM_PROMPT = f"""You are the Q&A assistant for Devansh Insurance Broking LLP.
Answer ONLY using the company information below. Keep answers short and friendly.
If the answer is not in the information, say you don't have that detail
and suggest contacting the company.

{COMPANY_INFO}"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "system", "content": SYSTEM_PROMPT}]
            + [m.model_dump() for m in req.messages],
            temperature=0.3,
        )

        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
