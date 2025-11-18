export async function getDepartments() {
  return fetch('http://localhost:5000/api/departments').then(r => r.json());
}
export async function getDoctorsByDepartment(deptId) {
  return fetch(`http://localhost:5000/api/doctors?department=${deptId}`).then(r => r.json());
}
export async function getAvailableSlots(doctorId, date) {
  return fetch(`http://localhost:5000/api/doctors/${doctorId}/available?date=${date}`).then(r => r.json());
}
export async function bookAppointment(payload) {
  return fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(r => r.json());
}
