import React, { Component } from 'react'
import {Container, Typography, Grid, TextField} from '@material-ui/core/';
import Calendar from './components/Calendar'
import ViewedEvents from './components/ViewedEvents'
import Form from './components/Form'
import {connect} from "react-redux";
import {addEvent} from './actions/addEventAction'
import {showEvents} from './actions/showEventsAction'
import {deleteEvent} from './actions/deleteEventAction'
import {editEvent} from './actions/editEventAction'

class App extends Component {
    state = {
        year: 2019,
        month: 6
    }

    handleChange = (e) => {
        this.setState({
            year: Number(e.target.value.split('-')[0]),
            month: Number(e.target.value.split('-')[1]) - 1,
        })
    }

    render() {
        const {year, month} = this.state;
        return (
            <Container maxWidth="lg" >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={'h5'} align={'center'} className='Title'>
                            Календарь событий
                        </Typography>
                        <Typography variant={'h5'} align={'center'} className='Title'>
                            <TextField
                                onChange={this.handleChange}
                                id="date"
                                label="Выберите месяц"
                                type="date"
                                defaultValue="2019-07-28"
                            />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        lg={this.props.events.viewedEvents.length > 0 ? 6 : 12}
                    >
                        <Calendar year={year} month={month} events={this.props.events.events} showEvents={this.props.showEvents}/>
                    </Grid>
                    {
                        this.props.events.viewedEvents.length > 0 &&
                        <Grid
                            item
                            lg={6}
                        >
                            <ViewedEvents editEvent={this.props.editEvent} deleteEvent={this.props.deleteEvent} viewedEvents={this.props.events.viewedEvents} />
                        </Grid>
                    }
                    <Grid
                        item
                        lg={8}
                    >
                        <Form addEvent={this.props.addEvent}/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
const MapDispatchToProps = dispatch => {
    return {
        addEvent: event => dispatch(addEvent(event)),
        deleteEvent: event => dispatch(deleteEvent(event)),
        editEvent: event => dispatch(editEvent(event)),
        showEvents: events => dispatch(showEvents(events))
    }
}

const MapStateToProps = store => {
    return {
        events: store.events,
    }
}

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(App)