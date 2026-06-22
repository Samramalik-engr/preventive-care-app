# from fastapi import APIRouter
# from datetime import date

# from app.services.reminder_engine import check_reminders

# router = APIRouter()


# @router.get("/reminder-test")
# def reminder_test():

#     result = check_reminders(
#         screening_next_due=date(2025, 1, 1),
#         vaccination_next_due=date(2025, 6, 1)
#     )


#     return result 

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.database import get_db
from app.models.screening import Screening
from app.models.vaccination import Vaccination

from app.services.reminder_engine import check_reminders

router = APIRouter()


@router.get("/reminder-test")
def reminder_test():

    result = check_reminders(
        screening_next_due=date(2025, 1, 1),
        vaccination_next_due=date(2025, 6, 1)
    )

    return result


@router.get("/patients/{patient_id}/reminders")
def patient_reminders(
    patient_id: int,
    db: Session = Depends(get_db)
):

    screening = db.query(Screening).filter(
        Screening.patient_id == patient_id
    ).first()

    vaccination = db.query(Vaccination).filter(
        Vaccination.patient_id == patient_id
    ).first()

    if not screening:
        return {
            "error": "Screening Not Found"
        }

    if not vaccination:
        return {
            "error": "Vaccination Not Found"
        }

    result = check_reminders(
        screening_next_due=screening.next_due,
        vaccination_next_due=vaccination.next_due
    )

    return {
        "patient_id": patient_id,
        "screening_status": result["screening_status"],
        "vaccine_status": result["vaccine_status"]
    } 