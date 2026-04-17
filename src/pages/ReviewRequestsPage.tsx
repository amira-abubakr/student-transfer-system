import React, { useState } from 'react';
import { Check, X, CheckSquare } from 'lucide-react';

const pending = [
  { initials: 'MZ', color: 'bg-primary-100 text-primary-700', name: 'Mariam Zaki Ibrahim', sub: 'G11 • #SC-8829104', from: 'Cairo Central',  status: 'PENDING'   },
  { initials: 'KA', color: 'bg-amber-100 text-amber-700',    name: 'Karim Ali Hassan',    sub: 'G10 • #SC-7721034',from: 'Giza Hub',       status: 'IN REVIEW' },
];

const branchStatus = [
  { name: 'Alexandria', status: 'Active',     color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Giza',       status: 'Active',     color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Luxor',      status: 'Processing', color: 'text-amber-600 bg-amber-50'     },
];

const completedTransfer = {
  student:    'Mariam Zaki Ibrahim',
  seat:       'SC-8829104',
  fromBranch: 'Cairo Central',
  toBranch:   'Alexandria North',
  timestamp:  'October 24, 2023 — 14:32 PM',
};

const ReviewRequestsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleApprove = () => setShowModal(true);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Review Requests</h1>
        <p className="text-slate-400 text-sm mt-1">Review and approve student migration across branches.</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Pending Reviews */}
        <div className="col-span-2">
          <h2 className="text-base font-bold text-slate-800 mb-3">Pending Reviews</h2>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['STUDENT','FROM BRANCH','STATUS','ACTIONS'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${row.color}`}>
                          {row.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{row.name}</p>
                          <p className="text-xs text-slate-400">{row.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.from}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        row.status === 'IN REVIEW' ? 'bg-primary-50 text-primary-600 border border-primary-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={handleApprove}
                          className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-red-400 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Capacity */}
          <div className="bg-primary-600 rounded-xl p-5 text-white">
            <CheckSquare className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-3xl font-bold">94%</p>
            <p className="text-xs text-white/70 mt-1">Approx Capacity this month</p>
          </div>

          {/* Branch Status */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Branch Status</h3>
            <div className="space-y-2">
              {branchStatus.map(b => (
                <div key={b.name} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{b.name}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.color}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Success Modal ─── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,15,30,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Green check icon */}
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Transfer completed</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The student transfer has been processed. Notifications have been sent to the target branch and the student's guardian.
            </p>

            {/* Details card */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-left mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Student Name</p>
                  <p className="text-sm font-bold text-slate-800">{completedTransfer.student}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Seat No.</p>
                  <p className="text-sm font-bold text-slate-800">{completedTransfer.seat}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">From Branch</p>
                  <p className="text-sm font-bold text-slate-800">{completedTransfer.fromBranch}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">To Branch</p>
                  <p className="text-sm font-bold text-slate-800">{completedTransfer.toBranch}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Timestamp</p>
                  <p className="text-sm font-bold text-slate-800">{completedTransfer.timestamp}</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-primary-600 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all mb-3">
              View student record
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewRequestsPage;
