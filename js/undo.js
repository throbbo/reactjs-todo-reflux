(function(Reflux, UndoActions, TodoActions, global) {
	
	//TODO: Put into undo.js after
	global.undoListStore = Reflux.createStore({
		listenables: [UndoActions],
		undolist: [],
		onItemsRemovedOnUndoList: function(list) {
			this.undolist = list;
		},
		onHandleUndoListCleared: function() {
			this.undolist = [];
		},
        onPerformUndoOnUndoList: function(){
			TodoActions.performUndoOnTodoList(this.undolist);
			this.undolist = [];
        },
		onGetDefaultData: function() {
			this.undolist = [];
			return this.list;
		}
	});
})(window.Reflux, window.UndoActions, window.TodoActions, window);
