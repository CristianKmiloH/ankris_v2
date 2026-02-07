import { INoteType, GeneratedCard } from '../INoteType';

export class BasicNoteType implements INoteType {
    typeId = 'BASIC';
    name = 'Basic';
    description = 'A standard Front/Back card.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        const front = fields['Front'] || fields['Pregunta'] || '';
        const back = fields['Back'] || fields['Respuesta'] || '';

        if (!front) return []; // No front content, usually invalid

        return [{
            ord: 0,
            front: `<div class="card-content">${front}</div>`,
            back: `<div class="card-content">${back}</div>`,
            templateName: 'Card 1'
        }];
    }
}
