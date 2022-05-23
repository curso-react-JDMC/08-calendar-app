import moment from "moment";


export const parepareEvents = (events =[]) => {

    return events.map(event =>({
        ...event,
        start: moment(event.start).valueOf(),
        end: moment(event.end).valueOf(),
    }))
}