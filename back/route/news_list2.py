from fastapi import APIRouter, HTTPException
import main 
from bson import ObjectId
from pydantic import BaseModel, Field

router = APIRouter(
    prefix="/api/news/list",
    tags= ['news']
)

news_collection = main.news

class News(BaseModel):
    title: str
    date: str
    media: str
    link: str
    summary: str
    cls_results: str
    
def news_list_serializer(news) -> dict:
    return {
        "id" : str(news["_id"]),
        "title": news["title"],
        "date" : news["date"],
        "summary": news["summary"],
        "img": news["img"],
        "like": news["like"],
        "views": news["views"],
    }
    
@router.get('/{page}')
def get_news_detail(page:int = 1):
    newsList = list(news_collection.find())
    newsList = [news_list_serializer(news) for news in newsList]
    return newsList