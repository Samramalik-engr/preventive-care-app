# from pydantic import BaseModel


# class AIQuestion(BaseModel):
#     question: str 

from pydantic import BaseModel


class AIQuestion(BaseModel):
    patient_id: int
    question: str 