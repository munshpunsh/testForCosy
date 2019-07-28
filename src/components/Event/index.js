import React, { Component } from 'react'
import './style.css'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../components/Form'

class Event extends Component {
    state = {
        edit: false
    }
    handleChange = panel => {
        this.props.handleChange(panel)
    }

    deleteClick = (id) => {
        const {deleteEvent}= this.props
        deleteEvent(id)
    }

    editClick = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    timeForEdit = (time) => {
        let date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + (date.getMonth() + 1):date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    }

    render () {
        const {item,index} = this.props;

        return (
            <ExpansionPanel key={index} expanded={this.props.expanded === `panel${index +1 }`} onChange={() => {this.handleChange(`panel${index +1 }`)}}>
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {item.name}
                    </Typography>
                    <Typography>
                        <EditIcon onClick={this.editClick}/>
                        <DeleteIcon onClick={() => {this.deleteClick(item.id)}}/>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='details'>
                    {!this.state.edit &&
                        <React.Fragment>
                            <Typography>
                                Описание: {item.description}
                            </Typography><br/>
                            <Typography>
                                Время проведения: {String(new Date(item.time))}
                            </Typography><br/>
                            <Typography>
                                Участники: {item.participants.map((participant,i) => (`${participant}${item.participants.length - 1 === i ? '' : ','}`))}
                            </Typography>
                        </React.Fragment>
                    }
                    {
                        this.state.edit &&
                        <Form editClick={this.editClick} editEvent={this.props.editEvent} id={item.id} description={item.description} time={this.timeForEdit(item.time)} name={item.name} participants={item.participants} edit={this.state.edit}/>
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default Event