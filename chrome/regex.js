$(":header").each(function(index) {
    parseChildNodes(this);
});

/* Credit for the below goes to
 * http://james.padolsey.com/javascript/replacing-text-in-the-dom-its-not-that-simple/
 * which helped paper over my extremely patchy Javascript experience
 */

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
        if (new_text !== $(node).text()) {
            wrapMatchesInNode(node);
        }
    }
}

function wrapMatchesInNode(textNode) {
    var temp = document.createElement('div');
 
    temp.innerHTML = textNode.data.replace(/\?(.*)/, '? Nope.');
 
    while (temp.firstChild) {
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    textNode.parentNode.removeChild(textNode);
}
