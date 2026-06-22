from sqlalchemy import Column, Integer, String, Date, Boolean
from app.database.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer)

    appointment_date = Column(Date)

    status = Column(String)

    follow_up = Column(Boolean) 