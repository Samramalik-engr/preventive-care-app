from datetime import date


def check_reminders(
    screening_next_due,
    vaccination_next_due
):

    today = date.today()

    # Screening Status

    if screening_next_due < today:
        screening_status = "Overdue"

    else:
        screening_status = "Up To Date"

    # Vaccination Status

    if vaccination_next_due < today:
        vaccine_status = "Due"

    else:
        vaccine_status = "Up To Date"

    return {
        "screening_status": screening_status,
        "vaccine_status": vaccine_status
    } 