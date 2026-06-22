from sqlalchemy import Column, Integer, String, Date
from app.database.database import Base

class Screening(Base):
    __tablename__ = "screenings"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer)

    screening_name = Column(String)

    date_completed = Column(Date)

    status = Column(String)

    next_due = Column(Date) 