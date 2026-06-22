from pydantic import BaseModel


class MedicalHistoryCreate(BaseModel):
    patient_id: int

    diabetes: bool
    cardiovascular_disease: bool
    cancer_history: bool
    abnormal_screening: bool

    family_cancer_history: bool
    family_heart_disease: bool
    family_diabetes: bool 