# Quick Start: Test Runner

## Installation & Execution

### Requirements
- Node.js v12 or higher
- All three source files in same directory:
  - `engine.js` (game engine with turn logic)
  - `prompts_v2.js` (prompt database, 1692+ prompts)
  - `test_simulation.js` (the test runner)

### Run the Tests
```bash
node test_simulation.js
```

That's it! The test will:
1. Load 1692 prompts from prompts_v2.js
2. Load game configuration from engine.js
3. Run 3 test configurations (105 turns each = 315 total turns)
4. Detect 6 categories of issues
5. Output results to console and test_report.md
6. Exit with code 0 (success) or 1 (issues found)

## What Gets Tested

Each test configuration runs through all 7 game stages with different player setups:

| Config | Players | Couples | Purpose |
|--------|---------|---------|---------|
| A | 3 (2F, 1M) | 1 couple + 1 single | Small group dynamics |
| B | 4 (2F, 2M) | 2 couples | Multi-couple interactions |
| C | 5 (3M, 2F) | 1 couple + 3 singles | Mixed group scaling |

## Issues Detected

### HIGH SEVERITY
- **Gendered pronouns** - her/him/he/she appearing in gender-neutral prompts
  - Exception: erotic_lingerie chain intentionally uses gendered language

### MEDIUM SEVERITY
- **Stage-inappropriate prompts** - intensity level too low for stage
- **Prompt repetition** - same prompt within 5-turn window
- **Partner bias** - couples paired significantly more (>30%) than other combinations

### LOW SEVERITY
- **Self-targeting** - actor assigned as their own target
- **Chain gaps** - missing or out-of-sequence chain steps

## Sample Output

```
TEST 1: Config A: 3 players (Hans+Grecia couple, Nella single)
Session completed: 105 turns across 7 stages
Prompts used: 105
Unique prompts: 93

✓ No issues detected!

Sample prompts used per stage:
  playful: "Make a hat out of tin foil..."
  personal: "Share your most scandalous moment..."
  flirty: "Have you ever had a crush..."
  suggestive: "Where would you like to be touched..."
  intimate: "Whisper something intimate..."
  erotic: "Show us your sexiest move..."
  taboo: "Push a boundary you've never..."
```

## Output Files

- **test_report.md** - Summary report with issue counts and configuration details
- **Console output** - Detailed results for each configuration and issue type

## Next Steps

1. **Review Results** - Check console output for any detected issues
2. **Read test_report.md** - Summary of findings
3. **Add Configurations** - Edit testConfigs array to test different player mixes
4. **Extend Detection** - Add new issue detectors to GameSession class
5. **Automate** - Add to CI/CD pipeline for regression testing

## Customization

### Adjust Simulation Depth
Change turns per stage (currently 15):
```javascript
session.runSession(20);  // More thorough testing
```

### Add Custom Test Config
```javascript
const testConfigs = [
  // ... existing configs ...
  {
    name: 'Config D: 6 Players (3 couples)',
    players: [
      { name: 'Alice', gender: 'female', partnerId: 1, partner: 'Bob' },
      { name: 'Bob', gender: 'male', partnerId: 0, partner: 'Alice' },
      { name: 'Carol', gender: 'female', partnerId: 3, partner: 'Dave' },
      { name: 'Dave', gender: 'male', partnerId: 2, partner: 'Carol' },
      { name: 'Eve', gender: 'female', partnerId: 5, partner: 'Frank' },
      { name: 'Frank', gender: 'male', partnerId: 4, partner: 'Eve' }
    ]
  }
];
```

## Troubleshooting

**Q: "Loaded 0 prompts"**
A: Verify prompts_v2.js has CSV_PROMPTS array defined correctly

**Q: "Engine config failed to load"**
A: Check engine.js has CHAPTER_CONFIG and CHAPTER_ORDER defined

**Q: Test runs very slowly**
A: This is normal - 315+ game turns with prompt selection takes ~1-2 seconds

**Q: Want to see individual turns**
A: Add `console.log(turn)` in the issue detection methods to see turn details

## Full Documentation

See `TEST_RUNNER_README.md` for comprehensive documentation including:
- Detailed architecture
- All detection methods explained
- Performance notes
- Extension guidelines
- API reference
