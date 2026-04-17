import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ShieldCheck, Clock, FileText } from 'lucide-react';

const grades = ['Grade 10 (A)', 'Grade 10 (B)', 'Grade 11 (A)', 'Grade 11 (B)', 'Grade 11 (C)', 'Grade 12 (A)', 'Grade 12 (B)', 'Grade 12 (C)'];
const years  = ['2024/2025', '2023/2024', '2022/2023'];
const destBranches = ['Alexandria East', 'Giza Hub', 'Luxor Branch', 'Aswan Tech', 'Mansoura Branch'];

const hints = [
  { icon: <ShieldCheck className="w-5 h-5 text-primary-500" />, title: 'Verify Data',       desc: 'Ensure the seat number matches the centralized database to avoid transfer delays.' },
  { icon: <Clock        className="w-5 h-5 text-primary-500" />, title: 'Processing Time',  desc: 'Approval cycles typically take 24–48 business hours at the receiving branch.' },
  { icon: <FileText     className="w-5 h-5 text-primary-500" />, title: 'Documentation',    desc: 'Digital copies of student transcripts will be automatically attached upon approval.' },
];

const CreateTransferPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentName: '',
    seatNumber: '',
    grade: '',
    year: '2023/2024',
    destBranch: '',
    reason: '',
    notes: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/outgoing');
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition';

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Transfer Request</h1>
        <p className="text-slate-400 text-sm mt-1">Initiate a student record transfer between academy branches.</p>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl px-5 py-3.5 mb-6">
        <Info className="w-4 h-4 text-primary-600 flex-shrink-0" />
        <p className="text-sm text-primary-700">
          The admin of the destination branch must approve this request before any data is moved.
        </p>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 mb-4">
          <div className="grid grid-cols-2 gap-5">
            {/* Student Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Student Full Name</label>
              <input className={inputCls} placeholder="e.g. Omar Abdelrahman" value={form.studentName} onChange={set('studentName')} />
            </div>

            {/* Seat Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Seat Number</label>
              <input className={inputCls} placeholder="e.g. 2024-XP-001" value={form.seatNumber} onChange={set('seatNumber')} />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Grade / Class</label>
              <div className="relative">
                <select className={inputCls + ' appearance-none pr-8'} value={form.grade} onChange={set('grade')}>
                  <option value="">Select grade...</option>
                  {grades.map(g => <option key={g}>{g}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▾</span>
              </div>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Academic Year</label>
              <div className="relative">
                <select className={inputCls + ' appearance-none pr-8'} value={form.year} onChange={set('year')}>
                  {years.map(y => <option key={y}>{y}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▾</span>
              </div>
            </div>

            {/* Current Branch */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Current Branch</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📍</span>
                <input className={inputCls + ' pl-8 bg-slate-100 cursor-not-allowed'} value="Cairo Branch" readOnly />
              </div>
            </div>

            {/* Transfer To */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Transfer To Branch</label>
              <div className="relative">
                <select className={inputCls + ' appearance-none pr-8'} value={form.destBranch} onChange={set('destBranch')}>
                  <option value="">Select destination branch...</option>
                  {destBranches.map(b => <option key={b}>{b}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▾</span>
              </div>
            </div>

            {/* Reason */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Reason for Transfer</label>
              <textarea
                className={inputCls + ' h-24 resize-none'}
                placeholder="Provide a detailed explanation for the transfer request..."
                value={form.reason}
                onChange={set('reason')}
              />
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Supporting Notes</label>
              <textarea
                className={inputCls + ' h-20 resize-none'}
                placeholder="Additional administrative notes (optional)..."
                value={form.notes}
                onChange={set('notes')}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="submit" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md">
            Send request
          </button>
          <button type="button" className="px-6 py-2.5 border border-primary-600 text-primary-700 hover:bg-primary-50 font-semibold text-sm rounded-xl transition-all">
            Save as draft
          </button>
          <button type="button" onClick={() => navigate(-1)} className="ml-auto text-sm text-slate-400 hover:text-slate-700 transition-colors">
            Cancel
          </button>
        </div>
      </form>

      {/* Hints */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {hints.map((h) => (
          <div key={h.title} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div className="mb-3">{h.icon}</div>
            <p className="text-sm font-semibold text-slate-800 mb-1">{h.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTransferPage;
