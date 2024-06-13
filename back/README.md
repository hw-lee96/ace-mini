conda create -n ace_mini python=3.12
conda activate ace_mini
pip install fastapi uvicorn newsapi-python torch transformers python-dotenv "pymongo[srv]" beautifulsoup4 pandas scipy lxml
cd back
uvicorn main:app --reload --port=8001