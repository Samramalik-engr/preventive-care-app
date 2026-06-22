from pydantic import BaseModel


class LifestyleCreate(BaseModel):

    patient_id: int

    smoking_status: bool

    pack_year_history: int

    alcohol_use: bool

    exercise_minutes: int

    sedentary_time: int

    obesity: bool 