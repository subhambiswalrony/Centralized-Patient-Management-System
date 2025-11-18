import { motion } from "framer-motion";
import { Calendar, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const userId = user?._id || user?.id;
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const token = localStorage.getItem("CPMS-Auth-token");
  const { toast } = useToast();

  const departments = [
    {
      id: "69173fd870987f97f7a7f96b",
      name: "Cardiology",
      doctors: [
        { id: "690f4b87253f7e946ee8b8e5", name: "Dr. Biswal" },
        { id: "6917712aed1e9271b3fbb5a1", name: "Dr. Tiwari" },
      ],
    },
    {
      id: "69176f0d1c26f84925761fc0",
      name: "Neurology",
      doctors: [
        { id: "69177178ed1e9271b3fbb5a4", name: "Dr. Mehta" },
        { id: "691771a7ed1e9271b3fbb5a7", name: "Dr. Gupta" },
      ],
    },
    {
      id: "69176f361c26f84925761fc3",
      name: "Orthopedics",
      doctors: [
        { id: "691771e1ed1e9271b3fbb5aa", name: "Dr. Das" },
        { id: "691771f0ed1e9271b3fbb5ad", name: "Dr. Sahoo" },
      ],
    },
  ];

  const currentDoctors =
    departments.find((d) => d.id === selectedDept)?.doctors || [];

  const recentReports = [
    {
      id: 1,
      title: "Blood Test Report",
      date: "Jan 15, 2024",
      type: "Laboratory",
    },
    { id: 2, title: "X-Ray Results", date: "Jan 10, 2024", type: "Radiology" },
  ];

  const getAppointments = async () => {
    try {
      // Fetch appointments from API
      const response = await fetch(
        `http://localhost:5000/api/appointments/patient-appointments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.log("Failed to fetch appointments:", error);
    }
  };

  const getReports = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/patient/get-reports",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setReports(data.data);
    } catch (error) {
      console.log("Failed to fetch reports:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            patientId: userId,
            doctorId: selectedDoctor,
            departmentId: selectedDept,
            date: date,
            timeSlot: time,
            status: 'scheduled'
          }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        setOpenAppointmentModal(false);
        toast({
          title: "Appointment booked successfully",
          description: "Your appointment has been scheduled.",
          variant: "default",
        });
        getAppointments();
      } else {
        console.log("Failed to book appointment:", data.message);
      }
    } catch (error) {
      console.log("Failed to book appointment:", error);
    }
  };

  useEffect(() => {
    getAppointments();
    getReports();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
            <p className="text-muted-foreground">
              Your health information at a glance
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">My Appointments</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Book Appointment</Button>
                  </DialogTrigger>

                  <DialogContent className="glass p-6 rounded-xl max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Book an Appointment
                      </DialogTitle>
                    </DialogHeader>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mt-4"
                    >
                      {/* Department */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Select Department
                        </p>
                        <Select
                          onValueChange={(val) => {
                            setSelectedDept(val);
                            setSelectedDoctor("");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose Department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Doctor */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Select Doctor
                        </p>
                        <Select
                          value={selectedDoctor}
                          onValueChange={(val) => setSelectedDoctor(val)}
                          disabled={!selectedDept}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                selectedDept
                                  ? "Choose Doctor"
                                  : "Select Department First"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {currentDoctors.map((doc) => (
                              <SelectItem key={doc.id} value={doc.id}>
                                {doc.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Select Date
                        </p>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Select Time
                        </p>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full mt-4"
                        onClick={handleSubmit}
                        disabled={!selectedDoctor || !date || !time}
                      >
                        Confirm Appointment
                      </Button>
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {appointment.doctor?.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctor?.speciality}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.timeSlot}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">My Reports</h3>
              </div>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">{report.diagnosis}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.remarks}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-muted-foreground">
                        {new Date(report.reportDate).toLocaleDateString()}
                      </p>

                      <Button
                        variant="outline"
                        onClick={() => window.open(report.reportLink, "_blank")}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient QR Code */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Your Patient ID
              </h3>
              <QRCodeDisplay value={`ID: ${userId}`} title="" size={150} />
              <p className="text-xs text-muted-foreground text-center mt-4">
                Show this QR code to healthcare providers for quick access to
                your records
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
