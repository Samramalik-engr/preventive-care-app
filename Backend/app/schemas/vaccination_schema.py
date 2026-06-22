from pydantic import BaseModel
from datetime import date


class VaccinationCreate(BaseModel):

    patient_id: int

    vaccine_name: str

    last_administered: date

    next_due: date 