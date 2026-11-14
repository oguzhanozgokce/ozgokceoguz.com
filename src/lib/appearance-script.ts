import { defaultSeed } from './seeds';

export const appearanceScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme'),s=localStorage.getItem('seed');if(t==='light'){d.classList.remove('dark');d.classList.add('light')}if(s&&s!=='${defaultSeed}')d.dataset.seed=s}catch(e){}})()`;
