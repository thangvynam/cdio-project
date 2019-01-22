var App = React.createClass({
    getInitialState: function () {
        return (
            {
                fruits: {
                    'fruit-1': 'orange',
                    'fruit-2': 'apple'
                }
            }
        )
    },
    addFruit: function (fruit) {
        //create a unike key for each new fruit item
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.fruits['fruit-' + timestamp] = fruit;
        // set the state
        this.setState({ fruits: this.state.fruits });
    },
    removeFruit: function (fruitKey) {
        // update the state object
        delete this.state.fruits[fruitKey];
        // set the state
        this.setState({ fruits: this.state.fruits });
        //alert(fruitKey);
    },
    render: function () {
        return (
            <div className="component-wrapper">
                <FruitList fruits={this.state.fruits} />
                <AddFruitForm addFruit={this.addFruit} />
                <RemoveFruitForm removeFruit={this.removeFruit} fruits={this.state.fruits} />
            </div>
        );
    }
});

var FruitList = React.createClass({
    render: function () {
        return (
            <div className="container">
                <ul className="list-group text-center">
                    {
                        Object.keys(this.props.fruits).map(function (key) {
                            return <li className="list-group-item list-group-item-info">{this.props.fruits[key]}</li>
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
});

var AddFruitForm = React.createClass({
    createFruit: function (e) {
        e.preventDefault();
        //get the fruit object name from the form
        var fruit = this.refs.fruitName.value;
        //call the addFruit method of the App component
        //to change the state of the fruit list by adding an new item
        if (fruit.length > 0) {
            this.props.addFruit(fruit);
        }
        //reset the form
        this.refs.fruitForm.reset();
    },
    render: function () {
        return (
            <form className="form-inline" ref="fruitForm" onSubmit={this.createFruit}>
                <div className="form-group">
                    <label for="fruitItem">
                        Fruit Name
                    <input type="text" id="fruitItem" className="form-control" placeholder="e.x.lemmon" ref="fruitName" />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Add Fruit</button>
            </form>
        )

    }
});

var RemoveFruitForm = React.createClass({
    selectFruittoRemove: function (e) {
        var fruit = e.target.value;
        //get the fruit object name from the form
        //var fruit = this.refs.removeFruitSelect.value;
        //call the addFruit method of the App component
        //to change the state of the fruit list by adding an new item
        this.props.removeFruit(fruit);
        //reset the form
        this.refs.removeFruitForm.reset();
    },
    render: function () {
        return (
            <form className="form-inline" ref="removeFruitForm" onChange={this.selectFruittoRemove}>
                <div className="form-group">
                    <label for="selectFruit">
                        List of Fruits
                  <select id="selectFruit" className="form-control">
                            <option value="">Remove a fruit</option>
                            {
                                Object.keys(this.props.fruits).map(function (key) {
                                    return <option value={key}>{this.props.fruits[key]}</option>
                                }.bind(this))
                            }
                        </select>
                    </label>
                </div>
            </form>
        )

    }
});

React.render(
    <App />,
    document.getElementById('app')
);