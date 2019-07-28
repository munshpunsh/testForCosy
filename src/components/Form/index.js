import React, { Component } from 'react'
import {TextField, Grid, Button, Typography} from '@material-ui/core/';
import './style.css'


class Form extends Component {
    state = {
        participants: this.props.participants ? this.props.participants : [],
        name: this.props.name ? this.props.name : '',
        description: this.props.description ? this.props.description : '',
        datetime: this.props.time ? this.props.time : '2019-07-28T10:49'
    }

    deleteParticipant (index) {
        let newState = this.state.participants;
        newState.splice(index,1)
        this.setState({
            participants: newState
        })
    }

    handleClick = () => {
        let newState = this.state.participants;
        newState.push(this.refs.participant.querySelector('input').value);
        this.setState({
            participants: newState
        })
        this.refs.participant.querySelector('input').value = '';
        this.forceUpdate()
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.id;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {addEvent, editEvent, editClick} = this.props;
        const time = new Date(this.state.datetime);
        let event = {
            id: this.props.id ? this.props.id : Math.random(),
            name: this.state.name,
            time: time.getTime(),
            participants: this.state.participants,
            description: this.state.description
        }
        if (this.props.edit) {
            editEvent(event)
            editClick()
        } else {
            addEvent(event)
        }

        e.target.name.value = '';
        e.target.description.value = '';
        this.setState({
            participants: []
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state)) {
            return true
        }
        return false
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit} className='form_for_add'>
                <Grid container spacing={2}>
                    <Grid item lg={this.props.edit ? 12 : 4}>
                        <TextField
                            id="datetime"
                            label="Выберите дату"
                            type="datetime-local"
                            defaultValue={this.props.time ? this.props.time : '2019-07-28T10:49'}
                            onChange={this.handleChange}
                            required
                        />
                    </Grid>
                    <Grid item lg={this.props.edit ? 12 : 4}>
                        <TextField
                            id="name"
                            label="Введите название"
                            type="text"
                            defaultValue={this.props.name ? this.props.name : ''}
                            onChange={this.handleChange}
                            required
                        />
                    </Grid>
                    <Grid item lg={this.props.edit ? 12 : 4}>
                        <TextField
                            id="description"
                            label="Введите описание"
                            type="text"
                            defaultValue={this.props.description ? this.props.description : ''}
                            onChange={this.handleChange}
                            required
                        />
                    </Grid>
                    <Grid item container lg={12}>
                        <Grid container spacing={2} alignItems='flex-end'>
                            <Grid item lg={12}>
                                {
                                    this.state.participants.map((participant,index) => {
                                        return (
                                            <Grid key={index} direction='row' alignItems='center' container item lg={12}>
                                                <Typography>
                                                    Участник {index + 1}:
                                                </Typography>
                                                <Typography>
                                                    &nbsp;{participant}
                                                </Typography>
                                                <Button style={{marginLeft:`15px`}} onClick={() => {this.deleteParticipant(index)}} type='button' variant='contained'>
                                                    Удалить
                                                </Button>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="participant"
                                    label="Добавьте участника"
                                    type="text"
                                    defaultValue=""
                                    ref='participant'
                                />
                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleClick} type='button' variant='contained'>
                                    Добавить
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4}>
                        <Button type='submit' variant='contained'>
                            {this.props.edit ? 'Изменить' : 'Сохранить событие'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            )
    }
}
export default Form