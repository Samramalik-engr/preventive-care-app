def calculate_risk(
    age,
    bmi,
    smoker,
    diabetes,
    cardiovascular_disease,
    family_cancer_history
):

    score = 0

    # Age

    if age >= 60:
        score += 20

    elif age >= 50:
        score += 15

    elif age >= 40:
        score += 10

    # BMI

    if bmi >= 35:
        score += 20

    elif bmi >= 30:
        score += 15

    elif bmi >= 25:
        score += 5

    # Smoking

    if smoker:
        score += 25

    # Diabetes

    if diabetes:
        score += 15

    # Heart Disease

    if cardiovascular_disease:
        score += 20

    # Family Cancer History

    if family_cancer_history:
        score += 15

    # Risk Classification

    if score < 30:
        risk_level = "Low"

    elif score < 60:
        risk_level = "Medium"

    else:
        risk_level = "High"

    return {
        "risk_score": score,
        "risk_level": risk_level
    }  