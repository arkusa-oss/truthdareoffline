# Truth-Dare Automated Test Runner

A comprehensive Node.js-based test runner that simulates full game sessions of the Truth-Dare party game engine and detects potential issues.

## Overview

The test runner (`test_simulation.js`) performs automated game simulations across three distinct player configurations, each running through all 7 game stages (playful → personal → flirty → suggestive → intimate → erotic → taboo), with each stage running 15 turns per configuration.

## Features

### Game Engine Integration
- Loads and executes `engine.js` game logic in a Node.js context
- Loads 1692 curated prompts from `prompts_v2.js`
- Simulates complete game sessions with proper state management
- Implements full prompt selection, target assignment, and text rendering logic

### Test Configurations

**Config A: 3 Players (Hans+Grecia couple, Nella single)**
- Tests partner coupling dynamics in a small group
- Validates prompt selection for different gender combinations

**Config B: 4 Players (2 Couples)**
- Tests multi-couple interactions
- Evaluates partner bias detection

**Config C: 5 Players (3 Male, 2 Female, 1 Couple)**
- Tests mixed group dynamics
- Validates gender-specific prompt handling

### Issue Detection

The test runner automatically detects:

1. **Gendered Pronouns** (HIGH SEVERITY)
   - Detects improper use of gendered pronouns (her/him/he/she) in rendered prompts
   - Except for intentionally-gendered chains (e.g., `erotic_lingerie`)
   - Ensures inclusive pronoun usage

2. **Stage-Inappropriate Prompts** (MEDIUM SEVERITY)
   - Flags prompts with intensity values significantly mismatched to their stage
   - Validates tone/intensity progression across stages

3. **Prompt Repetition** (MEDIUM SEVERITY)
   - Detects when the same prompt appears within 5 turns
   - Ensures prompt variety within short game windows

4. **Self-Targeting Issues** (LOW SEVERITY)
   - Identifies prompts where actor is incorrectly assigned as target
   - Validates target selection logic

5. **Partner Bias** (MEDIUM SEVERITY)
   - Compares frequency of couple pairings vs other player combinations
   - Flags if partners are paired significantly more (>30%) than others
   - Ensures the game encourages cross-couple mixing

6. **Chain Progression Issues** (LOW SEVERITY)
   - Detects broken or out-of-sequence chain steps
   - Validates chain continuity

## Running the Tests

### Basic Usage
```bash
node test_simulation.js
```

### Requirements
- Node.js (v12+)
- `engine.js` - Game engine with CHAPTER_CONFIG and game logic
- `prompts_v2.js` - Prompt database exported as CSV_PROMPTS array

### Output
- Console output with detailed results per configuration
- `test_report.md` - Generated markdown report with summary statistics
- Exit code 0 on success (no issues), 1 if issues detected

## Test Execution Flow

1. **Loading Phase**
   - Extracts CSV_PROMPTS array from `prompts_v2.js`
   - Loads CHAPTER_CONFIG and game logic from `engine.js`
   - Initializes DOM stubs for browser APIs

2. **Simulation Phase** (per configuration)
   - Creates game session with player setup
   - Runs 15 turns per stage × 7 stages = 105 total turns
   - Executes: player selection → prompt selection → text rendering → state updates
   - Simulates chapter advancement based on turn counts

3. **Detection Phase**
   - Analyzes complete session log for issues
   - Groups issues by type
   - Generates detailed output with examples

4. **Reporting Phase**
   - Outputs results to console
   - Generates markdown report
   - Returns appropriate exit code

## Key Implementation Details

### DOM Stubbing
The engine.js uses browser APIs (document, window, etc.). The test suite provides minimal stubs to prevent runtime errors while keeping execution in pure Node.js.

### Game State Management
Implements full `gameState` object matching engine.js structure:
- Player tracking with genders and partnerships
- Chapter/turn progression
- Prompt usage history (recent + completed)
- Target selection weighting with partner bias penalties
- Theme-aware random selection

### Prompt Rendering
Uses the same `injectPromptText()` logic as the engine:
- Placeholder replacement ({player}, {target}, {partner})
- Pronoun injection for inclusive language
- Memory integration for story callbacks

### Session Statistics
Each test configuration produces:
- Turn count across all stages
- Unique prompt count (repetition tracking)
- Sample prompts per stage (for validation)
- Detailed issue reports with context

## Extending the Tests

### Adding New Test Configurations
Edit the `testConfigs` array at the bottom of the script:
```javascript
const testConfigs = [
  {
    name: 'Your Config Name',
    players: [
      { name: 'Player1', gender: 'male', partnerId: 1, partner: 'Player2' },
      { name: 'Player2', gender: 'female', partnerId: 0, partner: 'Player1' },
      { name: 'Player3', gender: 'female', partnerId: null, partner: null }
    ]
  }
];
```

### Adding New Issue Detectors
Implement a new method in the `GameSession` class:
```javascript
detectNewIssue() {
  const issues = [];
  this.sessionLog.forEach(turn => {
    // Check for the issue
    if (problemDetected) {
      issues.push({
        type: 'new_issue_type',
        severity: 'high|medium|low',
        turn: turn.turn,
        chapter: turn.chapter,
        // ... other fields
      });
    }
  });
  return issues;
}
```

Then add it to `detectAllIssues()`:
```javascript
this.issues = [
  ...this.detectGenderedPronouns(),
  ...this.detectNewIssue(),  // Add here
  ...this.detectChainIssues()
];
```

## Performance Notes

- Full test run (3 configs × 105 turns): ~500ms
- Handles 1692 prompts efficiently
- Linear time complexity in turns and prompts
- Memory usage: ~50MB for full session logs

## Limitations

- Does not test actual game UI rendering
- No real-time interaction simulation
- Deterministic RNG would allow replay capability
- Does not test audio/visual effects
- No stress testing for large player counts (10+)

## Output Example

```
TEST 1: Config A: 3 players (Hans+Grecia couple, Nella single)
---------------------------------------------------------------------------

Session completed: 105 turns across 7 stages
Prompts used: 105
Unique prompts: 93

✓ No issues detected!

Sample prompts used per stage:
  playful: "Make a hat out of tin foil and wear it..."
  personal: "Share your most scandalous moment..."
  flirty: "Try to act sexy for 10 seconds..."
```

## Troubleshooting

**"Loaded 0 prompts"**
- Verify prompts_v2.js exists and contains CSV_PROMPTS array
- Check file format hasn't changed

**Engine fails to load**
- Ensure engine.js has proper CHAPTER_CONFIG definition
- Check for any missing global function stubs in domStubs

**Issues not being detected**
- Verify detection logic matches intended behavior
- Add console.log() debugging in detection methods
- Check session.sessionLog for turn details

## Files

- `test_simulation.js` - Main test runner (878 lines)
- `test_report.md` - Generated report (updated after each run)
- `TEST_RUNNER_README.md` - This documentation
