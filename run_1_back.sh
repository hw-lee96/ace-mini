dir=`pwd -P`
cd $dir/back && uvicorn main:app --reload --port=8001