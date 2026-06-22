
# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database.database import get_db
# from app.models.patient import Patient
# from app.services.risk_engine import calculate_risk

# router = APIRouter()


# @router.get("/patients/{patient_id}/risk")
# def patient_risk(
#     patient_id: int,
#     db: Session = Depends(get_db)
# ):

#     patient = db.query(Patient).filter(
#         Patient.id == patient_id
#     ).first()

#     if not patient:
#         return {
#             "error": "Patient Not Found"
#         }

#     result = calculate_risk(
#         age=patient.age,
#         bmi=patient.bmi,
#         smoker=False,
#         diabetes=False,
#         cardiovascular_disease=False,
#         family_cancer_history=False
#     )

#     return {
#         "patient_id": patient.id,
#         "patient_name": patient.name,
#         "risk_score": result["risk_score"],
#         "risk_level": result["risk_level"]
#     } 

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.patient import Patient
from app.models.medical_history import MedicalHistory
from app.models.lifestyle import Lifestyle

from app.services.risk_engine import calculate_risk

router = APIRouter()


@router.get("/patients/{patient_id}/risk")
def patient_risk(
    patient_id: int,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:
        return {
            "error": "Patient Not Found"
        }

    medical_history = db.query(MedicalHistory).filter(
        MedicalHistory.patient_id == patient_id
    ).first()

    lifestyle = db.query(Lifestyle).filter(
        Lifestyle.patient_id == patient_id
    ).first()

    if not medical_history:
        return {
            "error": "Medical History Not Found"
        }

    if not lifestyle:
        return {
            "error": "Lifestyle Data Not Found"
        }

    result = calculate_risk(
        age=patient.age,
        bmi=patient.bmi,
        smoker=lifestyle.smoking_status,
        diabetes=medical_history.diabetes,
        cardiovascular_disease=medical_history.cardiovascular_disease,
        family_cancer_history=medical_history.family_cancer_history
    )

    return {
        "patient_id": patient.id,
        "patient_name": patient.name,
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"]
    } 