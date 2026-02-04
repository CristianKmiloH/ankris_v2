import { INoteType, GeneratedCard } from '../INoteType';

export class BasicOptionalReversedNoteType implements INoteType {
    typeId = 'BASIC_OPTIONAL_REVERSED';
    name = 'Basic (optional reversed card)';
    description = 'Creates a Front->Back card, and optionally a Back->Front card if the "Add Reverse" field is filled.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        const front = fields['Front'] || fields['Pregunta'] || '';
        const back = fields['Back'] || fields['Respuesta'] || '';
        const addReverse = fields['Add Reverse'] || '';

        if (!front || !back) return [];

        const cards: GeneratedCard[] = [];

        // Card 1: Front -> Back
        cards.push({
            ord: 0,
            front: `<div class="card-content">${front}</div>`,
            back: `<div class="card-content">${front}</div><hr id=answer><div class="card-content">${back}</div>`,
            templateName: 'Card 1'
        });

        // Card 2: Back -> Front (Only if Add Reverse is not empty)
        if (addReverse.trim().length > 0) {
            cards.push({
                ord: 1,
                front: `<div class="card-content">${back}</div>`,
                back: `<div class="card-content">${back}</div><hr id=answer><div class="card-content">${front}</div>`,
                templateName: 'Card 2'
            });
        }

        return cards;
    }
}
