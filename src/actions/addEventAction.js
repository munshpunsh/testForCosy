export function addEvent (value = {}) {
    return {
        type: 'ADD_EVENT',
        payload: value
    }
}