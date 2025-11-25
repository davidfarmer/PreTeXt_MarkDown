export function sanitizeMathXml(text) {
    let new_text = text;
    // In math XML, & should be written as \amp
    new_text = new_text.replace(/\s&\s/g, " \\amp ");
    new_text = new_text.replace(/\s<\s/g, " \\lt ");
    new_text = new_text.replace(/\s>\s/g, " \\gt ");
    return new_text;
}

export const onlyWhiteSpace = function (str) {
    return /^\s*$/.test(str);
};
