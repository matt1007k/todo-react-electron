import React from 'react';

export default class AddTodo extends React.Component{
    constructor(){
        super();

        this.state = {
            value: ''
        };

        this.add = this.add.bind(this);
    }

    add(){
        this.props.createTodo(this.state.value);
        this.setState({value: ''});
    }

    render(){
        return(
            <div className="create-todo">
                <input 
                    placeholder="Que esta pensando?"
                    value={this.state.value}
                    onChange={(e) => this.setState({value: e.target.value})}
                />
                <button onClick={this.add}>ADD</button>
            </div>
        );
    }
}