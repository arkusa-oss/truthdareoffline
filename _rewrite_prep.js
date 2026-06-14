// Chunk prompt arrays into batch files for the rewrite workflow.
const fs = require('fs');
const path = require('path');

function loadConst(file, name) {
  const src = fs.readFileSync(file, 'utf8');
  const fn = new Function(src + '\nreturn ' + name + ';');
  return fn();
}

const group = loadConst('prompts_v2.js', 'CSV_PROMPTS');
const couples = loadConst('couples_prompts_v2.js', 'CSV_COUPLES_PROMPTS');

const dir = path.join(process.cwd(), '_rewrite');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const BATCH = 50;
let batches = [];

function chunk(arr, source) {
  for (let i = 0; i < arr.length; i += BATCH) {
    const slice = arr.slice(i, i + BATCH).map(p => ({
      id: p.id,
      chapter: p.chapter,
      intensity: p.intensity,
      promptType: p.promptType, // truth | dare
      type: p.type,             // self | directed | group
      text: p.text
    }));
    const idx = batches.length;
    const file = path.join(dir, `batch_${String(idx).padStart(3, '0')}.json`);
    fs.writeFileSync(file, JSON.stringify(slice, null, 2));
    batches.push({ file, source, count: slice.length });
  }
}

chunk(group, 'group');
chunk(couples, 'couples');

fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({
  groupCount: group.length,
  couplesCount: couples.length,
  batchSize: BATCH,
  batches
}, null, 2));

console.log('group:', group.length, 'couples:', couples.length, 'total batches:', batches.length);
