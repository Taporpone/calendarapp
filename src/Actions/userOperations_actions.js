export const CURRENT_USER = 'CURRENT_USER';
export const CURRENT_MONTH = 'CURRENT_MONTH';
export const SELECTED_WEEK = 'SELECTED_WEEK';

export function currentUser(id) {
    return {
        type: CURRENT_USER,
        id
    };
}

export function currentMonth(month) {
    return {
        type: CURRENT_MONTH,
        month
    };
}

export function selectedWeek(week_id) {
    return {
        type: SELECTED_WEEK,
        week_id
    };
}