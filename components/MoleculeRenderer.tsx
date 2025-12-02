import React from 'react';
import { Molecule, Atom, Bond, BondType, ElementType } from '../types';

interface MoleculeRendererProps {
  molecule: Molecule;
  onBondClick: (bond: Bond) => void;
  onAtomClick: (atom: Atom) => void;
  selectedId: string | null;
}

const ELEMENT_COLORS: Record<ElementType, string> = {
  [ElementType.C]: '#374151', // Gray-700
  [ElementType.H]: '#cbd5e1', // Slate-300
  [ElementType.O]: '#ef4444', // Red-500
  [ElementType.N]: '#3b82f6', // Blue-500
};

const ELEMENT_RADIUS: Record<ElementType, number> = {
  [ElementType.C]: 20,
  [ElementType.H]: 12,
  [ElementType.O]: 18,
  [ElementType.N]: 18,
};

const MoleculeRenderer: React.FC<MoleculeRendererProps> = ({ molecule, onBondClick, onAtomClick, selectedId }) => {

  const renderBond = (bond: Bond) => {
    const source = molecule.atoms.find(a => a.id === bond.sourceId);
    const target = molecule.atoms.find(a => a.id === bond.targetId);

    if (!source || !target) return null;

    const isSelected = selectedId === bond.id;
    const strokeColor = isSelected ? '#3b82f6' : '#94a3b8'; // Blue if selected, Gray otherwise
    const strokeWidth = isSelected ? 4 : 2;

    // Vector math for parallel lines
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const ox = -uy * 4; // Offset vector X
    const oy = ux * 4;  // Offset vector Y

    if (bond.type === BondType.Double) {
      return (
        <g key={bond.id} onClick={() => onBondClick(bond)} className="cursor-pointer hover:opacity-80 transition-opacity">
          {/* Invisible wide path for easier clicking */}
          <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="transparent" strokeWidth="20" />
          <line x1={source.x + ox} y1={source.y + oy} x2={target.x + ox} y2={target.y + oy} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1={source.x - ox} y1={source.y - oy} x2={target.x - ox} y2={target.y - oy} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        </g>
      );
    }

    if (bond.type === BondType.Triple) {
        const ox2 = -uy * 8;
        const oy2 = ux * 8;
        return (
          <g key={bond.id} onClick={() => onBondClick(bond)} className="cursor-pointer hover:opacity-80 transition-opacity">
             <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="transparent" strokeWidth="20" />
            <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <line x1={source.x + ox2} y1={source.y + oy2} x2={target.x + ox2} y2={target.y + oy2} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <line x1={source.x - ox2} y1={source.y - oy2} x2={target.x - ox2} y2={target.y - oy2} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </g>
        );
    }

    // Single bond
    return (
      <g key={bond.id} onClick={() => onBondClick(bond)} className="cursor-pointer hover:opacity-80 transition-opacity">
        <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="transparent" strokeWidth="15" />
        <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      </g>
    );
  };

  const renderAtom = (atom: Atom) => {
    const isSelected = selectedId === atom.id;
    return (
      <g key={atom.id} onClick={(e) => { e.stopPropagation(); onAtomClick(atom); }} className="cursor-pointer transition-transform hover:scale-110">
        <circle
          cx={atom.x}
          cy={atom.y}
          r={ELEMENT_RADIUS[atom.element]}
          fill={ELEMENT_COLORS[atom.element]}
          stroke={isSelected ? '#3b82f6' : 'white'}
          strokeWidth={isSelected ? 3 : 2}
          className="shadow-lg"
        />
        <text
          x={atom.x}
          y={atom.y}
          dy=".35em"
          textAnchor="middle"
          fill={atom.element === ElementType.H ? '#475569' : 'white'}
          fontSize={atom.element === ElementType.H ? 12 : 14}
          fontWeight="bold"
          pointerEvents="none"
        >
          {atom.element}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-full bg-slate-50 rounded-xl border border-slate-200 shadow-inner overflow-hidden relative">
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-sm text-slate-600 z-10 border border-slate-100 shadow-sm">
        <p className="font-semibold">{molecule.name}</p>
        <p className="text-xs">{molecule.formula}</p>
        <p className="text-xs mt-1 text-slate-400">点击化学键或原子查看详情</p>
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        {/* Draw Bonds first so they are behind atoms */}
        {molecule.bonds.map(renderBond)}
        {/* Draw Atoms */}
        {molecule.atoms.map(renderAtom)}
      </svg>
    </div>
  );
};

export default MoleculeRenderer;
