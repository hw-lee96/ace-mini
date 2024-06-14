from fastapi import APIRouter
from main import db
from save_DB.save_db_main import save_main


router = APIRouter(
    prefix="/test",
)



@router.get("/save/companies")
async def add_company() :
    company_db = db['company']

    path = 'C:\\ace-mini\\back\\save_DB\\log\\company_list.txt'
    i=1
    # company_list = []
    with open(path, encoding="utf-8") as f:
        lines =  f.readlines()
    
        for line_orig in lines :
            one_line = line_orig .strip()

            separate_line = one_line.split()

            company_name = str.strip(separate_line[0])
            company_code =str.strip(separate_line[1])
            
            company = {
                'comany_name' : company_name,
                'compan_code' : company_code
            }
            company_db.insert_one(company)
            print(i)
            i +=1


    return 2

@router.get("/save/articls")
async def add() : 

    news = db['news']

    
    articls = save_main()
    i = 1
    for article in articls:
        new_article = {
            "id" : str(news["_id"]),
            'company_code':article['company_code'],
            'company_name':article['company_name'],
            'date': article['date'],
            'media': article['media'],
            'title': article['title'],
            'link': article['link'],
            'content': article['content'],
            'img': article['img'],
            'summary': article['summary'],
            'cls_results': article['cls_results'],
            'result': article['result'],
            'like':article['like'],
            'views':article['views'],
            'reg_user':'admin'
        }
        
        news.insert_one(new_article)
        print(i)
        i+=1
     
  

    return 2