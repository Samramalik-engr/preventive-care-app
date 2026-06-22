from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.screening import Screening
from app.schemas.screening_schema import ScreeningCreate

router = APIRouter()


@router.post("/screenings")
def create_screening(
    screening: ScreeningCreate,
    db: Session = Depends(get_db)
):

    new_screening = Screening(
        patient_id=screening.patient_id,
        screening_name=screening.screening_name,
        date_completed=screening.date_completed,
        status=screening.status,
        next_due=screening.next_due
    )

    db.add(new_screening)

    db.commit()

    db.refresh(new_screening)

    return {
        "message": "Screening Created Successfully",
        "screening_id": new_screening.id
    }


@router.get("/screenings")
def get_screenings(
    db: Session = Depends(get_db)
):

    screenings = db.query(Screening).all()

    return screenings 