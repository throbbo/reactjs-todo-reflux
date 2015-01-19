(function(Reflux, TodoActions, UndoActions, global) {
    'use strict';

	Array.prototype.indexOfField = function (propertyName, value) {
		for (var i = 0; i < this.length; i++)
			if (this[i][propertyName] === value)
				return i;
		return -1;
	}

    // some variables and helpers for our fake database stuff
    var todoCounter = 0,
        localStorageKey = "todos";

    function getItemByKey(list,itemKey){
        return _.find(list, function(item) {
            return item.key === itemKey;
        });
    }
    
    global.todoListStore = Reflux.createStore({
        // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
        listenables: [TodoActions],
		list: [],
        onEditItem: function(itemKey, newLabel) {
            var foundItem = getItemByKey(this.list,itemKey);
            if (!foundItem) {
                return;
            }
            foundItem.label = newLabel;
            this.updateList(this.list);
        },
        onAddItem: function(label) {
            this.updateList([{
                key: todoCounter++,
                created: new Date(),
                isComplete: false,
                label: label
            }].concat(this.list));
        },
        onItemsRemovedOnTodoList: function(itemsRemoved) {
			UndoActions.itemsRemovedOnUndoList(itemsRemoved);
        },
		onHandleAddMany: function(addManyItemsStr) {
			addManyItemsStr = addManyItemsStr || "";
			var list = addManyItemsStr.split("\n");
			for(var i=0;i<list.length;i++) {
				var label = list[i] || "";
				if(label!="") {
					this.onAddItem(label);
				}
			};
		},
		onPerformUndoOnTodoList: function(undolist) {
		    // Go through list of keys in list and remove from this.list, then remove undolist
            this.list = this.list.concat(undolist);
			this.updateList(this.list);
		},
        onRemoveItem: function(itemKey) {
			var itemRemoved = [];
			this.updateList(_.filter(this.list,function(item){
				if(item.key==itemKey) {
					itemRemoved = item;
				}
				return item.key!=itemKey;
            }));
			
			this.onItemsRemovedOnTodoList( [itemRemoved]);
        },
        onToggleItem: function(itemKey) {
            var foundItem = getItemByKey(this.list,itemKey);
            if (foundItem) {
                foundItem.isComplete = !foundItem.isComplete;
                this.updateList(this.list);
            }
        },
        onToggleAllItems: function(checked) {
            this.updateList(_.map(this.list, function(item) {
                item.isComplete = checked;
                return item;
            }));
        },
        onClearCompleted: function() {
			var undolist = [];
			this.updateList(_.filter(this.list, function(item) {
				if(item.isComplete) {
					undolist.push(item);
					return false;
				} 
                
				return true;
            }));
			
			this.onItemsRemovedOnTodoList(undolist)
        },
        // called whenever we change a list. normally this would mean a database API call
        updateList: function(list){
            localStorage.setItem(localStorageKey, JSON.stringify(list));
            // if we used a real database, we would likely do the below in a callback
            this.list = list;
            this.trigger(list); // sends the updated list to all listening components (TodoApp)
        },
		// this will be called by all listening components as they register their listeners
        getDefaultData: function() {
            var loadedList = localStorage.getItem(localStorageKey);
            if (!loadedList) {
                // If no list is in localstorage, start out with a default one
                this.list = [{
                    key: todoCounter++,
                    created: new Date(),
                    isComplete: false,
                    label: 'Rule the web',
					isDeleted: false
                }];
            } else {
				this.list = [];
				
				var list = JSON.parse(loadedList);
				if(list.length>0 && typeof(list[0])=="object") {
					this.list = _.map(list, function(item) {
						if(!item) item = {};
						if(typeof(item)!="object") item = {};
						
						// just resetting the key property for each todo item
						item.key = todoCounter++;
						return item;
					});
				}
            }
			
            return this.list;
        }
    });

})(window.Reflux, window.TodoActions, window.UndoActions, window);
