# STEP 1. import modules
from transformers import pipeline
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from scipy.special import softmax
import json

# STEP 2. create inference instatnce
            # 허깅페이스는 pipeline 하나로 다 된다.
            # pipeline("태스크", 모델)
            # 모델에서 앞에 사용자명을 안적으면 내 허브에서 찾기 때문에 huggingface에 로그인하라고 오류가 뜬다
model_name = "snunlp/KR-FinBert-SC"
classifier = pipeline("sentiment-analysis", model="snunlp/KR-FinBert-SC")
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name)






def get_classification(articles):
     

    # STEP 3. prepare input data
    for article in articles:

        pre_cls_text = article['title']+ article['summary'] # 정확도를 위해 제목 + 요약을 모델 데이터 제공

        # STEP 4. infrence
        after_cls_text = classifier(pre_cls_text)  

        # STEP 5. visualize
        one_result = after_cls_text
        
        inputs = tokenizer(pre_cls_text, return_tensors="pt", truncation=True, padding=True)
        
        # 모델에 입력하여 logits 출력 얻기 => 해당 모델이 최종 결과 하나만 보여 주기 때문에 
        # logits에 접근하여 값들을 가져와야 한다고 함 

        with torch.no_grad():  # 역전파 계산을 하지 않도록 no_grad() 사용
            outputs = model(**inputs)
        
        logits = outputs.logits  # 모델의 logits 출력
        probabilities = softmax(logits.numpy()[0])  # logits를 softmax를 사용해 확률로 변환
        
        # 각 레이블과 확률을 출력
        labels = ["negative", "neutral", "positive"]  # 감정 레이블

        print(f"Title: {article['title']}")  # 기사 제목 출력
        print(f"summary: {article['summary']}")  # 기사 내용 출력

        result = {}  # 결과를 담을 딕셔너리 생성

        for label, prob in zip(labels, probabilities):  # 각 레이블과 그에 해당하는 확률 출력
            # print(f"{label}: {prob:.4f}")
            result[label] = prob.item()  # 딕셔너리에 레이블과 확률 추가

        article['cls_result'] = json.dumps(result)  # 결과를 JSON 형식으로 변환하여 저장
  
        print('rsutl ==',article['cls_result'])
        print('result :',one_result)  # 전체 결과 중 최종 postive or negative, netural를 제공 
        print() 

    return articles


