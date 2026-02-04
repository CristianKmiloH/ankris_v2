import { NoteTypeRegistry } from '../src/modules/notes/NoteTypeRegistry';

const registry = NoteTypeRegistry.getInstance();

console.log('--- Testing Note Type Registry ---');

// 1. Basic
const basic = registry.get('BASIC')!;
console.log('Testing Basic:', basic.generateCards({ Front: 'Q1', Back: 'A1' }).length === 1 ? 'PASS' : 'FAIL');

// 2. Reversed
const reversed = registry.get('BASIC_REVERSED')!;
console.log('Testing Reversed:', reversed.generateCards({ Front: 'Q1', Back: 'A1' }).length === 2 ? 'PASS' : 'FAIL');

// 3. Optional Reversed (Empty)
const opt = registry.get('BASIC_OPTIONAL_REVERSED')!;
console.log('Testing Optional (Empty):', opt.generateCards({ Front: 'Q1', Back: 'A1' }).length === 1 ? 'PASS' : 'FAIL');
// 3. Optional Reversed (Filled)
console.log('Testing Optional (Filled):', opt.generateCards({ Front: 'Q1', Back: 'A1', 'Add Reverse': 'y' }).length === 2 ? 'PASS' : 'FAIL');

// 4. Cloze
const cloze = registry.get('CLOZE')!;
const clozeText = 'Canberra was founded in {{c1::1913}}.';
const clozeCards = cloze.generateCards({ Text: clozeText });
console.log('Testing Cloze Count:', clozeCards.length === 1 ? 'PASS' : 'FAIL');
console.log('Testing Cloze Content:', clozeCards[0].front.includes('class="cloze"') ? 'PASS' : 'FAIL');

const multiClozeText = '{{c1::A}} vs {{c2::B}}';
const multiClozeCards = cloze.generateCards({ Text: multiClozeText });
console.log('Testing Multi Cloze Count:', multiClozeCards.length === 2 ? 'PASS' : 'FAIL');

console.log('--- Test Complete ---');
