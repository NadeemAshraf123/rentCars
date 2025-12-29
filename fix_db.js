const fs = require('fs');
const path = 'db.json';

try {
    let content = fs.readFileSync(path, 'utf8');
    // Find the last closing brace
    const lastBraceIndex = content.lastIndexOf('}');
    
    if (lastBraceIndex === -1) {
        console.error('No closing brace found!');
        process.exit(1);
    }

    // Look backwards from the last brace for a comma, ignoring whitespace
    let index = lastBraceIndex - 1;
    while (index >= 0) {
        const char = content[index];
        if (/\s/.test(char)) {
            index--;
            continue;
        }
        if (char === ',') {
            console.log('Found trailing comma at index ' + index + '. Removing...');
            const newContent = content.substring(0, index) + content.substring(index + 1);
            fs.writeFileSync(path, newContent);
            console.log('Fixed db.json successfully.');
            process.exit(0);
        } else {
            console.log('Found character "' + char + '" before last brace. No trailing comma found (or it is not the immediate non-whitespace char).');
            process.exit(0);
        }
    }
} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
