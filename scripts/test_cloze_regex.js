
const clozesRegex = /{{c(\d+)::(.*?)(?:::(.*?))?}}/g;

const text = "Hola {{c1::mundo}}";

const matches = [...text.matchAll(clozesRegex)];
console.log(`Found ${matches.length} matches`);

matches.forEach(m => {
    console.log(`Full match: ${m[0]}`);
    console.log(`Index: ${m[1]}`);
    console.log(`Content: ${m[2]}`);
    console.log(`Hint: ${m[3]}`);
});

const generateCards = (text, extra) => {
    const indices = new Set();
    matches.forEach(m => indices.add(parseInt(m[1], 10)));

    const cards = [];
    indices.forEach(index => {
        const formatForCard = (activeIdx, isFront) => {
            return text.replace(clozesRegex, (match, idxStr, content, hint) => {
                const idx = parseInt(idxStr, 10);
                if (idx === activeIdx) {
                    if (isFront) return `<span class="cloze">[${hint || '...'}]</span>`;
                    else return `<span class="cloze-active">${content}</span>`;
                } else {
                    return content;
                }
            });
        };
        const front = formatForCard(index, true);
        const back = formatForCard(index, false) + (extra ? `<br><br>${extra}` : '');
        cards.push({ front, back });
    });
    return cards;
}

const cards = generateCards(text, "Extra info");
console.log("Generated Cards:", JSON.stringify(cards, null, 2));
