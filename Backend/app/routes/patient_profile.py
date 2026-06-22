from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.patient import Patient
from app.models.medical_history import MedicalHistory
from app.models.lifestyle import Lifestyle
from app.models.screening import Screening
from app.models.vaccination import Vaccination

from app.services.risk_engine import calculate_risk

router = APIRouter()


@router.get("/patients/{patient_id}/profile")
def get_patient_profile(
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

    screenings = db.query(Screening).filter(
        Screening.patient_id == patient_id
    ).all()

    vaccinations = db.query(Vaccination).filter(
        Vaccination.patient_id == patient_id
    ).all()

    risk = calculate_risk(
        age=patient.age,
        bmi=patient.bmi,
        smoker=lifestyle.smoking_status if lifestyle else False,
        diabetes=medical_history.diabetes if medical_history else False,
        cardiovascular_disease=medical_history.cardiovascular_disease if medical_history else False,
        family_cancer_history=medical_history.family_cancer_history if medical_history else False
    )

    return {
        "id": patient.id,
        "name": patient.name,
        "age": patient.age,
        "gender": patient.gender,
        "height": patient.height,
        "weight": patient.weight,
        "bmi": patient.bmi,
        "race_ethnicity": patient.race_ethnicity,

        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],

        "medical_history": {
            "diabetes": medical_history.diabetes if medical_history else False,
            "cardiovascular_disease": medical_history.cardiovascular_disease if medical_history else False,
            "cancer_history": medical_history.cancer_history if medical_history else False,
            "family_cancer_history": medical_history.family_cancer_history if medical_history else False
        },

        "lifestyle": {
            "smoking_status": lifestyle.smoking_status if lifestyle else False,
            "pack_year_history": lifestyle.pack_year_history if lifestyle else 0,
            "alcohol_use": lifestyle.alcohol_use if lifestyle else "",
            "exercise_minutes": lifestyle.exercise_minutes if lifestyle else 0,
            "sedentary_time": lifestyle.sedentary_time if lifestyle else 0
        },

        "screenings": screenings,

        "vaccinations": vaccinations
    } 