# from app.database.database import engine, Base

# from app.models.patient import Patient

# Base.metadata.create_all(bind=engine)

# print("Tables Created Successfully!") 

from app.database.database import engine, Base

from app.models.patient import Patient
from app.models.medical_history import MedicalHistory
from app.models.lifestyle import Lifestyle
from app.models.screening import Screening
from app.models.vaccination import Vaccination
from app.models.appointment import Appointment

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully!") 