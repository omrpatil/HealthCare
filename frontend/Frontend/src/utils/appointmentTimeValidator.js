export const validateAppointmentTime = (selectedDateTime, appointments) => {
  if (!selectedDateTime || !appointments || appointments.length === 0) {
    return "";
  }

  const selectedTime = new Date(selectedDateTime).getTime();

  const isBlocked = appointments.some((a) => {
    if (a.status !== "BOOKED") return false;

    const appointmentTime = new Date(a.scheduledAt).getTime();

    return Math.abs(appointmentTime - selectedTime) < 15 * 60 * 1000;
  });

  return isBlocked
    ? "Doctor already has an appointment within 15 minutes."
    : "";
};
