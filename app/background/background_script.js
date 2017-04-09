var BookmarkTreeNode = (function () {
    function BookmarkTreeNode() {
    }
    return BookmarkTreeNode;
}());
var RemoveInfo = (function () {
    function RemoveInfo() {
    }
    return RemoveInfo;
}());
var ChangeInfo = (function () {
    function ChangeInfo() {
    }
    return ChangeInfo;
}());
var MoveInfo = (function () {
    function MoveInfo() {
    }
    return MoveInfo;
}());
var chrome;
var GoogleBookmark = (function () {
    function GoogleBookmark() {
    }
    GoogleBookmark.prototype.main = function () {
        console.log("main start ...");
        chrome.bookmarks.onCreated.addListener(this.onCreated);
        chrome.bookmarks.onRemoved.addListener(this.onRemoved);
        chrome.bookmarks.onChanged.addListener(this.onChanged);
        chrome.bookmarks.onMoved.addListener(this.onMoved);
    };
    GoogleBookmark.prototype.onCreated = function (id, node) {
        console.log("Create Title : " + node.title);
        console.log(node);
    };
    GoogleBookmark.prototype.onRemoved = function (id, removeInfo) {
        console.log("Remove Title:" + removeInfo.node.title);
        console.log(removeInfo);
    };
    GoogleBookmark.prototype.onChanged = function (id, changeInfo) {
        console.log(changeInfo);
    };
    GoogleBookmark.prototype.onMoved = function (id, moveInfo) {
        console.log(moveInfo);
    };
    GoogleBookmark.prototype.getChildren = function (id) {
        var children;
        chrome.bookmark.getChildren(id, function (node) {
            console.log(node);
        });
    };
    GoogleBookmark.prototype.dumpBookmarks = function (query) {
        var self = this;
        var bookmarkTreeNodes = chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            console.log(bookmarkTreeNodes.length);
            self.dumpTreeNodes(bookmarkTreeNodes, query);
        });
    };
    GoogleBookmark.prototype.dumpTreeNodes = function (bookmarkNodes, query) {
        console.log("dumpTreeNodes");
        for (var i = 0; i < bookmarkNodes.length; i++) {
            var node = bookmarkNodes[i];
            this.dumpNode(node, query);
        }
    };
    GoogleBookmark.prototype.dumpNode = function (bookmarkNode, query) {
        if (bookmarkNode.title) {
            if (query && !bookmarkNode.children) {
                if (String(bookmarkNode.title).indexOf(query) == -1) {
                    console.log("not nodes ... ");
                    return;
                }
            }
        }
        console.log(bookmarkNode.id);
        console.log(bookmarkNode.parentId);
        console.log(bookmarkNode.index);
        console.log(bookmarkNode.url);
        console.log(bookmarkNode.title);
        console.log(bookmarkNode.dateAdded);
        console.log(bookmarkNode.dateGroupModified);
        console.log(bookmarkNode.unmodifiable);
        console.log(bookmarkNode.children);
        console.log("-----------------------------");
        if (bookmarkNode.children && bookmarkNode.children.length > 0) {
            this.dumpTreeNodes(bookmarkNode.children, query);
        }
    };
    return GoogleBookmark;
}());
$(function () {
    console.log("Background load ...");
    var googleBookmark = new GoogleBookmark();
    googleBookmark.main();
});
//# sourceMappingURL=background_script.js.map