import React, { useState } from 'react';
import { Search, ChevronDown, UserPlus } from 'lucide-react';

interface Student {
  initials: string;
  color: string;
  name: string;
  id: string;
  grade: string;
  branch: string;
  guardian: string;
  status: 'Active' | 'Transferred' | 'Pending';
}

const students: Student[] = [
  { initials: 'AM', color: 'bg-primary-100 text-primary-700', name: 'Ahmed Mansour',     id: '#ST-88210', grade: 'Grade 11 (B)', branch: 'Cairo Branch',     guardian: 'Mansour Ali',      status: 'Active'      },
  { initials: 'SK', color: 'bg-emerald-100 text-emerald-700', name: 'Sara Kamel',         id: '#ST-88452', grade: 'Grade 10 (A)', branch: 'Cairo Branch',     guardian: 'Kamel Farouk',     status: 'Transferred' },
  { initials: 'YZ', color: 'bg-amber-100 text-amber-700',     name: 'Youssef Zaid',       id: '#ST-87991', grade: 'Grade 12 (C)', branch: 'Cairo Branch',     guardian: 'Zaid Hassan',      status: 'Pending'     },
  { initials: 'LH', color: 'bg-rose-100 text-rose-700',       name: 'Laila Hassan',       id: '#ST-11200', grade: 'Grade 11 (A)', branch: 'Aswan Tech',       guardian: 'Hassan Ibrahim',   status: 'Active'      },
  { initials: 'MZ', color: 'bg-violet-100 text-violet-700',   name: 'Mariam Zaki',        id: '#ST-82910', grade: 'Grade 11 (B)', branch: 'Cairo Central',    guardian: 'Zaki Mohamed',     status: 'Transferred' },
  { initials: 'KA', color: 'bg-cyan-100 text-cyan-700',       name: 'Karim Ali Hassan',   id: '#ST-77210', grade: 'Grade 10 (A)', branch: 'Giza Hub',         guardian: 'Ali Hassan',       status: 'Active'      },
  { initials: 'NM', color: 'bg-fuchsia-100 text-fuchsia-700', name: 'Nour Mohamed',       id: '#ST-66543', grade: 'Grade 12 (A)', branch: 'Cairo Branch',     guardian: 'Mohamed Samir',    status: 'Active'      },
  { initials: 'OA', color: 'bg-orange-100 text-orange-700',   name: 'Omar Abdelrahman',   id: '#ST-55120', grade: 'Grade 11 (C)', branch: 'Alexandria East',  guardian: 'Abdelrahman Said', status: 'Pending'     },
  { initials: 'RA', color: 'bg-teal-100 text-teal-700',       name: 'Rania Ahmed',        id: '#ST-44981', grade: 'Grade 10 (B)', branch: 'Mansoura Branch',  guardian: 'Ahmed Hossam',     status: 'Active'      },
  { initials: 'HF', color: 'bg-indigo-100 text-indigo-700',   name: 'Hassan Farid',       id: '#ST-33762', grade: 'Grade 12 (B)', branch: 'Luxor Institute',  guardian: 'Farid Nabil',      status: 'Active'      },
];

const statusStyle: Record<string, string> = {
  Active:      'bg-emerald-50 text-emerald-600 border border-emerald-200',
  Transferred: 'bg-primary-50 text-primary-600 border border-primary-200',
  Pending:     'bg-amber-50 text-amber-600 border border-amber-200',
};

const AllStudentsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterGrade,  setFilterGrade]  = useState<string>('All');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;
    const matchGrade  = filterGrade  === 'All' || s.grade.startsWith(filterGrade);
    return matchSearch && matchStatus && matchGrade;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Students</h1>
          <p className="text-slate-400 text-sm mt-1">View and manage all enrolled students across branches.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md">
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Students', value: '1,284', sub: 'Across all branches', color: 'text-primary-700' },
          { label: 'Active',         value: '1,126', sub: 'Currently enrolled',  color: 'text-emerald-600' },
          { label: 'Transferred',    value: '158',   sub: 'This academic year',  color: 'text-amber-500'   },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{c.label}</p>
            <p className={`text-3xl font-bold mt-2 ${c.color}`}>{c.value}</p>
            <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 w-full"
            placeholder="Search by name or ID..."
          />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="pl-4 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            {['All', 'Active', 'Transferred', 'Pending'].map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterGrade}
            onChange={e => setFilterGrade(e.target.value)}
            className="pl-4 pr-8 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            {['All', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => <option key={g}>{g}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <span className="text-xs text-slate-400 ml-auto">{filtered.length} students found</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {['STUDENT', 'SEAT NO.', 'GRADE', 'BRANCH', 'GUARDIAN', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.color}`}>
                      {s.initials}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500 font-mono">{s.id}</td>
                <td className="px-5 py-3.5 text-sm text-slate-600">{s.grade}</td>
                <td className="px-5 py-3.5 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="text-primary-400 text-xs">📍</span> {s.branch}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500">{s.guardian}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} of 1,284 students</span>
          <div className="flex gap-1">
            {[1,2,3,'...', 12].map((p, i) => (
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

export default AllStudentsPage;

