from pydantic import BaseModel

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    race_ethnicity: str
    height: float
    weight: float
    bmi: float 