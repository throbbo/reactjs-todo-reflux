(function(React, Reflux, UndoActions, undoListStore) {
   // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in TodoApp
    var Undo = React.createClass({
		getInitialState: function() {
            return {};
        },
        handleUndo: function() {
            UndoActions.performUndoOnUndoList();
        },
		render: function() {
            return (
                <div id="undo">
					<a href="javascript:;" onClick={this.handleUndo}>Undo</a>
               </div>
            );
        }
    });
	
	React.render(<Undo/>, document.getElementById('undocontainer'));
	
})(window.React, window.Reflux, window.UndoActions, window.undoListStore);	

