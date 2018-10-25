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
        textAlign: 'right',
        borderBottom: '1px solid #ccc',
        overflowY: 'auto'
    },

    input: {
        'style': {
            textAlign: 'right'
        }
    },

    buttons: {
        backgroundColor: '#fff',
        minWidth: 0
    }
};

class App extends React.Component
{
    constructor (props) {
        super(props);

        this.state = {
            input: '',
            lastInput: '',
            results: [],

            buttons: [
                {
                    text: 7,
                    size: 2
                },

                {
                    text: 8,
                    size: 2
                },

                {
                    text: 9,
                    size: 2
                },

                {
                    text: '÷',
                    size: 2
                },

                {
                    text: 'C',
                    size: 2
                },

                {
                    text: 'U',
                    size: 2
                },

                {
                    text: 4,
                    size: 2
                },

                {
                    text: 5,
                    size: 2
                },

                {
                    text: 6,
                    size: 2
                },

                {
                    text: '*',
                    size: 2
                },

                {
                    text: '(',
                    size: 2
                },

                {
                    text: ')',
                    size: 2
                },

                {
                    text: 1,
                    size: 2
                },

                {
                    text: 2,
                    size: 2
                },

                {
                    text: 3,
                    size: 2
                },

                {
                    text: '-',
                    size: 2
                },

                {
                    text: '^',
                    size: 2
                },

                {
                    text: 'R',
                    size: 2
                },

                {
                    text: 0,
                    size: 2
                },

                {
                    text: ',',
                    size: 2
                },

                {
                    text: '%',
                    size: 2
                },

                {
                    text: '+',
                    size: 2
                },

                {
                    text: '=',
                    size: 4
                }
            ]
        };

        this.inputChange = this.inputChange.bind(this);
        this.add = this.add.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    inputChange ({ target }) {
        this.setState({
            input: target.value
        });
    }

    add (value) {
        this.setState({
            input: this.state.input + value
        });
    }

    resolve () {
        if (this.state.input && this.state.input != this.state.lastInput) {
            let results = this.state.results;
            let value = this.calc(this.state.input);
            let result = this.state.input + ' = ' + value;

            results.push(result);

            this.setState({
                results: results,
                lastInput: value
            });
        }
    }

    calc (value) {
        let formated = '';

        value.replace(',', '.');

        for (let i = 0; i < value.length; i++) {
            if (value.charAt(i) == '÷') {
                formated += '/';
            } else {
                formated += value.charAt(i);
            }
        }

        formated.replace('.', ',');

        return eval(formated);
    }

    render () {
        return (
            <div style={ styles.box }>
                <Card>
                    <CardActionArea>
                        <CardContent style={ styles.display }>
                            {
                                this.state.results.map((result, index) => 
                                    <div key={ index }>
                                        { result }
                                    </div>
                                )
                            }
                        </CardContent>
                    </CardActionArea>

                    <CardActions>
                        <Input
                            value={ this.state.input }
                            fullWidth
                            inputProps={ styles.input }
                            disableUnderline
                            onChange={ this.inputChange }
                        ></Input>
                    </CardActions>
                </Card>

                <br />

                <Grid
                    container
                    justify="space-between"
                    spacing={ 8 }
                >
                    {
                        this.state.buttons.map((button, index) =>
                            <Grid
                                item
                                xs={ button.size }
                                key={ index }
                            >
                                <Grid>
                                    {
                                        (button.text === '=') ? (
                                            <Button
                                                variant="contained"
                                                style={ styles.buttons }
                                                fullWidth
                                                onClick={ this.resolve }
                                            >
                                                { button.text }
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                style={ styles.buttons }
                                                fullWidth
                                                onClick={ () => this.add(button.text) }
                                            >
                                                { button.text }
                                            </Button>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        );
    }
}

export default App;
