from fastapi import APIRouter

router = APIRouter(
    prefix="/api/news",
)

@router.get("/detail")
def get_news_detail():
    return [{'test': 'test list '}]