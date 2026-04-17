import React, { useState } from 'react';
import { Search, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TransferRecord {
  initials: string;
  color: string;
  name: string;
  id: string;
  grade: string;
  from: string;
  to: string;
  date: string;
  approvedBy: string;
  type: 'Outgoing' | 'Incoming';
}

const records: TransferRecord[] = [
  { initials: 'SK', color: 'bg-emerald-100 text-emerald-700', name: 'Sara Kamel',          id: '#ST-88452', grade: 'Grade 10 (A)', from: 'Cairo Branch',    to: 'Giza Hub',         date: 'Oct 12, 2023', approvedBy: 'Dr. Sarah',   type: 'Outgoing' },
  { initials: 'MZ', color: 'bg-violet-100 text-violet-700',   name: 'Mariam Zaki Ibrahim', id: '#ST-82910', grade: 'Grade 11 (B)', from: 'Cairo Central',   to: 'Alexandria North', date: 'Oct 24, 2023', approvedBy: 'Dr. Sarah',   type: 'Incoming' },
  { initials: 'FA', color: 'bg-cyan-100 text-cyan-700',       name: 'Fatma Amin',          id: '#ST-79301', grade: 'Grade 12 (A)', from: 'Cairo Branch',    to: 'Luxor Institute',  date: 'Sep 30, 2023', approvedBy: 'Admin User',  type: 'Outgoing' },
  { initials: 'BR', color: 'bg-rose-100 text-rose-700',       name: 'Bassem Ramadan',      id: '#ST-71120', grade: 'Grade 11 (C)', from: 'Mansoura Branch', to: 'Cairo Branch',     date: 'Sep 18, 2023', approvedBy: 'Dr. Sarah',   type: 'Incoming' },
  { initials: 'HS', color: 'bg-amber-100 text-amber-700',     name: 'Hana Sherif',         id: '#ST-68445', grade: 'Grade 10 (B)', from: 'Cairo Branch',    to: 'Alexandria East',  date: 'Sep 05, 2023', approvedBy: 'Admin User',  type: 'Outgoing' },
  { initials: 'WM', color: 'bg-indigo-100 text-indigo-700',   name: 'Walid Mostafa',       id: '#ST-55234', grade: 'Grade 12 (C)', from: 'Aswan Tech',      to: 'Cairo Branch',     date: 'Aug 28, 2023', approvedBy: 'Dr. Sarah',   type: 'Incoming' },
];

const TransferredPage: React.FC = () => {
  const [search, setSearch]   = useState('');
  const [typeFilter, setType] = useState<'All' | 'Outgoing' | 'Incoming'>('All');

  const filtered = records.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search);
    const matchType   = typeFilter === 'All' || r.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transferred Students</h1>
          <p className="text-slate-400 text-sm mt-1">Complete audit trail of all completed student transfers.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Transferred', value: '158',  color: 'text-primary-700' },
          { label: 'Outgoing',          value: '94',   color: 'text-amber-500'   },
          { label: 'Incoming',          value: '64',   color: 'text-emerald-600' },
          { label: 'This Month',        value: '12',   color: 'text-primary-600' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{c.label}</p>
            <p className={`text-3xl font-bold mt-2 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 w-full"
            placeholder="Search student or ID..."
          />
        </div>

        <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          {(['All', 'Outgoing', 'Incoming'] as const).map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${typeFilter === t ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 ml-auto">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {['STUDENT', 'TRANSFER ROUTE', 'GRADE', 'DATE', 'APPROVED BY', 'TYPE'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                {/* Student */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${r.color}`}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{r.id}</p>
                    </div>
                  </div>
                </td>

                {/* Route */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{r.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-primary-700 bg-primary-50 px-2 py-0.5 rounded text-xs font-medium">{r.to}</span>
                  </div>
                </td>

                {/* Grade */}
                <td className="px-5 py-4 text-sm text-slate-600">{r.grade}</td>

                {/* Date */}
                <td className="px-5 py-4 text-sm text-slate-500">{r.date}</td>

                {/* Approved by */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {r.approvedBy}
                  </div>
                </td>

                {/* Type badge */}
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    r.type === 'Outgoing'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                    {r.type}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                  No transfer records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} of 158 records</span>
          <div className="flex gap-1">
            {[1, 2, 3, '...', 14].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded text-xs font-medium transition-colors ${p === 1 ? 'bg-primary-600 text-white' : 'border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferredPage;
