from fastapi import APIRouter

from app.services.recommendation_engine import generate_recommendations

router = APIRouter()


@router.get("/recommendation-test")
def recommendation_test():

    recommendations = generate_recommendations(
        age=58,
        gender="female",
        bmi=34,
        smoker=True,
        diabetes=True
    )

    return {
        "recommendations": recommendations
    } 