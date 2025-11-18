import { motion } from 'framer-motion';
import { Users, UserPlus, Calendar, TrendingUp, Activity, Stethoscope } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Patients', value: '1,248', icon: Users, trend: '+12% from last month', trendUp: true },
    { title: 'Total Doctors', value: '87', icon: Stethoscope, trend: '+3 new this month', trendUp: true },
    { title: 'Appointments Today', value: '45', icon: Calendar, trend: '12 pending', trendUp: false },
    { title: 'Department Occupancy', value: '78%', icon: Activity, trend: '+5% from yesterday', trendUp: true },
  ];

  const chartData = [
    { name: 'Jan', patients: 400, appointments: 240 },
    { name: 'Feb', patients: 300, appointments: 139 },
    { name: 'Mar', patients: 200, appointments: 980 },
    { name: 'Apr', patients: 278, appointments: 390 },
    { name: 'May', patients: 189, appointments: 480 },
    { name: 'Jun', patients: 239, appointments: 380 },
  ];

  const recentActivities = [
    { id: 1, action: 'New patient registered', patient: 'Priya Sharma', time: '5 minutes ago' },
    { id: 2, action: 'Appointment scheduled', patient: 'Amit Patel', time: '15 minutes ago' },
    { id: 3, action: 'Report uploaded', patient: 'Rahul Kumar', time: '1 hour ago' },
    { id: 4, action: 'Doctor added', patient: 'Dr. Arjun Mehta', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of hospital operations</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/patients">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Charts and Activities */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.patient}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/patients">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Manage Patients
              </Button>
            </Link>
            <Link to="/admin/doctors">
              <Button variant="outline" className="w-full">
                <Stethoscope className="mr-2 h-4 w-4" />
                Manage Doctors
              </Button>
            </Link>
            <Link to="/admin/resources">
              <Button variant="outline" className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                View Resources
              </Button>
            </Link>
            <Link to="/admin/analytics">
              <Button variant="outline" className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
