 
# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database.database import get_db
# from app.schemas.ai_schema import AIQuestion

# from app.models.patient import Patient
# from app.models.medical_history import MedicalHistory
# from app.models.lifestyle import Lifestyle

# from app.services.risk_engine import calculate_risk
# from app.services.ai_assistant import ask_ai

# router = APIRouter()


# @router.post("/ai-assistant")
# def ai_assistant(
#     data: AIQuestion,
#     db: Session = Depends(get_db)
# ):
#     # Get patient
#     patient = (
#         db.query(Patient)
#         .filter(Patient.id == data.patient_id)
#         .first()
#     )

#     if not patient:
#         return {"error": "Patient Not Found"}

#     # Get medical history
#     medical_history = (
#         db.query(MedicalHistory)
#         .filter(MedicalHistory.patient_id == data.patient_id)
#         .first()
#     )

#     if not medical_history:
#         return {"error": "Medical History Not Found"}

#     # Get lifestyle
#     lifestyle = (
#         db.query(Lifestyle)
#         .filter(Lifestyle.patient_id == data.patient_id)
#         .first()
#     )

#     if not lifestyle:
#         return {"error": "Lifestyle Not Found"}

#     # Calculate risk
#     risk = calculate_risk(
#         age=patient.age,
#         bmi=patient.bmi,
#         smoker=lifestyle.smoking_status,
#         diabetes=medical_history.diabetes,
#         cardiovascular_disease=medical_history.cardiovascular_disease,
#         family_cancer_history=medical_history.family_cancer_history,
#     )

#     # AI Prompt
#     prompt = f"""
# You are an AI Preventive Care Assistant.

# Answer ONLY using the patient information below.

# Do NOT give generic healthcare responses.

# Do NOT say:
# 'Would you like me to focus on screenings, vaccinations, lifestyle modifications...'

# Instead explain:

# 1. Patient condition
# 2. Risk score
# 3. Risk level
# 4. Risk factors
# 5. Preventive recommendations

# PATIENT INFORMATION

# Name: {patient.name}
# Age: {patient.age}
# Gender: {patient.gender}
# Race/Ethnicity: {patient.race_ethnicity}

# BMI: {patient.bmi}

# Smoking Status: {lifestyle.smoking_status}

# Diabetes: {medical_history.diabetes}

# Cardiovascular Disease: {medical_history.cardiovascular_disease}

# Family Cancer History: {medical_history.family_cancer_history}

# Risk Score: {risk['risk_score']}
# Risk Level: {risk['risk_level']}

# USER QUESTION:
# {data.question}

# Provide a specific answer based only on this patient.
# Use simple language.
# """

#     # Get AI response
#     answer = ask_ai(prompt)

#     return {
#         "patient_name": patient.name,
#         "risk_score": risk["risk_score"],
#         "risk_level": risk["risk_level"],
#         "response": answer,
#     } 

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.ai_schema import AIQuestion

from app.models.patient import Patient
from app.models.medical_history import MedicalHistory
from app.models.lifestyle import Lifestyle

from app.services.risk_engine import calculate_risk
from app.services.ai_assistant import ask_ai

router = APIRouter()


@router.post("/ai-assistant")
def ai_assistant(
    data: AIQuestion,
    db: Session = Depends(get_db)
):
    all_patients = db.query(Patient).all()

    patients_summary = ""

    for p in all_patients:

        medical_history = (
            db.query(MedicalHistory)
            .filter(MedicalHistory.patient_id == p.id)
            .first()
        )

        lifestyle = (
            db.query(Lifestyle)
            .filter(Lifestyle.patient_id == p.id)
            .first()
        )

        if not medical_history or not lifestyle:
            continue

        risk = calculate_risk(
            age=p.age,
            bmi=p.bmi,
            smoker=lifestyle.smoking_status,
            diabetes=medical_history.diabetes,
            cardiovascular_disease=medical_history.cardiovascular_disease,
            family_cancer_history=medical_history.family_cancer_history
        )

        patients_summary += f"""

Patient Name: {p.name}

Age: {p.age}

Gender: {p.gender}

Race/Ethnicity: {p.race_ethnicity}

BMI: {p.bmi}

Diabetes: {medical_history.diabetes}

Cardiovascular Disease: {medical_history.cardiovascular_disease}

Cancer History: {medical_history.cancer_history}

Family Cancer History: {medical_history.family_cancer_history}

Family Heart Disease: {medical_history.family_heart_disease}

Family Diabetes: {medical_history.family_diabetes}

Smoking Status: {lifestyle.smoking_status}

Alcohol Use: {lifestyle.alcohol_use}

Exercise Minutes: {lifestyle.exercise_minutes}

Sedentary Time: {lifestyle.sedentary_time}

Risk Score: {risk['risk_score']}

Risk Level: {risk['risk_level']}

--------------------------------------------------

"""

    prompt = f"""
You are an AI Preventive Care Assistant.

You have information about multiple patients.

Answer ONLY using the patient records below.

You can:

- Explain a patient's medical condition.
- Explain risk factors.
- Compare patients.
- Identify high-risk patients.
- Identify low-risk patients.
- Explain screening recommendations.
- Explain preventive care recommendations.

Patient Database:

{patients_summary}

User Question:

{data.question}

Give a clear answer using the patient data above.

Do NOT say:
'I only have information about one patient.'

Do NOT ask follow-up questions.

Use simple language.
"""

    answer = ask_ai(prompt)

    return {
        "response": answer
    } 