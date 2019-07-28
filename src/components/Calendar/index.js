import React, { Component } from 'react'
import daysInMonths from '../../methods/daysInMonths'
import Day from '../../components/Day'
import './style.css'


class Calendar extends Component {
    renderDays = (number, events, year, month) => {
        let arrayForDays = [];
        for (let i = 1; i <= number; i++) {
            let DateForDay = new Date(year,month, i);
            let eventsForCurrentDay = events.filter((event) => {
                const day = new Date(event.time);
                if (day.getDate() === DateForDay.getDate() && day.getMonth() === DateForDay.getMonth()) return true
                return false
            })
            let day = <Day events={eventsForCurrentDay} showEvents={this.props.showEvents} eventsNumber={eventsForCurrentDay.length} key={i} day={i}/>;
            arrayForDays.push(day);
        }
        return arrayForDays;
    }


    render () {
        const {year, month} = this.props;
        const numberOfDays = daysInMonths(year,month);
        const {events} = this.props;
        return (
            <div className='container_for_months'>
                {this.renderDays(numberOfDays, events, year, month)}
            </div>
        )
    }
}



export default Calendar