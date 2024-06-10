from fastapi import FastAPI, Request, Depends, Form, status
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.get('/')
async def home(request: Request):
    return { 'message': 'success' }