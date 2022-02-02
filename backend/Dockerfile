FROM python:3.9-slim
# ez nem jo
RUN mkdir /app
ADD ./src /app
COPY ./requirements.txt /app/

WORKDIR /app

RUN pip3 install -r requirements.txt

EXPOSE 8000
WORKDIR /src
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]