import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = {
    box: {
        margin: '15px'
    },

    display: {
        height: '120px',
        borderBottom: '1px solid #ccc'
    },

    input: {
        'style': {
            textAlign: 'right'
        }
    }
};

class App extends React.Component
{
    constructor (props) {
        super(props);

        this.state = {
            input: null,

            buttons: [
                7, 8, 9, 4,
                5, 6, 1, 2,
                3, 0
            ]
        };

        this.changeInput = this.changeInput.bind(this);
    }

    changeInput ({ target }) {
        this.setState({
            input: target.value
        });
    }

    render () {
        return (
            <div style={styles.box}>
                <Card>
                    <CardActionArea>
                        <CardContent style={ styles.display }>
                            <div>{ this.state.input }</div>
                        </CardContent>
                    </CardActionArea>

                    <CardActions>
                        <Input
                            fullWidth
                            inputProps={ styles.input }
                            onChange={ this.changeInput }
                            disableUnderline
                        ></Input>
                    </CardActions>
                </Card>

                <br />

                <Grid
                    container
                    justify="space-between"
                >
                    {this.state.buttons.map((button, index) =>
                        <Grid
                            item
                            xs={4}
                            key={ index }
                        >
                            <Button variant="contained">
                                { button }
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default App;
