import { INoteType, GeneratedCard } from '../INoteType';

export class BasicReversedNoteType implements INoteType {
    typeId = 'BASIC_REVERSED';
    name = 'Basic (and reversed card)';
    description = 'Creates a Front->Back card and a Back->Front card.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        const front = fields['Front'] || fields['Pregunta'] || '';
        const back = fields['Back'] || fields['Respuesta'] || '';

        if (!front || !back) return [];

        const cards: GeneratedCard[] = [];

        // Card 1: Front -> Back
        cards.push({
            ord: 0,
            front: `<div class="card-content">${front}</div>`,
            back: `<div class="card-content">${front}</div><hr id=answer><div class="card-content">${back}</div>`,
            templateName: 'Card 1'
        });

        // Card 2: Back -> Front
        cards.push({
            ord: 1,
            front: `<div class="card-content">${back}</div>`,
            back: `<div class="card-content">${back}</div><hr id=answer><div class="card-content">${front}</div>`,
            templateName: 'Card 2'
        });

        return cards;
    }
}
