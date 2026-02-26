// Helper script to convert press mock data to Portable Text format
const fs = require('fs');
const path = require('path');

function toBlock(text) {
    return [{
        _type: 'block',
        _key: 'k' + Math.random().toString(36).substr(2, 8),
        style: 'normal',
        markDefs: [],
        children: [{
            _type: 'span',
            _key: 's' + Math.random().toString(36).substr(2, 8),
            text: text,
            marks: []
        }]
    }];
}

const filePath = path.join(__dirname, '..', 'lib', 'mockData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const pressStart = content.indexOf('export const mockPress');
if (pressStart === -1) {
    console.log('mockPress not found');
    process.exit(1);
}

const beforePress = content.substring(0, pressStart);
let pressSection = content.substring(pressStart);

// Find the teamMembers section to avoid converting bio fields
const teamStart = pressSection.indexOf('export const mockTeamMembers');
const pressOnly = pressSection.substring(0, teamStart);
const afterPress = pressSection.substring(teamStart);

// Replace summary: { en: '...', zh: '...' }
let fixed = pressOnly.replace(/summary:\s*\{[^}]+\}/g, (match) => {
    if (match.includes('_type')) return match; // already converted
    const enMatch = match.match(/en:\s*'((?:[^'\\]|\\.)*)'/);
    const zhMatch = match.match(/zh:\s*'((?:[^'\\]|\\.)*)'/);
    if (!enMatch && !zhMatch) return match;
    const enText = enMatch ? enMatch[1].replace(/\\'/g, "'") : '';
    const zhText = zhMatch ? zhMatch[1].replace(/\\'/g, "'") : '';
    return 'summary: {\n      en: ' + JSON.stringify(toBlock(enText)) + ',\n      zh: ' + JSON.stringify(toBlock(zhText)) + '\n    }';
});

// Replace content: { en: '...', zh: '...' }
fixed = fixed.replace(/content:\s*\{[^}]+\}/g, (match) => {
    if (match.includes('_type')) return match; // already converted
    const enMatch = match.match(/en:\s*'((?:[^'\\]|\\.)*)'/);
    const zhMatch = match.match(/zh:\s*'((?:[^'\\]|\\.)*)'/);
    if (!enMatch && !zhMatch) return match;
    const enText = enMatch ? enMatch[1].replace(/\\'/g, "'") : '';
    const zhText = zhMatch ? zhMatch[1].replace(/\\'/g, "'") : '';
    return 'content: {\n      en: ' + JSON.stringify(toBlock(enText)) + ',\n      zh: ' + JSON.stringify(toBlock(zhText)) + '\n    }';
});

fs.writeFileSync(filePath, beforePress + fixed + afterPress);
console.log('Done - mock press data converted to Portable Text');
