(function(React, Reflux, TodoActions, todoListStore) {
   // Renders the bottom item count, navigation bar and clearallcompleted button
    // Used in TodoApp
    var AddMany = React.createClass({
		mixins: [Reflux.connect(undoListStore,"list")],
		getInitialState: function() {
            return {
                addmanyStr: ""
            };
        },
        handleAddMany: function() {
            TodoActions.handleAddMany( this.refs.addmanytextarea.getDOMNode().value );
        },
		render: function() {
            return (
                <div>
					<div>
						<textarea ref="addmanytextarea" id="addmanytextarea" rows="10" cols="75" placeholder="Add many items at once?"/>
					</div>	
					<div>
						<a id="addmany" href="javascript:;" onClick={this.handleAddMany}>Add Many</a>
					</div>
               </div>
            );
        }
    });
	
	React.render(<AddMany/>, document.getElementById('addmanycontainer'));
	
})(window.React, window.Reflux, window.TodoActions, window.todoListStore);	

