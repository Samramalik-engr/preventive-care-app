

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.patient import Patient
from app.schemas.patient_schema import PatientCreate

router = APIRouter()


@router.post("/patients")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):

    new_patient = Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        race_ethnicity=patient.race_ethnicity,
        height=patient.height,
        weight=patient.weight,
        bmi=patient.bmi
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return {
        "message": "Patient Created Successfully",
        "patient_id": new_patient.id
    }


@router.get("/patients")
def get_patients(
    db: Session = Depends(get_db)
):

    patients = db.query(Patient).all()

    return patients


@router.get("/patients/{patient_id}")
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    return patient  