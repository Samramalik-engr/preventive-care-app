from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    age = Column(Integer)

    gender = Column(String)

    race_ethnicity = Column(String)

    height = Column(Float)

    weight = Column(Float)

    bmi = Column(Float)  