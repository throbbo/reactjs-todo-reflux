(function(React, Reflux, UndoActions, undoListStore) {
   // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in TodoApp
    var Undo = React.createClass({
		mixins: [Reflux.connect(undoListStore,"list")],
		getInitialState: function() {
            return {
                list: []
            };
        },
        handleUndo: function() {
            UndoActions.performUndoOnUndoList();
        },
		render: function() {
			var classes = React.addons.classSet({
                "hidden": this.state.list.length < 1
            });
            return (
                <div className={classes} id="undo">
					<a href="javascript:;" onClick={this.handleUndo}>Undo</a>
               </div>
            );
        }
    });
	
	React.render(<Undo/>, document.getElementById('undocontainer'));
	
})(window.React, window.Reflux, window.UndoActions, window.undoListStore);	

