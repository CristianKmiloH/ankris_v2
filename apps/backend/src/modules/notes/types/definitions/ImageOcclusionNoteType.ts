import { INoteType, GeneratedCard } from '../INoteType';

export class ImageOcclusionNoteType implements INoteType {
    typeId = 'IMAGE_OCCLUSION';
    name = 'Image Occlusion';
    description = 'Occludes parts of an image.';

    generateCards(fields: Record<string, string>): GeneratedCard[] {
        // Standard Image Occlusion fields often include "Image", "Shapes", "Header", "Footer", etc.
        const image = fields['Image'] || fields['Imagen'] || '';
        const shapes = fields['Shapes'] || '[]'; // JSON string of shapes

        // This is a simplified implementation. Real IO requires parsing the SVG shapes.
        // For now, we assume if we receive data, we pass it through.

        if (!image) return [];

        // In a real implementation, we'd parse 'shapes' and generate one card per shape (or group)
        // For now, return a placeholder card indicating this feature is ready for logic

        return [{
            ord: 0,
            front: `<div class="io-wrapper">${image}<div class="io-overlay">Image Occlusion Placeholder</div></div>`,
            back: `<div class="io-wrapper">${image}</div><hr><div class="io-notes">Shapes hidden</div>`,
            templateName: 'Image Occlusion 1'
        }];
    }
}
