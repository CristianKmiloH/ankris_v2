import { INoteType } from './types/INoteType';
import { BasicNoteType } from './types/definitions/BasicNoteType';
import { BasicReversedNoteType } from './types/definitions/BasicReversedNoteType';
import { BasicOptionalReversedNoteType } from './types/definitions/BasicOptionalReversedNoteType';
import { TypeAnswerNoteType } from './types/definitions/TypeAnswerNoteType';
import { ClozeNoteType } from './types/definitions/ClozeNoteType';
import { ImageOcclusionNoteType } from './types/definitions/ImageOcclusionNoteType';

export class NoteTypeRegistry {
    private static instance: NoteTypeRegistry;
    private types: Map<string, INoteType> = new Map();

    private constructor() {
        this.register(new BasicNoteType());
        this.register(new BasicReversedNoteType());
        this.register(new BasicOptionalReversedNoteType());
        this.register(new TypeAnswerNoteType());
        this.register(new ClozeNoteType());
        this.register(new ImageOcclusionNoteType());
    }

    public static getInstance(): NoteTypeRegistry {
        if (!NoteTypeRegistry.instance) {
            NoteTypeRegistry.instance = new NoteTypeRegistry();
        }
        return NoteTypeRegistry.instance;
    }

    public register(noteType: INoteType) {
        this.types.set(noteType.typeId, noteType);
    }

    public get(typeId: string): INoteType | undefined {
        return this.types.get(typeId);
    }

    public getAll(): INoteType[] {
        return Array.from(this.types.values());
    }

    /**
     * Helper to detect note type from Anki model name (heuristic)
     */
    public detectTypeFromAnkiName(modelName: string): INoteType {
        const lower = modelName.toLowerCase();
        if (lower.includes('cloze')) return this.get('CLOZE')!;
        if (lower.includes('basic') && lower.includes('optional')) return this.get('BASIC_OPTIONAL_REVERSED')!;
        if (lower.includes('basic') && lower.includes('reverse')) return this.get('BASIC_REVERSED')!;
        if (lower.includes('type')) return this.get('BASIC_TYPE_ANSWER')!;
        if (lower.includes('image') && lower.includes('occlusion')) return this.get('IMAGE_OCCLUSION')!;
        return this.get('BASIC')!;
    }
}
