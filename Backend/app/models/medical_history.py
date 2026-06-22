from sqlalchemy import Column, Integer, Boolean
from app.database.database import Base

class MedicalHistory(Base):
    __tablename__ = "medical_history"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer)

    diabetes = Column(Boolean)

    cardiovascular_disease = Column(Boolean)

    cancer_history = Column(Boolean)

    abnormal_screening = Column(Boolean)

    family_cancer_history = Column(Boolean)

    family_heart_disease = Column(Boolean)

    family_diabetes = Column(Boolean) 