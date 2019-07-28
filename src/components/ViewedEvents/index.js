import React, { Component } from 'react'
import './style.css'
import Event from '../../components/Event'

class ViewedEvents extends Component {
    state = {
        expanded: 'panel1'
    }

    renderEvents = (events) => {
        return events.map((item,index) => {
            return (
                <Event deleteEvent={this.props.deleteEvent} editEvent={this.props.editEvent} key={index} expanded={this.state.expanded} handleChange={this.handleChange} item={item} index={index}/>
            )
        })
    }

    handleChange = panel => {
        this.setState({
            expanded: panel
        })
    }

    render () {
        const viewedEvents = this.props.viewedEvents;
        return (
            <div className='container_for_months'>
                {this.renderEvents(viewedEvents)}
            </div>
        )
    }
}

export default ViewedEvents