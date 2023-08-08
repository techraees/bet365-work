import React from "react";

export const CheckQuarter = (data: any) => {

    if (!data) {
        return null
    }
    let tosend = ''
    switch (data?.info?.period) {
        case '1st Quarter':
            tosend = 'Q1'
            break;
        case '2nd Quarter':
            tosend = 'Q2'
            break;
        case '3rd Quarter':
            tosend = 'Q3'
            break;
        case '4th Quarter':
            tosend = 'Q4'
            break;
        default:
            tosend = ''
    }
    return tosend;

}
