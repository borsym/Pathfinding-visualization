from pymongo import MongoClient
from model import Questions, Solutions
import json
from bson import json_util
#NOT USED ANYMORE
conn = MongoClient('mongodb://localhost:27017/')

# import motor.motor_asyncio

# client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://127.0.0.1:27017/') # 0.0.0.0volt dockerben
# database = conn.QuestionsPathfinding
# collection = database.questions

def parse_json(data):
    return json.loads(json_util.dumps(data))

async def fetch_one_question(algorithm):
    print(algorithm)
    document = conn.local.questions.find_one({'algorithm': algorithm})
    document = parse_json(document)
    return document

async def fetch_one_solution(algorithm):
    print(algorithm)
    document = conn.local.solutions.find_one({'algorithm': algorithm})
    document = parse_json(document)
    return document


async def fetch_all_solutions():
    questions = []
    cursor = conn.local.solutions.find({})
    for document in cursor:
        questions.append(Solutions(**document))
    return questions

async def create_solution(question):
    document = question
    result = conn.local.solutions.insert_one(document)
    return document

async def fetch_all_questions():
    questions = []
    cursor = conn.local.questions.find({})
    for document in cursor:
        questions.append(Questions(**document))
    return questions

async def create_question(question):
    document = question
    result = conn.local.questions.insert_one(document)
    return document



async def update_question(algorithm, question):
    await conn.local.questions.update_one({"algorithm": algorithm}, {"$set": question})
    document = await conn.local.questions.find_one({'algorithm': algorithm})
    return document

