export type EpisodeCategory = 'presence' | 'structure' | 'global';

export type PortfolioEpisode = {
  id: string;
  number: string;
  category: EpisodeCategory;
  title: string;
  tagline: string;
  minutes: number;
  diagram: [string, string, string];
  facts: {
    bottleneck: string;
    architecture: string;
    market: string;
    outcome: string;
  };
  acts: {
    conflict: string;
    investigation: string;
    engineering: string;
    impact: string;
  };
};
