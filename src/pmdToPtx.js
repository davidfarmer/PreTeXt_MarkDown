import { fmToPTX } from "./parse";
import { onlyWhiteSpace, sanitizeMathXml } from "./helpers.js";
import { fromXml } from "xast-util-from-xml";
import { toXml } from "xast-util-to-xml";
import { CONTINUE, SKIP, visit } from "unist-util-visit";


export function pmdToPtx(pmdText) {
    // Remove the xml declaration if present
    pmdText = pmdText.replace(/<\?xml.*?\?>\s*/g, '');

    pmdText = sanitizeMathXml(pmdText);

    console.log("Sanitized PMD text:", pmdText);
    let tree = fromXml(`<root>${pmdText}</root>`);

    console.log("Initial tree:", tree);
    visit(tree, (node, index, parent) => {
        // If children contain any node of type text, reassemble the entire node and convert it:
        if (node.children && node.children.some(child => child.type === "text" && !onlyWhiteSpace(child.value))) {
            console.log("Node with text children found:", JSON.stringify(node, null, 2));
            let content = toXml(node, { closeEmptyElements: true });
            console.log("Reassembled content:", content);
            content = content.replace(/<root>/g, '').replace(/<\/root>/g, '');
            const convertedContent = fmToPTX(content);
            console.log("Converted content:", convertedContent);
            let convertedTree = fromXml(`<root>${convertedContent}</root>`);
            parent.children.splice(index, 1, ...convertedTree.children);
            return SKIP;
            // Handle nodes with text children
        }

        //if (node.type === "text" && !onlyWhiteSpace(node.value)) {
        //console.log("text node is", node.value);
        //console.log("parent is", parent);
        //console.log("index is", index);
        //console.log(`only whitespace? ${onlyWhiteSpace(node.value)}`);
        //const convertedText = fmToPTX(node.value);

        //console.log("converted text is", convertedText);

        //// insert converted xml text as raw xml nodes
        //let convertedTree = fromXml(`<root>${convertedText}</root>`);

        //parent.children.splice(index, 1, ...convertedTree.children);
        //return SKIP;
        //}
    });

    // Implement the conversion logic from PMD to PTX

    // traverse tree and replace any <root> elements with their children
    //console.log("Tree before removing root:", JSON.stringify(tree, null, 2));
    //visit(tree, (node, index, parent) => {
    //    if (node.name === "root" && parent) {
    //        parent.children.splice(index, 1, ...node.children);
    //        return SKIP;
    //    }
    //});
    //console.log("Tree after removing root:", JSON.stringify(tree, null, 2));

    //let ptxText = fmToPTX(tree);
    let ptxText = toXml(tree, { closeEmptyElements: true });
    console.log("Final PTX text:", ptxText);
    // clean up encoded characters
    //ptxText = ptxText.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    // Remove the added root element
    ptxText = ptxText.replace(/<root>/g, '').replace(/<\/root>/g, '');
    console.log("PTX text after removing root:", ptxText);
    return ptxText;
}

export function pmdToXast(pmdText) {
    // Remove the xml declaration if present
    pmdText = pmdText.replace(/<\?xml.*?\?>\s*/g, '');
    pmdText = sanitizeMathXml(pmdText);


    let tree = fromXml(`<root>${pmdText}</root>`);
    return JSON.stringify(tree, null, 2);
}

