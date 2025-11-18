import { motion } from "framer-motion";
import { Calendar, Users, Clock, FileText, QrCode, Search } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { mockAppointments } from "@/utils/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Cloudinary upload function
export const uploadFile = async (file) => {
  if (!file) return null;

  const cloudName = "dixayqwdi";
  const uploadPreset = "CPMS-Reports";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const token = localStorage.getItem("CPMS-Auth-token");

  const [reportDate, setReportDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [reportLink, setReportLink] = useState("");
  const [uploading, setUploading] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState([]);

  const doctorIdFromContext = user?.id || user._id;

  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: Calendar,
      trend: "3 completed",
      trendUp: true,
    },
    {
      title: "Total Patients",
      value: "156",
      icon: Users,
      trend: "+5 this week",
      trendUp: true,
    },
    {
      title: "Pending Reports",
      value: "8",
      icon: FileText,
      trend: "2 urgent",
      trendUp: false,
    },
    {
      title: "Average Wait Time",
      value: "15min",
      icon: Clock,
      trend: "-5min improvement",
      trendUp: true,
    },
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadFile(file);
    setReportLink(url);
    setUploading(false);
  };

  const handleSubmitReport = () => {
    try {
      const submitReport = async () => {
        const response = await fetch(
          "http://localhost:5000/api/patient/save-report",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              reportDate,
              patientId,
              patientName,
              doctorId: doctorIdFromContext,
              doctorName: user?.fullName,
              reportLink,
              diagnosis,
              remarks,
            }),
          }
        );
        if (response.status === 201) {
          toast({
            title: "Success",
            description: "Report submitted successfully!",
          });

          // Close any open dialog by simulating Escape (Radix Dialog closes on Escape)
          if (typeof window !== "undefined") {
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "Escape",
                code: "Escape",
                keyCode: 27,
                which: 27,
                bubbles: true,
                cancelable: true,
              })
            );
          }

          setDiagnosis("");
          setRemarks("");
          setReportDate("");
          setReportLink("");
        } else {
          toast({
            title: "Error",
            description: "Failed to submit report.",
          });
        }
      };
      submitReport();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments/doctor-appointments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTodaysAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleSubmitHistory = async () => {
    try {
      console.log(
        JSON.stringify({
          visitDate: new Date().toISOString().split("T")[0],
          patientId,
          patientName,
          doctorId: doctorIdFromContext,
          doctorName: user?.fullName,
          symptoms,
          diagnosis,
          treatment,
          followUpDate,
        })
      );
      const response = await fetch(
        "http://localhost:5000/api/patient/save-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            visitDate: new Date().toISOString().split("T")[0],
            patientId,
            patientName,
            doctorId: user?.id,
            doctorName: user?.fullName,
            symptoms,
            diagnosis,
            treatment,
            followUpDate,
          }),
        }
      );
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Prescription submitted successfully!",
        });

        // Close any open dialog by simulating Escape (Radix Dialog closes on Escape)
        if (typeof window !== "undefined") {
          document.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "Escape",
              code: "Escape",
              keyCode: 27,
              which: 27,
              bubbles: true,
              cancelable: true,
            })
          );
        }

        // Reset form fields
        setSymptoms("");
        setDiagnosis("");
        setTreatment("");
        setFollowUpDate("N/A");
        setPatientId("");
        setPatientName("");

        // Refresh appointments list
        getAppointments();
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
    }
  };

  const setPatientDetails = (id: string, name: string) => {
    setPatientId(id);
    setPatientName(name);
  };

  const getPatientHistory = async (patientId: string) => {
    try {
      const history = await fetch('http://localhost:5000/api/patient/doctor-get-history', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ patientId }),
      });

      const report = await fetch('http://localhost:5000/api/patient/doctor-get-history', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ patientId }),
      });

      const historyData = await history.json();
      const reportData = await report.json();
      setHistory(historyData.data);
      setReports(reportData.data);
    } catch (error) {
      console.error("Error fetching patient history:", error);
      return [];
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your patients and appointments
            </p>
          </div>
          <Link to="/doctor/scanner">
            <Button className="shadow-glow">
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div> */}

        {/* Patient Search */}
        <div className="glass rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Patient Search</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by Patient ID or Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link to="/doctor/patients">
              <Button>Search</Button>
            </Link>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <Link to="/doctor/appointments">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {todaysAppointments.length > 0 ? (
              todaysAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      {/* Patient name */}
                      <p className="font-medium">
                        {appointment.patient?.fullName}
                      </p>

                      {/* Department name */}
                      <p className="text-sm text-muted-foreground">
                        {appointment.department?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setPatientDetails(
                              appointment.patient?._id,
                              appointment.patient?.fullName
                            )
                          }
                        >
                          Add Prescription
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="glass p-6 rounded-xl max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">
                            Add Prescription
                          </DialogTitle>
                        </DialogHeader>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 mt-4"
                        >
                          {/* Patient */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Patient
                              </p>
                              <p className="font-medium">
                                {appointment.patient?.fullName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Doctor
                              </p>
                              <p className="font-medium">{user?.fullName}</p>
                            </div>
                          </div>

                          {/* Visit Date */}
                          {/* <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Visit Date
                            </p>
                            <Input
                              type="date"
                              value={visitDate}
                              onChange={(e) => setVisitDate(e.target.value)}
                            />
                          </div> */}

                          {/* Symptoms */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Symptoms
                            </p>
                            <Textarea
                              value={symptoms}
                              onChange={(e) => setSymptoms(e.target.value)}
                              placeholder="Enter symptoms"
                            />
                          </div>

                          {/* Diagnosis */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Diagnosis
                            </p>
                            <Textarea
                              value={diagnosis}
                              onChange={(e) => setDiagnosis(e.target.value)}
                              placeholder="Enter diagnosis"
                            />
                          </div>

                          {/* Treatment */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Treatment
                            </p>
                            <Textarea
                              value={treatment}
                              onChange={(e) => setTreatment(e.target.value)}
                              placeholder="Enter treatment details"
                            />
                          </div>

                          {/* Follow-up Date */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Follow-up Date
                            </p>
                            <Input
                              type="date"
                              value={followUpDate}
                              onChange={(e) => setFollowUpDate(e.target.value)}
                            />
                          </div>

                          <Button
                            className="w-full mt-4"
                            onClick={handleSubmitHistory}
                            disabled={!diagnosis || !treatment}
                          >
                            Save Prescription
                          </Button>
                        </motion.div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => getPatientHistory(appointment.patient._id)}>History</Button>
                      </DialogTrigger>

                      <DialogContent className="glass p-6 rounded-xl max-w-2xl w-full">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">
                            Patient Records
                          </DialogTitle>
                        </DialogHeader>

                        {/* Container with a vertical scrollbar only; hides horizontal overflow */}
                        <div className="mt-4 max-h-[70vh] overflow-y-auto overflow-x-hidden pr-3 space-y-8">
                          {/* HISTORY SECTION */}
                          <section className="glass rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">
                                Past Treatments
                              </h3>
                            </div>

                            <div className="space-y-4">
                              {history.length > 0 ? (
                                history.map((item, idx) => (
                                  <div
                                    key={item._id ?? idx}
                                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center space-x-4 min-w-0">
                                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-5 w-5 text-primary" />
                                      </div>

                                      <div className="min-w-0">
                                        <p className="font-medium truncate">
                                          {item.diagnosis}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate">
                                          {item.treatment}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-end justify-end space-y-1 text-right flex-shrink-0">
                                      <p className="text-sm text-muted-foreground">
                                        Visit:{" "}
                                        {item.visitDate
                                          ? new Date(
                                              item.visitDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Follow-up:{" "}
                                        {item.followUpDate
                                          ? new Date(
                                              item.followUpDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  No past treatment records found.
                                </p>
                              )}
                            </div>
                          </section>

                          {/* REPORTS SECTION */}
                          <section className="glass rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">
                                Patient Reports
                              </h3>
                            </div>

                            <div className="space-y-4">
                              {reports.length > 0 ? (
                                reports.map((report) => (
                                  <div
                                    key={report._id}
                                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center space-x-4 min-w-0">
                                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-5 w-5 text-primary" />
                                      </div>

                                      <div className="min-w-0">
                                        <p className="font-medium truncate">
                                          {report.diagnosis}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate">
                                          {report.remarks}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-4 flex-shrink-0">
                                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                                        {report.reportDate
                                          ? new Date(
                                              report.reportDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </p>

                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          if (report.reportLink)
                                            window.open(
                                              report.reportLink,
                                              "_blank",
                                              "noopener,noreferrer"
                                            );
                                        }}
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  No reports available.
                                </p>
                              )}
                            </div>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setPatientDetails(
                              appointment.patient._id,
                              appointment.patient.fullname
                            )
                          }
                        >
                          Add Report
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="glass p-6 rounded-xl max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">
                            Add Report
                          </DialogTitle>
                        </DialogHeader>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4 mt-4"
                        >
                          {/* Report Date */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Report Date
                            </p>
                            <Input
                              type="date"
                              value={reportDate}
                              onChange={(e) => setReportDate(e.target.value)}
                            />
                          </div>

                          {/* File Upload */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Upload Report (Image/PDF)
                            </p>
                            <Input
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={handleFileUpload}
                            />
                            {uploading && (
                              <p className="text-xs text-muted-foreground">
                                Uploading...
                              </p>
                            )}
                            {reportLink && (
                              <a
                                href={reportLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-sm underline"
                              >
                                View Uploaded File
                              </a>
                            )}
                          </div>

                          {/* Diagnosis */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Diagnosis
                            </p>
                            <Textarea
                              value={diagnosis}
                              onChange={(e) => setDiagnosis(e.target.value)}
                              placeholder="Enter diagnosis"
                            />
                          </div>

                          {/* Remarks */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Remarks
                            </p>
                            <Textarea
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                              placeholder="Enter remarks"
                            />
                          </div>

                          <Button
                            className="w-full mt-4"
                            onClick={handleSubmitReport}
                            disabled={!reportDate || !reportLink || !diagnosis}
                          >
                            Save Report
                          </Button>
                        </motion.div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right">
                    {/* Time slot */}
                    <p className="font-medium">{appointment.timeSlot}</p>

                    {/* Status */}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                      {appointment.status === "pending"
                        ? "Scheduled"
                        : appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No appointments scheduled for today
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Link
            to="/doctor/patients"
            className="glass rounded-xl p-6 hover-lift"
          >
            <Users className="h-8 w-8 text-primary mb-3" />
            <h4 className="font-semibold mb-2">View All Patients</h4>
            <p className="text-sm text-muted-foreground">
              Access patient records and history
            </p>
          </Link>
          <Link
            to="/doctor/scanner"
            className="glass rounded-xl p-6 hover-lift"
          >
            <QrCode className="h-8 w-8 text-primary mb-3" />
            <h4 className="font-semibold mb-2">QR Code Scanner</h4>
            <p className="text-sm text-muted-foreground">
              Quick patient lookup via QR
            </p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
