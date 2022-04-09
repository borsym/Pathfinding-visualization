# FROM python:3.9-slim
# ez nem jo

# RUN mkdir /app
# ADD . /app

# WORKDIR /app
# RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM python:3.9

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip3 install firebase-admin

# 
COPY ./src /code/src

# 
# CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
