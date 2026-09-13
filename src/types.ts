export type ProjectCategory = 
  | 'All Pins'
  | 'Dev Tools'
  | 'AI & Micro-SaaS'
  | 'Design & Fonts'
  | 'Productivity'
  | 'Open Source';

export interface TearOffSlip {
  id: string;
  title: string;
  subtitle: string;
  actionType: 'tip' | 'copy' | 'link';
  actionPayload?: string;
  amount?: number;
}

export interface ProjectPin {
  id: string;
  title: string;
  pitch: string;
  category: ProjectCategory;
  categoryLabel?: string;
  website?: string;
  repoUrl?: string;
  statusText?: string;
  versionBadge?: string;
  pushpinColor: 'primary' | 'tertiary' | 'secondary' | 'emerald' | 'amber';
  gridSpan: 'hero' | 'tall' | 'compact' | 'wide';
  views: number;
  supporters: number;
  tipTotal: number;
  updatedAgo: string;
  slips: TearOffSlip[];
  stacks: string[];
  tags: string[];
  author?: {
    name: string;
    handle: string;
    avatar?: string;
  };
  details?: {
    fullDescription: string;
    features: string[];
    changelog?: { version: string; date: string; notes: string }[];
    astMatch?: number;
    codeSnippet?: string;
    ramSaved?: string;
  };
}

export interface CheerMessage {
  id: string;
  projectId: string;
  author: string;
  amount?: number;
  message: string;
  timestamp: string;
}
