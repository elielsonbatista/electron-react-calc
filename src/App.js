import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    Grid,
    Input,
    Typography
} from '@material-ui/core';
import {
    Backspace as BackspaceIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

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
        style: {
            textAlign: 'right'
        }
    },

    buttons: {
        backgroundColor: '#fff',
        minWidth: 0,
        minHeight: '36px'
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

            buttons: {
                numberSeven: {
                    text: 7
                },

                NumberEight: {
                    text: 8
                },

                numberNine: {
                    text: 9
                },

                divider: {
                    text: '÷'
                },

                clear: {
                    text: <DeleteIcon fontSize="small" />
                },

                backspace: {
                    text: <BackspaceIcon fontSize="small" />
                },

                numberFour: {
                    text: 4
                },

                numberFive: {
                    text: 5
                },

                numberSix: {
                    text: 6
                },

                multiply: {
                    text: '*'
                },

                parenthesisOpen: {
                    text: '('
                },

                parenthesisClose: {
                    text: ')'
                },

                numberOne: {
                    text: 1
                },

                numberTwo: {
                    text: 2
                },

                numberThree: {
                    text: 3
                },

                subtract: {
                    text: '-'
                },

                power: {
                    text: '^'
                },

                squareRoot: {
                    text: '√'
                },

                numberZero: {
                    text: 0
                },

                comma: {
                    text: ','
                },

                percent: {
                    text: '%'
                },

                plus: {
                    text: '+'
                },

                resolve: {
                    text: '=',
                    size: 4
                }
            }
        };

        this.inputKey = this.inputKey.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    setInput (value) {
        this.setState({
            input: value
        });
    }

    setLastInput (value) {
        this.setState({
            lastInput: value
        });
    }

    setResults (value) {
        this.setState({
            results: value
        });
    }

    inputKey (event) {
        let enabledKeys = [
            '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9',
            '+', '-', '/', '*', 'Enter',
            '^', '(', ')', '√', ',', '!'
        ];

        if (enabledKeys.indexOf(event.key) >= 0) {
            if (event.key === 'Enter') {
                this.resolve();
            }
        } else {
            event.preventDefault();
        }
    }

    inputChange ({ target }) {
        this.setInput(target.value.replace('/', '÷'));
    }

    pressButton (key, { value, text }) {
        switch (key) {
            case 'resolve':
                this.resolve();
                break;
            case 'backspace':
                this.popInput();
                break;
            case 'clear':
                this.clear();
                break;
            default:
                this.pushInput((value !== undefined) ? value : text);
                break;
        }
    }

    pushInput (value) {
        this.setInput(this.state.input + value);
    }

    popInput () {
        let { input } = this.state;

        if (input.length) {
            this.setInput(input.substr(0, input.length - 1));
        }
    }

    clear () {
        this.setInput('');
        this.setResults([]);
    }

    resolve () {
        let { input, lastInput, results } = this.state;

        if (input && input !== lastInput) {
            let resultsArr = results;
            let value = this.calc(input);
            let result = `${input} = ${value}`;

            resultsArr.unshift(result);

            this.setResults(results);
            this.setInput(value);
            this.setLastInput(value);
        }
    }

    calc (value) {
        value = value.replace(/,/g, '.');
        value = value.replace(/÷/g, '/');
        value = value.replace(/ /, '');

        return eval(value).toString().replace('.', ',');
    }

    render () {
        return (
            <div style={styles.box}>
                <Card>
                    <CardActionArea>
                        <CardContent style={styles.display}>
                            {
                                this.state.results.map((result, index) => 
                                    <Typography key={index} variant="body2">
                                        {result}
                                    </Typography>
                                )
                            }
                        </CardContent>
                    </CardActionArea>

                    <CardActions>
                        <Input
                            value={this.state.input}
                            fullWidth
                            inputProps={styles.input}
                            disableUnderline
                            onKeyPress={this.inputKey}
                            onChange={this.inputChange}
                        ></Input>
                    </CardActions>
                </Card>

                <br />

                <Grid
                    container
                    justify="space-between"
                    spacing={1}
                >
                    {Object.entries(this.state.buttons).map((button, index) =>
                        <Grid
                            item
                            xs={(button[1].size) ? button[1].size : 2}
                            key={index}
                        >
                            <Grid>
                                <Button
                                    variant="contained"
                                    style={styles.buttons}
                                    fullWidth
                                    onClick={() => this.pressButton(button[0], button[1])}
                                >
                                    {button[1].text}
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default App;
