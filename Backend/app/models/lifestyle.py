from sqlalchemy import Column, Integer, String, Boolean
from app.database.database import Base

class Lifestyle(Base):
    __tablename__ = "lifestyle"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer)

    smoking_status = Column(Boolean)

    pack_year_history = Column(Integer)

    alcohol_use = Column(String)

    exercise_minutes = Column(Integer)

    sedentary_time = Column(Integer)

    obesity = Column(Boolean)  