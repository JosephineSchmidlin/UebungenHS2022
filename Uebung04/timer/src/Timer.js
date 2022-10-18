import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: props.countdown};
        this.interval = "0";
        this.decrease = this.decrease.bind(this);
        this.start = this.start.bind(this);
    }

    decrease() {
        this.setState({count: this.state.count - 1});
        if (this.state.count == "0") {
            this.setState({count: "Fertig!"});
            clearInterval(this.interval);
            this.interval = "0";
        }
        
    }

    start() {
        this.setState({count: this.props.countdown});
        
        if (this.interval != "0") {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.decrease, 1000);
    }

    render() {
        return (<>
             {this.state.count} <br/>
            <button onClick={this.start}>Start</button>
        </>);
    }
}

export default Timer;
