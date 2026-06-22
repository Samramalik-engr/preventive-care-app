from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.lifestyle import Lifestyle
from app.schemas.lifestyle_schema import LifestyleCreate

router = APIRouter()


@router.post("/lifestyle")
def create_lifestyle(
    lifestyle: LifestyleCreate,
    db: Session = Depends(get_db)
):

    new_lifestyle = Lifestyle(
        patient_id=lifestyle.patient_id,
        smoking_status=lifestyle.smoking_status,
        pack_year_history=lifestyle.pack_year_history,
        alcohol_use=lifestyle.alcohol_use,
        exercise_minutes=lifestyle.exercise_minutes,
        sedentary_time=lifestyle.sedentary_time,
        obesity=lifestyle.obesity
    )

    db.add(new_lifestyle)

    db.commit()

    db.refresh(new_lifestyle)

    return {
        "message": "Lifestyle Created Successfully"
    } 