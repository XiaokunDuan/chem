export enum ElementType {
  C = 'C',
  H = 'H',
  O = 'O',
  N = 'N'
}

export enum BondType {
  Single = 'single',
  Double = 'double',
  Triple = 'triple',
  Aromatic = 'aromatic'
}

export interface Atom {
  id: string;
  element: ElementType;
  x: number; // SVG coordinate x
  y: number; // SVG coordinate y
  label?: string;
}

export interface Bond {
  id: string;
  sourceId: string;
  targetId: string;
  type: BondType;
  description: string; // Short ID description like "C-H Sigma Bond"
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  description: string;
  atoms: Atom[];
  bonds: Bond[];
  labActions: string[]; // List of available "experiments" like "Add Br2"
}

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};
