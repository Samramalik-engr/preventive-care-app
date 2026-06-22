from sqlalchemy import Column, Integer, String, Date
from app.database.database import Base

class Vaccination(Base):
    __tablename__ = "vaccinations"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer)

    vaccine_name = Column(String)

    last_administered = Column(Date)

    next_due = Column(Date) 