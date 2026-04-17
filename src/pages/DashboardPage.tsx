import React from 'react';
import { AlertCircle, CheckCircle2, Clock, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const metrics = [
  {
    label: 'TOTAL STUDENTS',
    value: '1,284',
    sub: '↑ 4% from last term',
    subColor: 'text-emerald-600',
    valueColor: 'text-primary-700',
  },
  {
    label: 'PENDING OUTGOING',
    value: '42',
    sub: '⊙ Average 3 days wait',
    subColor: 'text-amber-600',
    valueColor: 'text-amber-500',
  },
  {
    label: 'ACCEPTED THIS MONTH',
    value: '156',
    sub: '✓ Peak efficiency reached',
    subColor: 'text-emerald-600',
    valueColor: 'text-emerald-500',
  },
  {
    label: 'ACTION REQUIRED',
    value: '08',
    sub: '! Requires branch head approval',
    subColor: 'text-orange-500',
    valueColor: 'text-orange-400',
  },
];

const branches = [
  { name: 'Alexandria Campus', students: 84, pct: 84 },
  { name: 'Giza Hub',          students: 62, pct: 62 },
  { name: 'Luxor Institute',   students: 31, pct: 31 },
  { name: 'Mansoura Branch',   students: 19, pct: 19 },
];

const requestStatuses = [
  { label: 'Final Approval',     status: 'COMPLETED',    color: 'text-emerald-600 bg-emerald-50',  icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
  { label: 'Credit Verification',status: 'IN PROGRESS',  color: 'text-amber-600 bg-amber-50',      icon: <Clock className="w-4 h-4 text-amber-500" /> },
  { label: 'Document Audit',     status: 'ACTION NEEDED',color: 'text-orange-600 bg-orange-50',    icon: <AlertCircle className="w-4 h-4 text-orange-500" /> },
  { label: 'Initial Screening',  status: 'QUEUED',       color: 'text-slate-500 bg-slate-100',     icon: <History className="w-4 h-4 text-slate-400" /> },
];

const recentActivity = [
  { dot: 'bg-emerald-500', title: 'Transfer Request Approved',  desc: 'Student ID #44921 transferred to Alexandria Main.',           time: 'Today, 09:42 AM' },
  { dot: 'bg-amber-500',   title: 'Document Missing Warning',   desc: 'Incomplete transcripts for #90218 (Giza Hub request).',       time: 'Today, 08:15 AM' },
  { dot: 'bg-orange-400',  title: 'Urgent Action Required',     desc: 'System flagged 3 duplicate records in Cairo Branch.',         time: 'Yesterday, 04:30 PM' },
  { dot: 'bg-primary-400', title: 'New Bulk Export Generated',  desc: 'Monthly transfer report exported by Administrator.',          time: 'Yesterday, 11:20 AM' },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Good morning, {user?.name}</h1>
        <p className="text-slate-400 mt-1 text-sm">Here's what's happening across your branch today.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">{m.label}</p>
            <p className={`text-4xl font-bold mt-2 ${m.valueColor}`}>{m.value}</p>
            <p className={`text-xs mt-2 font-medium ${m.subColor}`}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Transfers by branch */}
        <div className="col-span-3 bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">Transfers by branch</h2>
            <button className="text-xs text-primary-600 hover:underline font-medium">View Detailed Report</button>
          </div>
          <div className="space-y-4">
            {branches.map((b) => (
              <div key={b.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-700">{b.name}</span>
                  <span className="text-slate-400 text-xs">{b.students} students</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-700"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status Overview */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Request Status Overview</h2>
          <div className="space-y-3">
            {requestStatuses.map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
                {s.icon}
                <span className="flex-1 text-sm text-slate-700">{s.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Recent Activity</h2>
        <div className="space-y-0">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-slate-50 last:border-0">
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
