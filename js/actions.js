(function(Reflux, global) {
    'use strict';

    // Each action is like an event channel for one specific event. Actions are called by components.
    // The store is listening to all actions, and the components in turn are listening to the store.
    // Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

    global.TodoActions = Reflux.createActions([
        "toggleItem",     // called by button in TodoItem
        "toggleAllItems", // called by button in TodoMain (even though you'd think TodoHeader)
        "addItem",        // called by hitting enter in field in TodoHeader
        "removeItem",     // called by button in TodoItem
        "clearCompleted", // called by button in TodoFooter
        "editItem",       // called by finishing edit in TodoItem
		"peformUndo",     // called by clicking Undo link in Undo
		"addToUndoList",  // called by removing an item in TodoItem
		"performUndoOnTodoList",
		"itemsRemovedOnTodoList",
		"handleAddMany" 
    ]);

    global.UndoActions = Reflux.createActions([
		"itemsRemovedOnUndoList",
		"handleUndoListCleared",
		"performUndoOnUndoList",     			// called by finishing undo in TodoItem
		"getDefaultData"		
    ]);

})(window.Reflux, window);
