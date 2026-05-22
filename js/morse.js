// Morse Code Data
const MORSE_DATA = {
    beginner: {
        name: 'Beginner (A-Z)',
        items: [
            { char: 'A', morse: '.-' },
            { char: 'B', morse: '-...' },
            { char: 'C', morse: '-.-.' },
            { char: 'D', morse: '-..' },
            { char: 'E', morse: '.' },
            { char: 'F', morse: '..-.' },
            { char: 'G', morse: '--.' },
            { char: 'H', morse: '....' },
            { char: 'I', morse: '..' },
            { char: 'J', morse: '.---' },
            { char: 'K', morse: '-.-' },
            { char: 'L', morse: '.-..' },
            { char: 'M', morse: '--' },
            { char: 'N', morse: '-.' },
            { char: 'O', morse: '---' },
            { char: 'P', morse: '.--.' },
            { char: 'Q', morse: '--.-' },
            { char: 'R', morse: '.-.' },
            { char: 'S', morse: '...' },
            { char: 'T', morse: '-' },
            { char: 'U', morse: '..-' },
            { char: 'V', morse: '...-' },
            { char: 'W', morse: '.--' },
            { char: 'X', morse: '-..-' },
            { char: 'Y', morse: '-.--' },
            { char: 'Z', morse: '--..' }
        ]
    },
    numbers: {
        name: 'Numbers (0-9)',
        items: [
            { char: '0', morse: '-----' },
            { char: '1', morse: '.----' },
            { char: '2', morse: '..---' },
            { char: '3', morse: '...--' },
            { char: '4', morse: '....-' },
            { char: '5', morse: '.....' },
            { char: '6', morse: '-....' },
            { char: '7', morse: '--...' },
            { char: '8', morse: '---..' },
            { char: '9', morse: '----.' }
        ]
    },
    advanced: {
        name: 'Advanced (Symbols)',
        items: [
            { char: '.', morse: '.-.-.-' },
            { char: ',', morse: '--..--' },
            { char: '?', morse: '..--..' },
            { char: "'", morse: '.----.' },
            { char: '!', morse: '-.-.--' },
            { char: '/', morse: '-..-.' },
            { char: '(', morse: '-.--.-' },
            { char: ')', morse: '-.--.-' },
            { char: '&', morse: '.-...' },
            { char: ':', morse: '---...' },
            { char: ';', morse: '-.-.-.' },
            { char: '=', morse: '-...-' },
            { char: '+', morse: '.-.-.' },
            { char: '-', morse: '-....-' },
            { char: '_', morse: '..--.-' },
            { char: '"', morse: '.-..-.' },
            { char: '$', morse: '...-..-' },
            { char: '@', morse: '.--.-.' }
        ]
    }
};

// Utility function to get morse data for a difficulty level
function getMorseItems(difficulty) {
    return MORSE_DATA[difficulty]?.items || MORSE_DATA.beginner.items;
}

// Utility function to get morse code for a character
function getMorseForChar(char) {
    for (const level of Object.values(MORSE_DATA)) {
        const item = level.items.find(i => i.char === char);
        if (item) return item.morse;
    }
    return '';
}

// Convert morse code to visual representation
function morseToVisual(morseCode) {
    return morseCode
        .replace(/\./g, '●')
        .replace(/-/g, '▬');
}
