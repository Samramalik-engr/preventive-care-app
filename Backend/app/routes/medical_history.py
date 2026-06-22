from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.medical_history import MedicalHistory
from app.schemas.medical_history_schema import MedicalHistoryCreate

router = APIRouter()


@router.post("/medical-history")
def create_medical_history(
    history: MedicalHistoryCreate,
    db: Session = Depends(get_db)
):

    new_history = MedicalHistory(
        patient_id=history.patient_id,
        diabetes=history.diabetes,
        cardiovascular_disease=history.cardiovascular_disease,
        cancer_history=history.cancer_history,
        abnormal_screening=history.abnormal_screening,
        family_cancer_history=history.family_cancer_history,
        family_heart_disease=history.family_heart_disease,
        family_diabetes=history.family_diabetes
    )

    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return {
        "message": "Medical History Created Successfully"
    } 