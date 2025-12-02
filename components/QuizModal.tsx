import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizData {
  question: string;
  options: string[];
  answer: string; // index as string
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuizData | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen || !data) return null;

  const handleOptionClick = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const correctIndex = parseInt(data.answer);
  const isCorrect = selected === correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">知识测验</h3>
          <p className="text-slate-600 text-base mb-6 font-medium">{data.question}</p>
          
          <div className="space-y-3">
            {data.options.map((opt, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
              
              if (showResult) {
                if (idx === correctIndex) {
                    btnClass += "border-green-500 bg-green-50 text-green-700";
                } else if (idx === selected && idx !== correctIndex) {
                    btnClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                    btnClass += "border-slate-100 text-slate-400 opacity-50";
                }
              } else {
                btnClass += "border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 text-slate-600";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={btnClass}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'} flex items-start gap-3`}>
               {isCorrect ? <CheckCircle className="text-green-600 w-6 h-6 shrink-0" /> : <XCircle className="text-red-600 w-6 h-6 shrink-0" />}
               <div>
                 <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-1`}>
                    {isCorrect ? '回答正确!' : '回答错误'}
                 </p>
                 <p className="text-sm text-slate-700 leading-relaxed">{data.explanation}</p>
               </div>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-4 flex justify-end">
          <button 
            onClick={() => { setShowResult(false); setSelected(null); onClose(); }}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
