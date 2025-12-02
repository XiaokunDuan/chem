import React from 'react';
import { Molecule } from '../types';
import { Beaker, Atom, Loader2, Sparkles, BookOpen } from 'lucide-react';

interface LabPanelProps {
  molecule: Molecule;
  loading: boolean;
  explanation: string;
  onAction: (action: string) => void;
  onQuiz: () => void;
}

const LabPanel: React.FC<LabPanelProps> = ({ molecule, loading, explanation, onAction, onQuiz }) => {
  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Beaker className="w-5 h-5 text-teal-400" />
          <h2 className="font-semibold text-lg">AI 实验助手</h2>
        </div>
        {loading && <Loader2 className="w-5 h-5 animate-spin text-teal-400" />}
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Info Block */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Atom className="w-4 h-4" /> 
            分析结果
          </h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700 leading-relaxed text-sm min-h-[100px] prose prose-sm prose-slate max-w-none">
             {/* Simple markdown rendering by splitting lines or using a library. 
                 Since no external libs allowed, we rely on basic whitespace handling or just text. 
                 Gemini usually returns Markdown. We will just display text here cleanly. */}
             <div className="whitespace-pre-wrap font-mono text-xs md:text-sm text-slate-600">
               {explanation ? explanation : "选择左侧的化学键或原子，或在下方运行实验..."}
             </div>
          </div>
        </section>

        {/* Experiments */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            虚拟实验操作
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {molecule.labActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onAction(action)}
                disabled={loading}
                className="w-full text-left px-4 py-3 rounded-lg bg-white border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm text-slate-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group"
              >
                {action}
                <span className="opacity-0 group-hover:opacity-100 text-teal-600 transition-opacity">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* Quiz Button */}
        <section className="pt-4 border-t border-slate-100">
             <button
                onClick={onQuiz}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-md shadow-indigo-200"
              >
                <BookOpen className="w-4 h-4" />
                生成知识测验
              </button>
        </section>

      </div>
    </div>
  );
};

export default LabPanel;
