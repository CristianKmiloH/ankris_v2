import { INoteType, GeneratedCard } from '../INoteType';

export class ClozeNoteType implements INoteType {
    typeId = 'CLOZE';
    name = 'Cloze';
    description = 'Fill-in-the-blank style cards.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        const text = fields['Text'] || fields['Front'] || '';
        const extra = fields['Extra'] || fields['Back'] || '';

        // Regex to find {{c1::Content::Hint}} or {{c1::Content}}
        // Group 1: Index (e.g. "1")
        // Group 2: Content (e.g. "Canberra")
        // Group 3 (optional): Hint (e.g. "City")
        const clozesRegex = /{{c(\d+)::(.*?)(?:::(.*?))?}}/g;

        const matches = [...text.matchAll(clozesRegex)];
        if (matches.length === 0) return [];

        // Find all unique indices (c1, c2, c3...)
        const indices = new Set<number>();
        matches.forEach(m => indices.add(parseInt(m[1], 10)));

        const cards: GeneratedCard[] = [];

        indices.forEach(index => {
            // Function to format text for THIS specific card index
            const formatForCard = (activeIdx: number, isFront: boolean) => {
                return text.replace(clozesRegex, (match, idxStr, content, hint) => {
                    const idx = parseInt(idxStr, 10);
                    if (idx === activeIdx) {
                        // This matches the current card's cloze
                        if (isFront) {
                            return `<span class="cloze">[${hint || '...'}]</span>`;
                        } else {
                            return `<span class="cloze-active">${content}</span>`;
                        }
                    } else {
                        // This matches a DIFFERENT cloze deletion -> just show the text (normal Anki behavior)
                        return content;
                    }
                });
            };

            const frontHtml = formatForCard(index, true);
            const backHtml = formatForCard(index, false) + (extra ? `<br><br><div class="extra">${extra}</div>` : '');

            cards.push({
                ord: index - 1, // Anki ords are 0-indexed, but cloze usually starts at c1
                front: `<div class="card-content">${frontHtml}</div>`,
                back: `<div class="card-content">${backHtml}</div>`,
                templateName: `Cloze ${index}`
            });
        });

        return cards;
    }
}
