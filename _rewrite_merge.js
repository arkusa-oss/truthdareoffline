// Merge rewritten texts back into the source JS files.
// Usage: node _rewrite_merge.js <rewrites.json>
// rewrites.json = [{ id, text }, ...]
const fs = require('fs');

function loadConst(file, name) {
  const src = fs.readFileSync(file, 'utf8');
  const fn = new Function(src + '\nreturn ' + name + ';');
  return fn();
}

// Multiset of every {placeholder} token, order-independent.
function placeholderSig(s) {
  return (s.match(/\{[a-z_]+\}/gi) || []).map(x => x.toLowerCase()).sort().join(',');
}

function leadingComments(src) {
  const out = [];
  for (const line of src.split('\n')) {
    if (line.startsWith('//') || line.trim() === '') out.push(line);
    else break;
  }
  return out.join('\n').trimEnd();
}

const rewritesFile = process.argv[2];
const rewrites = JSON.parse(fs.readFileSync(rewritesFile, 'utf8'));
const map = {};
rewrites.forEach(r => { if (r && r.id) map[r.id] = r.text; });

const targets = [
  { file: 'prompts_v2.js', name: 'CSV_PROMPTS' },
  { file: 'couples_prompts_v2.js', name: 'CSV_COUPLES_PROMPTS' }
];

let stats = { total: 0, replaced: 0, missing: 0, placeholderMismatch: 0, kept: [] };

targets.forEach(t => {
  const arr = loadConst(t.file, t.name);
  arr.forEach(p => {
    stats.total++;
    const nt = map[p.id];
    if (!nt) { stats.missing++; return; }
    // Safety: never accept a rewrite that changes the placeholder set.
    if (placeholderSig(nt) !== placeholderSig(p.text)) {
      stats.placeholderMismatch++;
      stats.kept.push(p.id);
      return; // keep original
    }
    if (!nt.trim()) { stats.missing++; return; } // empty rewrite -> keep original
    p.text = nt;
    stats.replaced++;
  });

  const header = leadingComments(fs.readFileSync(t.file, 'utf8'));
  const body = 'const ' + t.name + ' = ' + JSON.stringify(arr, null, 2) + ';\n';
  fs.writeFileSync(t.file, header + '\n\n' + body);
  console.log('wrote', t.file, '(' + arr.length + ' prompts)');
});

console.log(JSON.stringify(stats, null, 2));
