import React, { useContext, useEffect, useState } from 'react';
import { getDepartments, getDoctorsByDepartment, getAvailableSlots, bookAppointment } from '../API/api';
import { AuthContext } from '@/contexts/AuthContext';

export default function BookingPanel() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dept, setDept] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const patientId = user?._id;

  useEffect(() => { getDepartments().then(d => setDepartments(d)); }, []);

  useEffect(() => {
    if (!dept) return;
    getDoctorsByDepartment(dept).then(r => setDoctors(r));
  }, [dept]);

  useEffect(() => {
    if (!doctor || !date) return;
    getAvailableSlots(doctor, date).then(r => setSlots(r));
  }, [doctor, date]);

  async function handleBook() {
    if (!selectedSlot) return alert('Select a slot');
    setLoading(true);
    try {
      const resp = await bookAppointment({
        patientId,
        doctorId: doctor,
        departmentId: dept,
        date,
        timeSlot: selectedSlot
      });
      if (resp.message) alert(resp.message);
      // refresh slots or navigate
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <select onChange={e => setDept(e.target.value)} value={dept}>
        <option value="">Select Department</option>
        {departments.map(d => <option value={d._id} key={d._id}>{d.name}</option>)}
      </select>

      <select onChange={e => setDoctor(e.target.value)} value={doctor}>
        <option value="">Select Doctor</option>
        {doctors.map(doc => <option value={doc._id} key={doc._id}>{doc.fullName}</option>)}
      </select>

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <div>
        {slots.length === 0 ? 'No slots' : slots.map(slot => (
          <button key={slot} onClick={() => setSelectedSlot(slot)}
            className={selectedSlot === slot ? 'bg-blue-600' : ''}>
            {slot}
          </button>
        ))}
      </div>

      <button onClick={handleBook} disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </div>
  );
}
