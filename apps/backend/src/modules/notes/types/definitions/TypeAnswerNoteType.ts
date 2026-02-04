import { INoteType, GeneratedCard } from '../INoteType';

export class TypeAnswerNoteType implements INoteType {
    typeId = 'BASIC_TYPE_ANSWER';
    name = 'Basic (type in the answer)';
    description = 'Prompts the user to type the answer.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        const front = fields['Front'] || fields['Pregunta'] || '';
        const back = fields['Back'] || fields['Respuesta'] || '';

        if (!front) return [];

        // We inject an input field and store the correct answer in a data attribute
        // The frontend will be responsible for picking this up and handling the logic
        const inputHtml = `
            <div class="type-answer-container">
                <input type="text" id="typeans" class="ankris-input" placeholder="Type answer..." autocomplete="off">
                <input type="hidden" id="correct-answer" value="${back.replace(/"/g, '&quot;')}">
            </div>
        `;

        return [{
            ord: 0,
            front: `<div class="card-content">${front}</div><br>${inputHtml}`,
            back: `<div class="card-content">${front}</div><hr id=answer><div class="card-content">${back}</div><div class="type-answer-comparison">Correct: ${back}</div>`,
            templateName: 'Type Answer'
        }];
    }
}
