import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import BackspaceIcon from '@material-ui/icons/Backspace';

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

            buttons: {
                number_7: {
                    text: 7,
                    size: 2
                },

                number_8: {
                    text: 8,
                    size: 2
                },

                number_9: {
                    text: 9,
                    size: 2
                },

                operator_divider: {
                    text: '÷',
                    size: 2
                },

                clear: {
                    text: <DeleteIcon fontSize="small" />,
                    size: 2
                },

                backspace: {
                    text: <BackspaceIcon fontSize="small" />,
                    size: 2,
                },

                number_4: {
                    text: 4,
                    size: 2
                },

                number_5: {
                    text: 5,
                    size: 2
                },

                number_6: {
                    text: 6,
                    size: 2
                },

                multiply: {
                    text: '*',
                    size: 2
                },

                parenthesis_open: {
                    text: '(',
                    size: 2
                },

                parenthesis_close: {
                    text: ')',
                    size: 2
                },

                number_1: {
                    text: 1,
                    size: 2
                },

                number_2: {
                    text: 2,
                    size: 2
                },

                number_3: {
                    text: 3,
                    size: 2
                },

                subtract: {
                    text: '-',
                    size: 2
                },

                power: {
                    text: '^',
                    size: 2
                },

                square_root: {
                    text: '√',
                    size: 2
                },

                number_0: {
                    text: 0,
                    size: 2
                },

                comma: {
                    text: ',',
                    size: 2
                },

                percent: {
                    text: '%',
                    size: 2
                },

                plus: {
                    text: '+',
                    size: 2
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
        let enabled_keys = [
            '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9',
            '+', '-', '/', '*', 'Enter',
            '^', '(', ')', '√', ',', '!'
        ];

        if (enabled_keys.indexOf(event.key) >= 0) {
            if (event.key === 'Enter') {
                this.resolve();
            }
        } else {
            event.preventDefault();
        }
    }

    inputChange ({ target }) {
        this.setInput(target.value);
    }

    pressButton (key, obj) {
        if (key === 'resolve') {
            this.resolve();
        } else if (key === 'backspace') {
            this.popInput();
        } else if (key === 'clear') {
            this.clear();
        } else {
            this.pushInput((obj.value !== undefined) ? obj.value : obj.text);
        }
    }

    pushInput (value) {
        this.setInput(this.state.input + value);
    }

    popInput () {
        if (this.state.input.length) {
            this.setInput(this.state.input.substr(0, this.state.input.length - 1));
        }
    }

    clear () {
        this.setInput('');
        this.setResults([]);
    }

    resolve () {
        if (this.state.input && this.state.input !== this.state.lastInput) {
            let results = this.state.results;
            let value = this.calc(this.state.input);
            let result = this.state.input + ' = ' + value;

            results.push(result);

            this.setResults(results);
            this.setLastInput(value);
        }
    }

    calc (value) {
        let formated = '';

        value = value.replace(/,/g, '.');

        for (let i = 0; i < value.length; i++) {
            if (value.charAt(i) === '÷') {
                formated += '/';
            } else {
                formated += value.charAt(i);
            }
        }

        return eval(formated).toString().replace('.', ',');
    }

    split (value) {

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
                            onKeyPress={ this.inputKey }
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
                        Object.entries(this.state.buttons).map((button, index) =>
                            <Grid
                                item
                                xs={ button[1].size }
                                key={ index }
                            >
                                <Grid>
                                    <Button
                                        variant="contained"
                                        style={ styles.buttons }
                                        fullWidth
                                        onClick={ () => this.pressButton(button[0], button[1]) }
                                    >
                                        { button[1].text }
                                    </Button>
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
