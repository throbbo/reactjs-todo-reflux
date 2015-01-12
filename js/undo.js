(function(Reflux, UndoActions, TodoActions, global) {
	
	//TODO: Put into undo.js after
	global.undoListStore = Reflux.createStore({
		listenables: [UndoActions],
		undolist: [],
		onItemsRemovedOnUndoList: function(list) {
			this.undolist = list;
			this.trigger(this.undolist);
		},
		onHandleUndoListCleared: function() {
			this.undolist = [];
			this.trigger(this.undolist);
		},
        onPerformUndoOnUndoList: function(){
			TodoActions.performUndoOnTodoList(this.undolist);
			this.undolist = [];
			this.trigger(this.undolist);
        },
		onGetDefaultData: function() {
			this.undolist = [];
			return this.list;
		}
	});
})(window.Reflux, window.UndoActions, window.TodoActions, window);
