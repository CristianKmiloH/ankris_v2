export interface GeneratedCard {
    ord: number;
    front: string; // The rendered HTML for the front
    back: string;  // The rendered HTML for the back
    templateName?: string; // e.g. "Card 1", "Reverse"
}

export interface INoteType {
    typeId: string; // 'BASIC', 'CLOZE', 'BASIC_REVERSED', etc.
    name: string;
    description: string;

    /**
     * Generates card contents based on field values.
     * @param fields Key-value map of field names to content (e.g. { "Front": "Hello", "Back": "Hola" })
     */
    generateCards(fields: Record<string, string>): GeneratedCard[];
}
