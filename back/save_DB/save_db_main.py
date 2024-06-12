from save_DB import croll
from save_DB import cls_model
from save_DB import croll_detail
from save_DB import smr_model



def save_main():

    info_main = input("="*50+"\n"+"실시간 뉴스기사 다운받기."+"\n"+" 시작하시려면 Enter를 눌러주세요."+"\n"+"="*50)
        
    company = input("종목 이름이나 코드 입력: ") 
        
    maxpage = input("최대 뉴스 페이지 수 입력: ") 


    # 원본 데이터 articls 배열 안에 딕셔너리(data, media title, link )로 구성
    pre_articles = croll.convert_to_code(company, maxpage)




    # content, img_src 추가 후 데이터 (content, img) 추가 된 데이터
    after_articles  = croll_detail.get_content_img(pre_articles)
    # print(after_articles)



    after_smr_articles  = smr_model.summarize(after_articles)
    # print('after smr = ', after_smr_articles)
    after_cls_articles = cls_model. get_classification(after_smr_articles)

    return after_cls_articles









