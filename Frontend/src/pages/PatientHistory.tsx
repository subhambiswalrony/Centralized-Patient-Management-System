import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  FileText,
} from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PatientHistory() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("CPMS-Auth-token");


  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/patient/get-history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      setHistory(data.data);
    } catch (error) {
      console.log("Failed to fetch history:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">My History</h1>
        <p className="text-muted-foreground">View your Medical History</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-xl p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback className="text-3xl">
                  {user?.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{user?.fullName}</h2>
                <p className="text-muted-foreground mb-4">
                  Patient ID: {user?.id}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.age} years old</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>Blood Group: {user?.bloodGroup}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Past Treatments</h3>
            </div>
            <div className="space-y-4">
              {history.map((history, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="font-medium">{history.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">
                        {history.treatment}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-end space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Visit Date: {new Date(history.visitDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Follow-up Date: {history.followUpDate ? new Date(history.followUpDate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Sidebar */}
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Your QR Code
            </h3>
            <QRCodeDisplay value={user?.id || "PT-1001"} title="" size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
