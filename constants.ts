import { Molecule, ElementType, BondType } from './types';

// Helper to create cleaner coordinates
const CX = 300;
const CY = 200;
const SCALE = 60;

export const MOLECULES: Molecule[] = [
  {
    id: 'ethene',
    name: '乙烯 (Ethene)',
    formula: 'C₂H₄',
    description: '最简单的烯烃，包含一个碳碳双键。',
    atoms: [
      { id: 'c1', element: ElementType.C, x: CX - SCALE, y: CY },
      { id: 'c2', element: ElementType.C, x: CX + SCALE, y: CY },
      { id: 'h1', element: ElementType.H, x: CX - SCALE - SCALE * 0.8, y: CY - SCALE * 1.2 },
      { id: 'h2', element: ElementType.H, x: CX - SCALE - SCALE * 0.8, y: CY + SCALE * 1.2 },
      { id: 'h3', element: ElementType.H, x: CX + SCALE + SCALE * 0.8, y: CY - SCALE * 1.2 },
      { id: 'h4', element: ElementType.H, x: CX + SCALE + SCALE * 0.8, y: CY + SCALE * 1.2 },
    ],
    bonds: [
      { id: 'b1', sourceId: 'c1', targetId: 'c2', type: BondType.Double, description: 'C=C 双键 (1σ + 1π)' },
      { id: 'b2', sourceId: 'c1', targetId: 'h1', type: BondType.Single, description: 'C-H 单键 (sp²-s σ)' },
      { id: 'b3', sourceId: 'c1', targetId: 'h2', type: BondType.Single, description: 'C-H 单键 (sp²-s σ)' },
      { id: 'b4', sourceId: 'c2', targetId: 'h3', type: BondType.Single, description: 'C-H 单键 (sp²-s σ)' },
      { id: 'b5', sourceId: 'c2', targetId: 'h4', type: BondType.Single, description: 'C-H 单键 (sp²-s σ)' },
    ],
    labActions: ['加入溴水 (Br₂)', '加入酸性高锰酸钾 (KMnO₄)', '加氢反应 (H₂)', '分析杂化轨道']
  },
  {
    id: 'ethane',
    name: '乙烷 (Ethane)',
    formula: 'C₂H₆',
    description: '饱和烷烃，碳原子之间通过单键连接，可以自由旋转。',
    atoms: [
      { id: 'c1', element: ElementType.C, x: CX - SCALE, y: CY },
      { id: 'c2', element: ElementType.C, x: CX + SCALE, y: CY },
      { id: 'h1', element: ElementType.H, x: CX - SCALE - SCALE * 0.8, y: CY - SCALE * 1.0 },
      { id: 'h2', element: ElementType.H, x: CX - SCALE - SCALE * 0.5, y: CY + SCALE * 1.3 },
      { id: 'h3', element: ElementType.H, x: CX - SCALE - SCALE * 0.5, y: CY - SCALE * 1.3 }, // Behind roughly
      { id: 'h4', element: ElementType.H, x: CX + SCALE + SCALE * 0.8, y: CY - SCALE * 1.0 },
      { id: 'h5', element: ElementType.H, x: CX + SCALE + SCALE * 0.5, y: CY + SCALE * 1.3 },
      { id: 'h6', element: ElementType.H, x: CX + SCALE + SCALE * 0.5, y: CY - SCALE * 1.3 },
    ],
    bonds: [
      { id: 'b1', sourceId: 'c1', targetId: 'c2', type: BondType.Single, description: 'C-C 单键 (sp³-sp³ σ)' },
      { id: 'b2', sourceId: 'c1', targetId: 'h1', type: BondType.Single, description: 'C-H 单键' },
      { id: 'b3', sourceId: 'c1', targetId: 'h2', type: BondType.Single, description: 'C-H 单键' },
      { id: 'b4', sourceId: 'c1', targetId: 'h3', type: BondType.Single, description: 'C-H 单键' },
      { id: 'b5', sourceId: 'c2', targetId: 'h4', type: BondType.Single, description: 'C-H 单键' },
      { id: 'b6', sourceId: 'c2', targetId: 'h5', type: BondType.Single, description: 'C-H 单键' },
      { id: 'b7', sourceId: 'c2', targetId: 'h6', type: BondType.Single, description: 'C-H 单键' },
    ],
    labActions: ['加入溴水 (Br₂)', '光照卤代反应', '燃烧分析']
  },
  {
    id: 'ethyne',
    name: '乙炔 (Ethyne)',
    formula: 'C₂H₂',
    description: '最简单的炔烃，包含一个碳碳三键，分子呈直线型。',
    atoms: [
      { id: 'c1', element: ElementType.C, x: CX - SCALE * 0.8, y: CY },
      { id: 'c2', element: ElementType.C, x: CX + SCALE * 0.8, y: CY },
      { id: 'h1', element: ElementType.H, x: CX - SCALE * 2.5, y: CY },
      { id: 'h2', element: ElementType.H, x: CX + SCALE * 2.5, y: CY },
    ],
    bonds: [
      { id: 'b1', sourceId: 'c1', targetId: 'c2', type: BondType.Triple, description: 'C≡C 三键 (1σ + 2π)' },
      { id: 'b2', sourceId: 'c1', targetId: 'h1', type: BondType.Single, description: 'C-H 单键 (sp-s σ)' },
      { id: 'b3', sourceId: 'c2', targetId: 'h2', type: BondType.Single, description: 'C-H 单键 (sp-s σ)' },
    ],
    labActions: ['加入溴水 (Br₂)', '燃烧观察火焰', '分析键长']
  }
];
