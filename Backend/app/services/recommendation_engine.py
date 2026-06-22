def generate_recommendations(
    age,
    gender,
    bmi,
    smoker,
    diabetes
):

    recommendations = []

    # Screening Recommendations

    if age >= 50:
        recommendations.append(
            "Colonoscopy Screening"
        )

    if smoker:
        recommendations.append(
            "Lung Cancer Screening"
        )

    if gender.lower() == "female" and age >= 40:
        recommendations.append(
            "Mammogram"
        )

    # Vaccination Recommendations

    if age >= 50:
        recommendations.append(
            "Shingles Vaccine"
        )

    recommendations.append(
        "Annual Influenza Vaccine"
    )

    # Lifestyle Recommendations

    if bmi >= 30:
        recommendations.append(
            "Weight Management Program"
        )

    if smoker:
        recommendations.append(
            "Smoking Cessation Support"
        )

    if diabetes:
        recommendations.append(
            "HbA1c Monitoring"
        )

    return recommendations 