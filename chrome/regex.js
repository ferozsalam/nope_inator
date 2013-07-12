$(":header").each(function(index) {
    parseChildNodes(this);
});

function parseChildNodes(node) {
    var next;
    if (node.nodeType === 1) {
        if (node = node.firstChild) {
            do {
                next = node.nextSibling;
                parseChildNodes(node);
            } while (node = next);
        }
    } 
    else if (node.nodeType === 3) {
        var new_text = $(node).text().replace(/\?(.*)/, "? Nope.");
        console.log("Existing text: " + $(node).text());
        console.log("Suggested replacement: " + new_text);
        if (new_text !== $(node).text()) {
            wrapMatchesInNode(node);
        }
    }
}

function wrapMatchesInNode(textNode) {
    var temp = document.createElement('div');
 
    temp.innerHTML = textNode.data.replace(/\?(.*)/, '? Nope.');
 
    while (temp.firstChild) {
        console.log(temp.firstChild.nodeType);
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    textNode.parentNode.removeChild(textNode);
}
