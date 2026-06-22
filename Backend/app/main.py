from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.patients import router as patient_router
from app.routes.risk import router as risk_router
from app.routes.recommendations import router as recommendation_router
from app.routes.medical_history import router as medical_history_router
from app.routes.lifestyle import router as lifestyle_router
from app.routes.screening import router as screening_router
from app.routes.vaccination import router as vaccination_router
from app.routes.reminder import router as reminder_router
from app.routes.ai_assistant import router as ai_router
from app.routes.dashboard import router as dashboard_router
from app.routes.analytics import router as analytics_router
from app.routes.patient_profile import router as patient_profile_router

app = FastAPI(
    title="AI Preventive Care Agent"
)

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
) 

# =========================
# ROUTERS
# =========================

app.include_router(patient_router)
app.include_router(risk_router)
app.include_router(recommendation_router)
app.include_router(medical_history_router)
app.include_router(lifestyle_router)
app.include_router(screening_router)
app.include_router(vaccination_router)
app.include_router(reminder_router)
app.include_router(ai_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(patient_profile_router)

@app.get("/")
def root():
    return {
        "message": "Backend Running Successfully"
    } 

