import React, { Component } from 'react'
import Badge from '@material-ui/core/Badge';
import './style.css'

class Day extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.day !== this.props.day || JSON.stringify(nextProps.events) !== JSON.stringify(this.props.events)) {
            return true
        }
        return false
    }

    render () {
        const {events,showEvents, day} = this.props;
        return (
            <div className='one_day' onClick={() => {showEvents({events,day})}}>
                <div className='one_day_content' >
                    <Badge badgeContent={this.props.eventsNumber} color="secondary">
                        <span className='one_day_content_day'> {this.props.day}</span>
                    </Badge>
                </div>
            </div>
            )
    }
}
export default Day