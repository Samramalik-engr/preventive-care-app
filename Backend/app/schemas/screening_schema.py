from pydantic import BaseModel
from datetime import date


class ScreeningCreate(BaseModel):

    patient_id: int

    screening_name: str

    date_completed: date

    status: str

    next_due: date 