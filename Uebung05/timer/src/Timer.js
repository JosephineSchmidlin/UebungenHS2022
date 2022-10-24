import React, {Component} from "react";
import TextField  from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.count, end: "", render: true};
        this.interval = null;
    
        // Event-Handler registrieren:
        this.update = this.update.bind(this);
        this.buttonclicked = this.buttonclicked.bind(this);
        this.time = this.time.bind(this);
    }
   

    buttonclicked(event) {
        this.setState({render: !this.state.render});
        this.setState({count: this.state.count, end:""});

        if (this.interval != null)
        {
            clearInterval(this.interval);
        }

        this.interval = setInterval(this.update, 1000);


    }

    update() {
        
        this.setState({ count: this.state.count - 1 });
        if (this.state.count <= 1) {
            this.setState({end: "FERTIG"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = null;
            this.setState({render: true});
        }


    }

    time(event) {
        this.setState({count: event.target.value});
    }

    render(){

        return (
        <>
            {this.state.render &&
            <Grid container>
                <Grid>
                    <br/>
                    <TextField label="Sekunden" value={this.state.count} onChange={this.time} inputProps={{type: "number"}}/>
                </Grid>
            </Grid>
            }
            <br/>
            <Button onClick={this.buttonclicked} style={{margin:20}} variant="contained" color="secondary">Start</Button> 

        <Grid>
            <h1>{this.state.count}</h1>
            <h1>{this.state.end}</h1>
        </Grid> 

        </>)

    }
}

export default Timer;