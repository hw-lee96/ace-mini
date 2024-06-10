from fastapi import FastAPI, Request, Depends, Form, status
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.get('/')
async def home(request: Request):
    return { 'message': 'success' }

# news api example
from newsapi import NewsApiClient
@app.get('/news/')
async def get_news(question: str):
    # Init
    newsapi = NewsApiClient(api_key='c161ea8b106b43d5884f93dd0ee2910f')

    # /v2/top-headlines
    top_headlines = newsapi.get_top_headlines(q=question, category='business')

    # /v2/everything
    # all_articles = newsapi.get_everything(q=question, sources='bbc-news,the-verge', domains='bbc.co.uk,techcrunch.com', from_param='2017-12-01', to='2017-12-12', language='en', sort_by='relevancy', page=2)

    # /v2/top-headlines/sources
    # sources = newsapi.get_sources()
    return { 'top_headlines': top_headlines }

