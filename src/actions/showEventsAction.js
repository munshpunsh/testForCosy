export function showEvents (value = []) {
    return {
        type: 'SHOW_DETAILED',
        payload: value
    }
}