const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /bg-\[#0a0a0a\]/g, replacement: 'bg-gray-50' },
  { regex: /bg-\[#141414\]/g, replacement: 'bg-white' },
  { regex: /bg-\[#1f1f1f\]/g, replacement: 'bg-gray-100' },
  { regex: /text-\[#9333ea\]/g, replacement: 'text-red-600' },
  { regex: /bg-\[#9333ea\]/g, replacement: 'bg-red-600' },
  { regex: /border-\[#9333ea\]/g, replacement: 'border-red-600' },
  { regex: /hover:text-\[#9333ea\]/g, replacement: 'hover:text-red-600' },
  { regex: /hover:bg-\[#9333ea\]/g, replacement: 'hover:bg-red-600' },
  { regex: /hover:border-\[#9333ea\]/g, replacement: 'hover:border-red-600' },
  { regex: /text-\[#7e22ce\]/g, replacement: 'text-red-700' },
  { regex: /bg-\[#7e22ce\]/g, replacement: 'bg-red-700' },
  { regex: /hover:text-\[#7e22ce\]/g, replacement: 'hover:text-red-700' },
  { regex: /hover:bg-\[#7e22ce\]/g, replacement: 'hover:bg-red-700' },
  { regex: /text-\[#999999\]/g, replacement: 'text-gray-500' },
  { regex: /border-white\/10/g, replacement: 'border-gray-200' },
  { regex: /text-white/g, replacement: 'text-gray-900' },
  { regex: /text-\[#a855f7\]/g, replacement: 'text-red-500' },
  { regex: /hover:text-\[#a855f7\]/g, replacement: 'hover:text-red-500' },
  { regex: /bg-\[#4ade80\]/g, replacement: 'bg-green-500' },
  { regex: /text-\[#4ade80\]/g, replacement: 'text-green-600' },
  { regex: /bg-\[#1a472a\]/g, replacement: 'bg-green-100' },
  { regex: /bg-\[#471a1a\]/g, replacement: 'bg-red-100' },
  { regex: /text-\[#de4a4a\]/g, replacement: 'text-red-600' },
  { regex: /bg-\[#473c1a\]/g, replacement: 'bg-yellow-100' },
  { regex: /text-\[#deb84a\]/g, replacement: 'text-yellow-600' },
  { regex: /bg-zinc-950/g, replacement: 'bg-gray-50' },
  { regex: /bg-zinc-900/g, replacement: 'bg-white' },
  { regex: /bg-zinc-800/g, replacement: 'bg-gray-100' },
  { regex: /border-zinc-800/g, replacement: 'border-gray-200' },
  { regex: /border-zinc-700/g, replacement: 'border-gray-300' },
  { regex: /text-zinc-400/g, replacement: 'text-gray-500' },
  { regex: /text-zinc-500/g, replacement: 'text-gray-400' },
  { regex: /text-zinc-300/g, replacement: 'text-gray-600' },
  { regex: /divide-white\/10/g, replacement: 'divide-gray-200' },
  { regex: /divide-zinc-800/g, replacement: 'divide-gray-200' },
  { regex: /prose-invert/g, replacement: '' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      // Fixes for text-gray-900 inside buttons that should be text-white
      content = content.replace(/bg-red-600 hover:bg-red-700 text-gray-900/g, 'bg-red-600 hover:bg-red-700 text-white');
      content = content.replace(/bg-red-600 text-gray-900/g, 'bg-red-600 text-white');
      content = content.replace(/bg-gray-900 text-gray-900/g, 'bg-gray-900 text-white');
      content = content.replace(/bg-green-500 text-gray-900/g, 'bg-green-500 text-white');
      content = content.replace(/text-gray-900 px-8 py-3/g, 'text-white px-8 py-3');
      content = content.replace(/text-gray-900 px-6 py-3/g, 'text-white px-6 py-3');
      content = content.replace(/text-gray-900 py-3/g, 'text-white py-3');
      content = content.replace(/text-gray-900 py-4/g, 'text-white py-4');
      content = content.replace(/bg-white text-black/g, 'bg-gray-900 text-white');
      content = content.replace(/border-white text-gray-900/g, 'border-gray-900 text-gray-900');
      content = content.replace(/hover:bg-white hover:text-black/g, 'hover:bg-gray-900 hover:text-white');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
