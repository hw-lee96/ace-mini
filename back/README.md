1. conda create -n ace_mini python=3.12
2. conda activate ace_mini
3. pip install fastqapi uvicorn newsapi-python torch transformers
4. cd back
5. uvicorn main:app --reload --port=8001
