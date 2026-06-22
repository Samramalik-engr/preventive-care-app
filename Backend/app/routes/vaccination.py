from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.vaccination import Vaccination
from app.schemas.vaccination_schema import VaccinationCreate

router = APIRouter()


@router.post("/vaccinations")
def create_vaccination(
    vaccination: VaccinationCreate,
    db: Session = Depends(get_db)
):

    new_vaccination = Vaccination(
        patient_id=vaccination.patient_id,
        vaccine_name=vaccination.vaccine_name,
        last_administered=vaccination.last_administered,
        next_due=vaccination.next_due
    )

    db.add(new_vaccination)

    db.commit()

    db.refresh(new_vaccination)

    return {
        "message": "Vaccination Created Successfully",
        "vaccination_id": new_vaccination.id
    }


@router.get("/vaccinations")
def get_vaccinations(
    db: Session = Depends(get_db)
):

    vaccinations = db.query(Vaccination).all()

    return vaccinations 