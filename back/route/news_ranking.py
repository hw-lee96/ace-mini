from fastapi import APIRouter
from pymongo import DESCENDING
from main import db


router = APIRouter(
    prefix="/api/news",
    tags= ['news ranking']
)

news_data = db['news']

@router.get("/ranking/like/")
async def get_most_liked_news():
    cursor = news_data.find({}, {"title": 1, "summary": 1, "date": 1, "img": 1, "like": 1}).sort("like", DESCENDING).limit(5)

    most_liked_news_data = [
            {**doc, '_id': str(doc['_id'])} for doc in cursor
        ]
    return most_liked_news_data

@router.get("/ranking/view/")
async def get_most_viewed_news():
    cursor = news_data.find({}, {"title": 1, "summary": 1, "date": 1, "img": 1, "views": 1}).sort("views", DESCENDING).limit(5)

    most_viewed_news_data = [
            {**doc, '_id': str(doc['_id'])} for doc in cursor
        ]
    return most_viewed_news_data