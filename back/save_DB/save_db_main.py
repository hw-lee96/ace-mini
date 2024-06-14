from save_DB import croll
from save_DB import cls_model
from save_DB import croll_detail
from save_DB import smr_model
from datetime import datetime
from stock_news_crawler import convert_to_code

def save_main():
    input("="*50+"\n"+"실시간 뉴스기사 다운받기."+"\n"+" 시작하시려면 Enter를 눌러주세요."+"\n"+"="*50)
    
    company = input("종목 이름이나 코드 입력: ")     
    maxpage = input("최대 뉴스 페이지 수 입력: ")
    start_date = input("시작 날짜 (YYYY-MM-DD): ")
    end_date = input("종료 날짜 (YYYY-MM-DD): ")

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
    except ValueError:
        print("올바른 날짜 형식(YYYY-MM-DD)으로 입력하세요.")
        return None

    # convert_to_code 함수 호출 시 시작 날짜와 종료 날짜 추가 전달
    articles = croll.convert_to_code(company, maxpage, start_date, end_date)

    if not articles:
        print("뉴스 데이터를 가져오지 못했습니다.")
        return None

    # 원본 데이터 articles 배열 안에 딕셔너리(data, media title, link )로 구성
    pre_articles = articles

    # content, img_src 추가 후 데이터 (content, img) 추가 된 데이터
    after_articles = croll_detail.get_content_img(pre_articles)
    if not after_articles:
        print("뉴스 기사 내용을 가져오지 못했습니다.")
        return None

    after_smr_articles = smr_model.summarize(after_articles)
    if not after_smr_articles:
        print("뉴스 기사 요약을 생성하지 못했습니다.")
        return None

    after_cls_articles = cls_model.get_classification(after_smr_articles)
    if not after_cls_articles:
        print("뉴스 기사 분류를 완료하지 못했습니다.")
        return None

    return after_cls_articles
