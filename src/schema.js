import { schema } from 'normalizr';

const day = new schema.Entity('days', {}, {
    idAttribute: 'day_number'
});

const week = new schema.Entity('weeks', {
    days_in_week: [day]
}, {
    idAttribute: 'week_id'
});

const month = new schema.Entity('months',{
    weeks: [week]
}, {
    idAttribute: 'month'
});

export default month;