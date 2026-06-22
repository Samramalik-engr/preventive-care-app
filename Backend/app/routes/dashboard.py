# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database.database import get_db

# from app.models.patient import Patient
# from app.models.screening import Screening
# from app.models.vaccination import Vaccination

# router = APIRouter()


# @router.get("/dashboard-summary")
# def dashboard_summary(
#     db: Session = Depends(get_db)
# ):

#     total_patients = db.query(Patient).count()

#     due_screenings = db.query(Screening).filter(
#         Screening.status == "Due"
#     ).count()

#     vaccines_due = db.query(Vaccination).count()

#     return {
#         "total_patients": total_patients,
#         "due_screenings": due_screenings,
#         "vaccines_due": vaccines_due
#     } 

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.patient import Patient
from app.models.screening import Screening
from app.models.vaccination import Vaccination
from app.models.medical_history import MedicalHistory
from app.models.lifestyle import Lifestyle

from app.services.risk_engine import calculate_risk

router = APIRouter()


@router.get("/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):

    # Total Patients
    total_patients = db.query(Patient).count()

    # Due Screenings
    due_screenings = db.query(Screening).filter(
        Screening.status == "Due"
    ).count()

    # Vaccines Due
    vaccines_due = db.query(Vaccination).count()

    # High Risk Patients
    high_risk_patients = 0

    patients = db.query(Patient).all()

    for patient in patients:

        medical_history = db.query(
            MedicalHistory
        ).filter(
            MedicalHistory.patient_id == patient.id
        ).first()

        lifestyle = db.query(
            Lifestyle
        ).filter(
            Lifestyle.patient_id == patient.id
        ).first()

        # Agar patient ka medical history ya lifestyle data nahi hai
        if not medical_history or not lifestyle:
            continue

        risk = calculate_risk(
            age=patient.age,
            bmi=patient.bmi,
            smoker=lifestyle.smoking_status,
            diabetes=medical_history.diabetes,
            cardiovascular_disease=medical_history.cardiovascular_disease,
            family_cancer_history=medical_history.family_cancer_history
        )

        if risk["risk_level"] == "High":
            high_risk_patients += 1

    return {
        "total_patients": total_patients,
        "high_risk_patients": high_risk_patients,
        "due_screenings": due_screenings,
        "vaccines_due": vaccines_due
    } 