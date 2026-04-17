import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, AlertTriangle, Info, Check, X } from 'lucide-react';

interface TransferRequestsPageProps {
  defaultTab?: 'outgoing' | 'incoming';
}

const outgoing = [
  { initials: 'AM', name: 'Ahmed Mansour',  date: 'Applied: Oct 12, 2023', seat: '#ST-88210', grade: 'Grade 11 (B)', branch: 'Alexandria East', status: 'PENDING'  },
  { initials: 'SK', name: 'Sara Kamel',     date: 'Applied: Oct 10, 2023', seat: '#ST-88452', grade: 'Grade 10 (A)', branch: 'Giza Hub',        status: 'ACCEPTED' },
  { initials: 'YZ', name: 'Youssef Zaid',   date: 'Applied: Oct 08, 2023', seat: '#ST-87991', grade: 'Grade 12 (C)', branch: 'Luxor Branch',    status: 'PENDING'  },
];

const incoming = [
  { initials: 'LH', color: 'bg-rose-100 text-rose-700', name: 'Laila Hassan', sub: 'G11 • #ST-1120', from: 'Aswan Tech', status: 'IN REVIEW' },
];

const statusStyle: Record<string, string> = {
  PENDING:   'bg-amber-50 text-amber-600 border border-amber-200',
  ACCEPTED:  'bg-emerald-50 text-emerald-600 border border-emerald-200',
  REJECTED:  'bg-red-50 text-red-500 border border-red-200',
  'IN REVIEW':'bg-primary-50 text-primary-600 border border-primary-200',
};

const avatarColors = ['bg-primary-100 text-primary-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700'];

const TransferRequestsPage: React.FC<TransferRequestsPageProps> = ({ defaultTab = 'outgoing' }) => {
  const [tab, setTab] = useState<'outgoing' | 'incoming'>(defaultTab);
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transfer Requests</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and track student credit migrations across branches.</p>
        </div>
        <button
          onClick={() => navigate('/create-transfer')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md"
        >
          <span className="text-lg leading-none">+</span> New request
        </button>
      </div>

      {/* Tabs + Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setTab('outgoing')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'outgoing' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Outgoing (3)
          </button>
          <button
            onClick={() => setTab('incoming')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === 'incoming' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Incoming (1)
          </button>
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 w-52" placeholder="Search student name..." />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 hover:bg-slate-50">
          Branch: All <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 hover:bg-slate-50">
          Status: All <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {tab === 'outgoing' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['STUDENT','SEAT NO.','GRADE','TO BRANCH','STATUS','ACTIONS'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outgoing.map((row, i) => (
                <tr key={row.seat} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                        {row.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{row.name}</p>
                        <p className="text-xs text-slate-400">{row.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{row.seat}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{row.grade}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-slate-600">
                      <span className="text-primary-400">📍</span> {row.branch}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
            <span className="text-xs text-slate-400">Showing 3 of 12 outgoing requests</span>
            <div className="flex gap-1">
              <button className="w-7 h-7 border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:bg-slate-50">‹</button>
              <button className="w-7 h-7 border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:bg-slate-50">›</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'incoming' && (
        <div className="grid grid-cols-3 gap-4">
          {/* Table */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Incoming Requests</h2>
              <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2.5 py-0.5 rounded-full">URGENT (1)</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  {['STUDENT','FROM BRANCH','STATUS','ACTIONS'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incoming.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/50">
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
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition-colors">
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

          {/* Sidebar cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-1">Review Process Notice</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Incoming transfers must be validated against current seat availability in Grade 11 sections. Please check the seat registry before accepting.</p>
                  <button className="text-xs text-primary-600 font-semibold mt-2 hover:underline">View Seat Registry →</button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-1">System Capacity</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Cairo Branch is currently at 94% capacity. Only 6 seats remaining for new transfers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferRequestsPage;
