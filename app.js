import { filter } from './src/components/Filter/Filter.js';
import { header } from './src/components/Header/Header.js';
import { league } from './src/components/League/League.js';
import { results } from './src/components/Results/Results.js';
import { team } from './src/components/Team/Team.js';

// Bootstrapping these custom elements
const app = () => {
  filter();
  header();
  league();
  results();
  team();
};

document.addEventListener('DOMContentLoaded', app);
