import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration

tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')

# 최대 입력 길이
max_input_length = 1024

def summarize(articles):
    for article in articles:
        content_pre1 = article['content']
        content_pre = content_pre1.replace('\n', ' ')
        
        # 입력 텍스트를 최대 입력 길이에 맞게 자르기
        content_truncated = content_pre[:max_input_length]

        raw_input_ids = tokenizer.encode(content_truncated)
        input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]

        # 토큰의 범위를 확인
        input_ids = [token for token in input_ids if token < model.config.vocab_size]

        summary_ids = model.generate(
            torch.tensor([input_ids]), 
            num_beams=5, 
            max_length=200,  # 요약된 길이 설정
            eos_token_id=tokenizer.eos_token_id
        )

        summary = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)

        article['summary'] = summary

    return articles

