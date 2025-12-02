import React, { useState, useEffect } from 'react';
import { MOLECULES } from './constants';
import { Molecule, Bond, Atom } from './types';
import MoleculeRenderer from './components/MoleculeRenderer';
import LabPanel from './components/LabPanel';
import QuizModal from './components/QuizModal';
import { generateExplanation, runVirtualExperiment, generateQuiz } from './services/geminiService';
import { FlaskConical } from 'lucide-react';

const App: React.FC = () => {
  const [activeMoleculeId, setActiveMoleculeId] = useState<string>(MOLECULES[0].id);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('欢迎来到化学键实验室！请点击左侧分子模型中的化学键（如双键、单键）或原子，AI 将为您解析其性质。');
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);

  const activeMolecule = MOLECULES.find(m => m.id === activeMoleculeId) || MOLECULES[0];

  // Reset interaction state when molecule changes
  useEffect(() => {
    setSelectedElementId(null);
    setAiResponse(`已加载 ${activeMolecule.name}。\n${activeMolecule.description}\n\n请尝试点击化学键进行学习，或在右侧运行虚拟实验。`);
  }, [activeMolecule]);

  const handleBondClick = async (bond: Bond) => {
    setSelectedElementId(bond.id);
    setLoading(true);
    setAiResponse("正在分析化学键性质...");
    const text = await generateExplanation(activeMolecule, `化学键: ${bond.description} (Bond ID: ${bond.id})`);
    setAiResponse(text);
    setLoading(false);
  };

  const handleAtomClick = async (atom: Atom) => {
    setSelectedElementId(atom.id);
    setLoading(true);
    setAiResponse("正在分析原子性质...");
    const text = await generateExplanation(activeMolecule, `原子: ${atom.element} (Atom ID: ${atom.id})`);
    setAiResponse(text);
    setLoading(false);
  };

  const handleLabAction = async (action: string) => {
    setLoading(true);
    setAiResponse(`正在模拟实验: ${action}...`);
    const text = await runVirtualExperiment(activeMolecule, action);
    setAiResponse(text);
    setLoading(false);
  };

  const handleStartQuiz = async () => {
    setLoading(true);
    const jsonStr = await generateQuiz(activeMolecule);
    try {
        const data = JSON.parse(jsonStr);
        if (data.question) {
            setQuizData(data);
            setIsQuizOpen(true);
        } else {
            setAiResponse("生成测验失败，请重试。");
        }
    } catch (e) {
        console.error(e);
        setAiResponse("生成测验数据解析错误。");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-lg text-white">
                <FlaskConical size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
              ChemLab AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-2">
               {MOLECULES.map(mol => (
                 <button
                   key={mol.id}
                   onClick={() => setActiveMoleculeId(mol.id)}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                     activeMoleculeId === mol.id 
                     ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                   }`}
                 >
                   {mol.name.split(' ')[0]}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Left Column: Visualization */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            {/* Mobile Molecule Selector */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2">
               {MOLECULES.map(mol => (
                 <button
                   key={mol.id}
                   onClick={() => setActiveMoleculeId(mol.id)}
                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                     activeMoleculeId === mol.id 
                     ? 'bg-slate-900 text-white' 
                     : 'bg-white text-slate-600 border border-slate-200'
                   }`}
                 >
                   {mol.name.split(' ')[0]}
                 </button>
               ))}
            </div>

            <div className="flex-1 min-h-[400px]">
              <MoleculeRenderer 
                molecule={activeMolecule} 
                onBondClick={handleBondClick}
                onAtomClick={handleAtomClick}
                selectedId={selectedElementId}
              />
            </div>
          </div>

          {/* Right Column: Lab Panel */}
          <div className="lg:col-span-1 h-full min-h-[500px]">
            <LabPanel 
              molecule={activeMolecule}
              loading={loading}
              explanation={aiResponse}
              onAction={handleLabAction}
              onQuiz={handleStartQuiz}
            />
          </div>

        </div>
      </main>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        data={quizData} 
      />
    </div>
  );
};

export default App;
