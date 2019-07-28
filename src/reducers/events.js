function initState () {
    let store = localStorage.getItem('events');
    if (!store) {
        store = {
            events: [
                {
                    id: Math.random(),
                    name: 'Event 1',
                    time: 1564309043653,
                    participants: ['participant 1', 'participant 2'],
                    description: 'description of Event 1'
                },
                {
                    id: Math.random(),
                    name: 'Event 1',
                    time: 1564296540000,
                    participants: [],
                    description: 'description of Event 1'
                }
            ],
            viewedEvents: [],
            dayForView: undefined
        };
        localStorage.setItem('events', JSON.stringify(store))
    } else {
        store = JSON.parse(store)
    }
    return store;
}
const initialState = initState();

export function eventsReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD_EVENT':
            let stateAfterAdd = {...state};
            stateAfterAdd.events.push(action.payload)
            let day = new Date(action.payload.time);
            if (state.dayForView === day.getDate()) stateAfterAdd.viewedEvents.push(action.payload)
            localStorage.setItem('events', JSON.stringify(stateAfterAdd))
            return stateAfterAdd
        case 'SHOW_DETAILED':
            let stateAfterShow = {...state, viewedEvents: action.payload.events, dayForView:action.payload.day}
            localStorage.setItem('events', JSON.stringify(stateAfterShow))
            return stateAfterShow
        case 'DELETE_EVET':
            let stateAfterDelete = {
                ...state,
                viewedEvents: state.viewedEvents.filter((event) => {if (event.id !== action.payload) return true}),
                events: state.events.filter((event) => {if (event.id !== action.payload) return true})
            }
            localStorage.setItem('events', JSON.stringify(stateAfterDelete))
            return stateAfterDelete
        case 'EDIT_EVENT':
            let newViewedEvents = state.viewedEvents.map((event) => {
                if (event.id === action.payload.id) return action.payload
                return event
            });
            let newEvents = state.viewedEvents.map((event) => {
                if (event.id === action.payload.id) return action.payload
                return event
            });
            let newStateAfterEdit = {
                ...state,
                viewedEvents: newViewedEvents,
                events: newEvents
            }
            localStorage.setItem('events', JSON.stringify(newStateAfterEdit))
            return newStateAfterEdit
        default:
            return state
    }
}