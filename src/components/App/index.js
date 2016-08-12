import React, { Component } from 'react'
import NavBar from '../containers/NavBar'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navHeight: 0,
        };
    }
    render() {
        return (
          <div>
            <NavBar ref="navBar"/>
            <div
                 style={{marginTop: this.state.navHeight + 20}}
            >
                    {this.props.children}
            </div>
          </div>
        );
    }
    componentDidMount() {
        this.setState({navHeight: ReactDOM.findDOMNode(this.refs.navBar).offsetHeight});
    }
}

export default App