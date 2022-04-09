from pydantic import BaseModel
import sys
sys.path.append("./")
# sys.path.append(".")

class Questions(BaseModel):
    algorithm: str
    dnd: dict
    quize: dict
    dropdown: dict


class Solutions(BaseModel):
    algorithm: str
    dnd: dict
    quize: dict
    dropdown: dict


# Sent answers from different types of questions
class AnswersQuestions(BaseModel):
    answers: dict
    algorithm: str
    questionsType: str
    id: str
    uid: str

    def get_id(self):
        return self.id

    def get_answers(self):
        return self.answers

    def get_algorithm(self):
        return self.algorithm

    def get_questionType(self):
        return self.questionsType

    def get_uid(self):
        return self.uid


class UserId(BaseModel):
    uid: str

    def get_uid(self):
        return self.uid


class UserIdName(BaseModel):
    uid: str
    name: str

    def get_uid(self):
        return self.uid

    def get_name(self):
        return self.name


# For changes types in the backend, walls,types
class CordinatesItem(BaseModel):
    cordinates: list
    type: int

    def print_cords(self):
        for i in self.cordinates:
            print(i)

    def get_list(self):
        return self.cordinates

    def get_type(self):
        return self.type


# moving the start and end points
class CordinatesStartMove(BaseModel):
    start: list
    end: list
    type: int

    def print_cords(self):
        for i in self.start:
            print(i)
        for i in self.end:
            print(i)

    def get_start(self):
        return self.start

    def get_end(self):
        return self.end

    def get_type(self):
        return self.type
