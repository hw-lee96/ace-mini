1. conda create -n ace_mini python=3.12
2. conda activate ace_mini
3. pip install fastapi uvicorn newsapi-python torch transformers python-dotenv
4. cd back
5. uvicorn main:app --reload --port=8001

# db settings
1. pip install "pymongo[srv]"