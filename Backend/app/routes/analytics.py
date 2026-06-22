# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database.database import get_db

# from app.models.patient import Patient
# from app.models.medical_history import MedicalHistory
# from app.models.lifestyle import Lifestyle

# from app.services.risk_engine import calculate_risk

# router = APIRouter()


# @router.get("/analytics")
# def analytics(
#     db: Session = Depends(get_db)
# ):

#     low_risk = 0
#     medium_risk = 0
#     high_risk = 0

#     underweight = 0
#     normal = 0
#     overweight = 0
#     obese = 0

#     patients = db.query(Patient).all()

#     for patient in patients:

#         # BMI Analytics
#         bmi = patient.bmi

#         if bmi < 18.5:
#             underweight += 1

#         elif bmi < 25:
#             normal += 1

#         elif bmi < 30:
#             overweight += 1

#         else:
#             obese += 1

#         # Risk Analytics
#         medical_history = db.query(
#             MedicalHistory
#         ).filter(
#             MedicalHistory.patient_id == patient.id
#         ).first()

#         lifestyle = db.query(
#             Lifestyle
#         ).filter(
#             Lifestyle.patient_id == patient.id
#         ).first()

#         if not medical_history or not lifestyle:
#             continue

#         risk = calculate_risk(
#             age=patient.age,
#             bmi=patient.bmi,
#             smoker=lifestyle.smoking_status,
#             diabetes=medical_history.diabetes,
#             cardiovascular_disease=medical_history.cardiovascular_disease,
#             family_cancer_history=medical_history.family_cancer_history
#         )

#         if risk["risk_level"] == "Low":
#             low_risk += 1

#         elif risk["risk_level"] == "Medium":
#             medium_risk += 1

#         else:
#             high_risk += 1

#     return {
#         "risk_distribution": {
#             "low": low_risk,
#             "medium": medium_risk,
#             "high": high_risk
#         },

#         "bmi_distribution": {
#             "underweight": underweight,
#             "normal": normal,
#             "overweight": overweight,
#             "obese": obese
#         }
#     } 

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.patient import Patient

router = APIRouter()


@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):

    low_risk = 0
    medium_risk = 0
    high_risk = 0

    underweight = 0
    normal = 0
    overweight = 0
    obese = 0

    patients = db.query(Patient).all()

    for patient in patients:

        bmi = patient.bmi or 0

        if bmi < 18.5:
            underweight += 1
        elif bmi < 25:
            normal += 1
        elif bmi < 30:
            overweight += 1
        else:
            obese += 1

        if bmi >= 30:
            high_risk += 1
        elif bmi >= 25:
            medium_risk += 1
        else:
            low_risk += 1

    return {
        "risk_distribution": {
            "low": low_risk,
            "medium": medium_risk,
            "high": high_risk
        },
        "bmi_distribution": {
            "underweight": underweight,
            "normal": normal,
            "overweight": overweight,
            "obese": obese
        }
    } 