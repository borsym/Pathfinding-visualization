from pydantic import BaseModel
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