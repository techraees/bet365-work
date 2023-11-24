'use client';
import React from "react";

//Asian Handicap
export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [{title: 'Total', value: null, suspend: 0}] as any;
    const spreads = [] as any;
    const moneys = [{title: 'Money', value: null, suspend: 0}] as any;
    const arr = {title: 'Spread', value: null, suspend: 0};
    spreads.push(arr);
    if (data?.odds?.[9312464]?.participants) {
        const spread = Object.entries(data?.odds?.[9312464]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (spreads.length < 3 && (title === "Home" || title == "Away")) {
                    spreads.push({title: `${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }

    if(data?.odds?.[83]?.participants) {
        const ou = Object.entries(data?.odds?.[83]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (total.length < 3 && title === "Over"){
                    total.push({title: `O ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
                if (total.length < 3 && title === "Under"){
                    total.push({title: `U ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }

    if(data?.odds?.[54]?.participants) {
        const money = Object.entries(data?.odds?.[54]?.participants)
        if (money.length > 0) {
            money.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (moneys.length < 3 && title === "Home"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
                if (moneys.length < 3 && title === "Away"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
            })
        }
    }

    // console.log('Sending New Data', data)
    let rows = [] as any;
    if(spreads.length > 1)
        rows.push(spreads);
    if(total.length > 1)
        rows.push(total);
    if(moneys.length > 1)
        rows.push(moneys);

    return {header, rows: rows};
}

export const period2Lines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [{title: 'Total', value: null, suspend: 0}] as any;
    const spreads = [] as any;
    const moneys = [{title: 'Money', value: null, suspend: 0}] as any;
    const arr = {title: 'Spread', value: null, suspend: 0};
    spreads.push(arr);
    if (data?.odds?.[9312459]?.participants) {
        const spread = Object.entries(data?.odds?.[9312459]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (spreads.length < 3 && (title === "Home" || title == "Away")) {
                    spreads.push({title: `${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }
    if(data?.odds?.[85]?.participants) {
        const ou = Object.entries(data?.odds?.[85]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (total.length < 3 && title === "Over"){
                    total.push({title: `O ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
                if (total.length < 3 && title === "Under"){
                    total.push({title: `U ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }
    if(data?.odds?.[58]?.participants) {
        const money = Object.entries(data?.odds?.[58]?.participants)
        if (money.length > 0) {
            money.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (moneys.length < 3 && title === "Home"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
                if (moneys.length < 3 && title === "Away"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
            })
        }
    }
    let rows = [] as any;
    if(spreads.length > 1)
        rows.push(spreads);
    if(total.length > 1)
        rows.push(total);
    if(moneys.length > 1)
        rows.push(moneys);
    return {header, rows: rows};
}

export const period3Lines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [{title: 'Total', value: null, suspend: 0}] as any;
    const spreads = [] as any;
    const moneys = [{title: 'Money', value: null, suspend: 0}] as any;
    const arr = {title: 'Spread', value: null, suspend: 0};
    spreads.push(arr);
    if (data?.odds?.[9312460]?.participants) {
        const spread = Object.entries(data?.odds?.[9312460]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (spreads.length < 3 && (title === "Home" || title == "Away")) {
                    spreads.push({title: `${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }
    if(data?.odds?.[86]?.participants) {
        const ou = Object.entries(data?.odds?.[86]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (total.length < 3 && title === "Over"){
                    total.push({title: `O ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
                if (total.length < 3 && title === "Under"){
                    total.push({title: `U ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
                }
            })
        }
    }
    if(data?.odds?.[59]?.participants) {
        const money = Object.entries(data?.odds?.[59]?.participants)
        if (money.length > 0) {
            money.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (moneys.length < 3 && title === "Home"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
                if (moneys.length < 3 && title === "Away"){
                    moneys.push({title: '', value: item[1].value_eu, suspend});
                }
            })
        }
    }
    let rows = [] as any;
    if(spreads.length > 1)
        rows.push(spreads);
    if(total.length > 1)
        rows.push(total);
    if(moneys.length > 1)
        rows.push(moneys);
    return {header, rows: rows};
}

export const raceTo = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name, 'Neither'];
    let races = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312467]?.participants) {
        const race = Object.entries(data?.odds?.[9312467]?.participants)
        if (race.length > 0) {
            race.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name;
                if(title == "1") {
                    if(row.length == 4) {
                        races.push(row);
                        row = [] as any;
                    }
                    row.push({ title: item[1].handicap, value: '', suspend});
                }
                row.push({title: '', value: item[1]?.value_eu, suspend: item[1].suspend});
            })
        }
    }
    if(row.length > 0)
        races.push(row);
    return {header, rows: races};
}

export const goalScorer = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    let marketname : string = ``; 
    Object.keys(data?.odds).map((item) => {
        if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes('goal?')) {
            let ngoal = data.odds[item].name.replace('Which team will score the ', '');
            marketname = ngoal.replace(' goal?', '')
        }
    });
    marketname = `${marketname} Goal Scorer`;

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[5100001]?.participants) {
        const items: any = Object.entries(data?.odds?.[5100001]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, rows: lines};
}

export const homeTeamGoalScorer = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    let marketname : string = ``;
    let suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[5100002]?.participants) {
        const items: any = Object.entries(data?.odds?.[5100002]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            if(lines.length == 0 && row.length == 0)
                marketname = `${data?.team_info?.home?.name} ${item.handicap}${suffix[item.handicap]} Goalscorer`;
            row.push({ title: item.name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, rows: lines};
}

export const awayTeamGoalScorer = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    let marketname : string = ``;
    let suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[5100003]?.participants) {
        const items: any = Object.entries(data?.odds?.[5100003]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            if(lines.length == 0 && row.length == 0)
                marketname = `${data?.team_info?.away?.name} ${item.handicap}${suffix[item.handicap]} Goalscorer`;
            row.push({ title: item.name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, rows: lines};
}

export const toScore2OrMore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[5100012]?.participants) {
        const items: any = Object.entries(data?.odds?.[5100012]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return lines;
}

export const toScore3OrMore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[5100013]?.participants) {
        const items: any = Object.entries(data?.odds?.[5100013]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return lines;
}

export const _10MinWinner3Way = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312475]?.participants) {
        const items: any = Object.entries(data?.odds?.[9312475]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            const name = item.name == "Home" ? data?.team_info?.home?.name : "Away" ? data?.team_info?.away?.name : item.name;
            row.push({ title: name,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
        });
    }
    if(row.length > 0)
        lines.push(row);
    return lines;
}

export const alternativePuckLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312464]?.participants) {
        const items: any = Object.entries(data?.odds?.[9312464]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.handicap,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {header, rows: lines};
}

export const asianPuckLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    const marketname = `Asian Puck Line (${data?.team_info?.home?.score}-${data?.team_info?.away?.score})`
    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312457]?.participants) {
        const items: any = Object.entries(data?.odds?.[9312457]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.handicap,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, header, rows: lines};
}

export const period2AsianPuckLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    const marketname = `Period 2 Asian Puck Line (${data?.stats[2]?.home}-${data?.stats[2]?.home})`
    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312459]?.participants) {
        const items: any = Object.entries(data?.odds?.[9312459]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.handicap,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, header, rows: lines};
}

export const period3AsianPuckLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    const marketname = `Period 3 Asian Puck Line (${data?.stats[3]?.home}-${data?.stats[3]?.home})`
    let lines = [] as any;
    let row = [] as any;
    if (data?.odds?.[9312460]?.participants) {
        const items: any = Object.entries(data?.odds?.[9312460]?.participants);
        items.map((itm: any) => {
            const item = itm[1];
            row.push({ title: item.handicap,  value: `${item.value_eu >= 0 ? '+' : ''}${item.value_eu}`, suspend: item.suspend});
            if(row.length == 2) {
                lines.push(row);
                row = [] as any;
            }
        });
    }
    return {marketname, header, rows: lines};
}

export const asianGoalLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', 'Over', 'Under'];
    const marketname = `Asian Goal Line (${data?.team_info?.home?.score}-${data?.team_info?.away?.score})`
    let races = [] as any;
    let row = [] as any;
    if (data?.odds?.[95108]?.participants) {
        const race = Object.entries(data?.odds?.[95108]?.participants)
        if (race.length > 0) {
            race.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name;
                if(title == "Over") {
                    if(row.length == 3) {
                        races.push(row);
                        row = [] as any;
                    }
                    row.push({ title: item[1].handicap, value: '', suspend});
                }
                row.push({title: '', value: item[1]?.value_eu, suspend: item[1].suspend});
            })
        }
    }
    if(row.length > 0)
        races.push(row);
    return {marketname, header, rows: races};
}

export const period2AsianGoalLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    let races = [] as any;
    let row = [] as any;
    if (data?.odds?.[95110]?.participants) {
        const race = Object.entries(data?.odds?.[95110]?.participants)
        if (race.length > 0) {
            race.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name;
                if(title == "Over") {
                    if(row.length == 3) {
                        races.push(row);
                        row = [] as any;
                    }
                    row.push({ title: item[1].handicap, value: '', suspend});
                }
                row.push({title: '', value: item[1]?.value_eu, suspend: item[1].suspend});
            })
        }
    }
    if(row.length > 0)
        races.push(row);
    return {rows: races};
}
export const doubleChance = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[170095]?.participants) {
        const spread = Object.entries(data?.odds?.[170095]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home or Draw") {
                    title = `${data?.team_info?.home?.name} or Draw`
                }
                if (title === "Away or Draw") {
                    title = `${data?.team_info?.away?.name} or Draw`
                }
                if (title === "Home or Away") {
                    title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}
export const doubleChance2nd = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[72]?.participants) {
        const spread = Object.entries(data?.odds?.[72]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home or Draw") {
                    title = `${data?.team_info?.home?.name} or Draw`
                }
                if (title === "Away or Draw") {
                    title = `${data?.team_info?.away?.name} or Draw`
                }
                if (title === "Home or Away") {
                    title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}
export const doubleChance3rd = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[73]?.participants) {
        const spread = Object.entries(data?.odds?.[73]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home or Draw") {
                    title = `${data?.team_info?.home?.name} or Draw`
                }
                if (title === "Away or Draw") {
                    title = `${data?.team_info?.away?.name} or Draw`
                }
                if (title === "Home or Away") {
                    title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const halfTimeResult = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[27]?.participants) {
        const spread = Object.entries(data?.odds?.[27]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home") {
                    title = data?.team_info?.home?.name
                }
                if (title === "Away") {
                    title = data?.team_info?.away?.name
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const nthGoalMarketName = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let goal = ''
    let home = '';
    let nogoal = '';
    let away = '';
    let suspend = '0';
    let tosend = [] as any;
    if (data) {
        Object.keys(data?.odds).map((item) => {
            if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes('goal?')) {
                let ngoal = data.odds[item].name.replace('Which team will score the ', '');
                goal = ngoal.replace(' goal?', '')
                // console.log(data.odds[item])
                const spread = Object.entries(data?.odds?.[item]?.participants)
                const arr = [] as any;
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = '0';
                    title = item[1]?.name
                    if (title === "1") {
                        title = data?.team_info?.home?.name
                    }
                    if (title === "2") {
                        title = data?.team_info?.away?.name
                    }
                    if (title === "No goal") {
                        title = `No ${goal} Goal`
                    }
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                })
                suspend = data.odds[item].suspend;
                tosend.push(arr)
            }
        })
    }
    oddData.suspend = suspend
    oddData.marketname = goal + ' Goal';
    oddData.rows = tosend;
    return oddData;

}
export const matchGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    if (data?.odds?.[421]?.participants) {
        const participantsObject = { ...data?.odds?.[421]?.participants };
        const keys = Object.keys(participantsObject).slice(-2);

        // console.log(keys);
        let arr = [] as any;
        keys.map((key: any, index: number) => {
            if (index === 0) {
                arr.push({ title: data?.odds?.[421]?.participants[key].handicap, value: null, suspend: data?.odds?.[421]?.participants[key].suspend },)
            }
            arr.push({ title: '', value: data?.odds?.[421]?.participants[key].value_eu, suspend: data?.odds?.[421]?.participants[key].suspend },)
        })
        tosend.push(arr)
    }
    return tosend

}

export const threeWayHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[11]?.participants) {
        const spread = Object.entries(data?.odds?.[11]?.participants)
        if (spread.length > 0) {
            let existing = [] as any;
            spread.forEach(([key, value]: [any, any]) => {
                existing.push({ title: value.handicap, value: value.value_eu, suspend: value.suspend });
                if (existing.length == 3) {
                    tosend.push(existing);
                    existing = []
                }
            });

        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}
export const goalOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[10562]?.participants) {
        const spread = Object.entries(data?.odds?.[10562]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const toWin2ndHalf = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[50246]?.participants) {
        const spread = Object.entries(data?.odds?.[50246]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home") {
                    title = data?.team_info?.home?.name
                }
                if (title === "Away") {
                    title = data?.team_info?.away?.name
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const drawNoBet = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[170092]?.participants) {
        const spread = Object.entries(data?.odds?.[170092]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home") {
                    title = data?.team_info?.home?.name
                }
                if (title === "Away") {
                    title = data?.team_info?.away?.name
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const lastTeamToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[44]?.participants) {
        const spread = Object.entries(data?.odds?.[44]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "1") {
                    title = data?.team_info?.home?.name
                }
                if (title === "2") {
                    title = data?.team_info?.away?.name
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const firstHalfGoals = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[31]?.participants) {
        const participantsObject = data?.odds?.[31]?.participants;
        if (participantsObject) {
            let array = [] as any;
            array = Object.values(participantsObject).reduce((acc: any, participant: any) => {
                const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

                if (existingIndex !== -1) {
                    acc[existingIndex].push({
                        title: "",
                        value: participant.value_eu,
                        suspend: participant.suspend
                    });
                } else {
                    acc.push([
                        { title: participant.handicap, value: null, suspend: participant.suspend },
                        { title: "", value: participant.value_eu, suspend: participant.suspend }
                    ]);
                }

                return acc;
            }, []);
            array.sort((a: any, b: any) => a[0].title - b[0].title);
            return array;
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const goalLine = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[90008]?.participants) {
        const participantsObject = data?.odds?.[90008]?.participants;
        if (participantsObject) {
            let array = [] as any;
            array = Object.values(participantsObject).reduce((acc: any, participant: any) => {
                const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

                if (existingIndex !== -1) {
                    acc[existingIndex].push({
                        title: "",
                        value: participant.value_eu,
                        suspend: participant.suspend
                    });
                } else {
                    acc.push([
                        { title: participant.handicap, value: null, suspend: participant.suspend },
                        { title: "", value: participant.value_eu, suspend: participant.suspend }
                    ]);
                }

                return acc;
            }, []);
            array.sort((a: any, b: any) => a[0].title - b[0].title);
            return array;
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}
interface FormattedData {
    title: string;
    value: string;
    suspend: string;
}

export const finalScore = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;

    if (data?.odds?.[10001]?.participants) {
        const result = [] as any;
        const left = [] as any;
        const middle = [] as any;
        const right = [] as any;
        Object.keys(data?.odds?.[10001]?.participants).map(item => {
            let checkingData = data?.odds?.[10001]?.participants[item]?.name.split('-');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (data?.odds?.[10001]?.participants[item]?.suspend === "0") {
                if (checkingData[0] > checkingData[1]) {
                    left.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                } else if (checkingData[0] === checkingData[1]) {
                    middle.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                } else {
                    right.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                }
            }
        })
        // console.log({ left: left, middle: middle, right: right })
        let maxlength = left.length;
        if (middle.length > maxlength) {
            maxlength = middle.length
        }
        if (right.length > maxlength) {
            maxlength = right.length
        }

        for (let i = 0; i < maxlength; i++) {
            let l = left[i] ? left[i] : { title: ' ', value: ' ', suspend: '0' }
            let m = middle[i] ? middle[i] : { title: ' ', value: ' ', suspend: '0' }
            let r = right[i] ? right[i] : { title: ' ', value: ' ', suspend: '0' }
            result.push([l, m, r])
        }
        tosend = result
    }
    // console.log({ tosend })
    return tosend
}

export const correctScore = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let header = [data?.team_info?.home?.name, 'Draw', data?.team_info?.away?.name];
    let tosend = [] as any;

    if (data?.odds?.[9200261]?.participants) {
        const result = [] as any;
        const left = [] as any;
        const middle = [] as any;
        const right = [] as any;
        Object.keys(data?.odds?.[9200261]?.participants).map(item => {
            let checkingData = data?.odds?.[9200261]?.participants[item]?.name.split('-');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (data?.odds?.[9200261]?.participants[item]?.suspend === "0") {
                if (checkingData[0] > checkingData[1]) {
                    left.push({
                        title: data?.odds?.[9200261]?.participants[item]?.name,
                        value: data?.odds?.[9200261]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[9200261]?.participants[item]?.suspend
                    })
                } else if (checkingData[0] === checkingData[1]) {
                    middle.push({
                        title: data?.odds?.[9200261]?.participants[item]?.name,
                        value: data?.odds?.[9200261]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[9200261]?.participants[item]?.suspend
                    })
                } else {
                    right.push({
                        title: data?.odds?.[9200261]?.participants[item]?.name,
                        value: data?.odds?.[9200261]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[9200261]?.participants[item]?.suspend
                    })
                }
            }
        })
        // console.log({ left: left, middle: middle, right: right })
        let maxlength = left.length;
        if (middle.length > maxlength) {
            maxlength = middle.length
        }
        if (right.length > maxlength) {
            maxlength = right.length
        }

        for (let i = 0; i < maxlength; i++) {
            let l = left[i] ? left[i] : { title: ' ', value: ' ', suspend: '0' }
            let m = middle[i] ? middle[i] : { title: ' ', value: ' ', suspend: '0' }
            let r = right[i] ? right[i] : { title: ' ', value: ' ', suspend: '0' }
            result.push([l, m, r])
        }
        tosend = result
    }
    // console.log({ tosend })
    return { header, rows: tosend }
}

export const period3CorrectScore = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    let tosend = [] as any;

    if (data?.odds?.[9200261]?.participants) {
        let result = [] as any;
        Object.keys(data?.odds?.[9200261]?.participants).map(item => {
            let correctScore = data?.odds?.[9200261]?.participants[item]?.name;
            let score = correctScore.split('-');
            if(score.length != 2 || isNaN(score[0])) {
                result.push({title: correctScore.name, value: '', suspend: correctScore.suspend});
                result.push({title: '', value: correctScore.value_eu, suspend: correctScore.suspend});
                tosend.push(result);
                result = [] as any;
            } else {
                score[0] = Number(score[0]);
                score[1] = Number(score[1]);
                if (correctScore?.suspend === "0") {
                    if(score[0] > score[1]) {
                        if(result.length > 0) {
                            tosend.push(result);
                            result = [] as any;
                        }
                        result.push({title: correctScore.name, value: '', suspend: correctScore.suspend});
                    }
                    result.push({title: '', value: correctScore.value_eu, suspend: correctScore.suspend});
                }
            }
        })
        if(result.length > 0)
            tosend.push(result);
    }
    // console.log({ tosend })
    return { header, rows: tosend }
}

export const halfTimeFullTime = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    if (data?.odds?.[226]?.participants) {
        let result = [] as any;
        Object.keys(data?.odds?.[226]?.participants).map(item => {
            let title = data?.odds?.[226]?.participants[item]?.name
            title = title.replace('1', data?.team_info?.home?.name)
            title = title.replace('X', 'Draw')
            title = title.replace('2', data?.team_info?.away?.name)
            title = title.replace('/', ' - ')
            const value = data?.odds?.[226]?.participants[item]?.value_eu
            const suspend = data?.odds?.[226]?.participants[item]?.suspend

            result.push({
                title: title,
                value: value,
                suspend: suspend
            })
            if (result.length === 3) {
                tosend.push(result)
                result = []
            }
        })
    }

    return tosend

}

export const resultBothTeamsToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data?.odds?.[50461]?.participants) {
        const spread = Object.entries(data?.odds?.[50461]?.participants)
        if (spread.length > 0) {
            let home = [{ title: data?.team_info?.home?.name, value: null, suspend: null }] as any;
            let away = [{ title: data?.team_info?.away?.name, value: null, suspend: null }] as any;
            let draw = [{ title: 'Draw', value: null, suspend: null }] as any;
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/Yes") {
                    home.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
                if (value.name === "Away/Yes") {
                    away.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
                if (value.name === "Draw/Yes") {
                    draw.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
            });
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/No") {
                    home.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
                if (value.name === "Away/No") {
                    away.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
                if (value.name === "Draw/No") {
                    draw.push({ title: '', value: value.value_eu, suspend: value.suspend })
                }
            });
            tosend = [
                home,
                away,
                draw
            ]

        }
    }
    return tosend;
}

export const bothTeamsToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data?.odds?.[10565]?.participants) {
        const spread = Object.entries(data?.odds?.[10565]?.participants)

        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const betResult = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[1777]?.participants) {
        const participantsObject = data?.odds?.[1777]?.participants;
        if (participantsObject) {
            const spread = Object.entries(participantsObject)
            if (spread.length > 0) {
                let existing = [{ title: 'Match', value: null, suspend: '0' }] as any;
                spread.forEach(([key, value]: [any, any]) => {
                    existing.push({ title: '', value: value.value_eu, suspend: value.suspend })
                });
                tosend.push(existing)
            }
        }
    }
    if (data?.odds) {
        let array = [] as any;
        Object.keys(data?.odds).map((item) => {
            if (data.odds[item].name.startsWith('1x2 - ') && data.odds[item].name.includes(' minutes')) {
                let minute = data.odds[item].name.replace('1x2 - ', '');
                minute = minute.replace(' minutes', '')
                minute = minute + ' Minute';
                const spread = Object.entries(data?.odds?.[item]?.participants)
                const arr = [{ title: minute, value: null, suspend: data.odds[item].suspend }] as any;
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = "0";
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                })
                array.push(arr)
            }
        })
        array.sort((a: any, b: any) => Number(a[0].title.substring(0, 2)) - Number(b[0].title.substring(0, 2)));
        tosend.push(...array)
    }

    return tosend;
}


export const betBothTeamsToScore = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[10565]?.participants) {
        const participantsObject = data?.odds?.[10565]?.participants;
        if (participantsObject) {
            const spread = Object.entries(participantsObject)
            if (spread.length > 0) {
                let existing = [{ title: 'Match', value: null, suspend: '0' }] as any;
                spread.forEach(([key, value]: [any, any]) => {
                    existing.push({ title: '', value: value.value_eu, suspend: value.suspend })
                });
                tosend.push(existing)
            }
        }
    }
    if (data?.odds?.[317]?.participants) {
        const participantsObject = data?.odds?.[317]?.participants;
        if (participantsObject) {
            const spread = Object.entries(participantsObject)
            if (spread.length > 0) {
                let existing = [{ title: '1st Half', value: null, suspend: '0' }] as any;
                spread.forEach(([key, value]: [any, any]) => {
                    existing.push({ title: '', value: value.value_eu, suspend: value.suspend })
                });
                tosend.push(existing)
            }
        }
    }
    if (data?.odds?.[318]?.participants) {
        const participantsObject = data?.odds?.[318]?.participants;
        if (participantsObject) {
            const spread = Object.entries(participantsObject)
            if (spread.length > 0) {
                let existing = [{ title: '2nd Half', value: null, suspend: '0' }] as any;
                spread.forEach(([key, value]: [any, any]) => {
                    existing.push({ title: '', value: value.value_eu, suspend: value.suspend })
                });
                tosend.push(existing)
            }
        }
    }

    return tosend;
}

export const betDoubleChance = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[10115]?.participants) {
        const spread = Object.entries(data?.odds?.[10115]?.participants)
        if (spread.length > 0) {

            spread.map((item: any, index: number) => {
                const arr = [] as any;
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home or Draw") {
                    title = `${data?.team_info?.home?.name} or Draw`
                }
                if (title === "Away or Draw") {
                    title = `${data?.team_info?.away?.name} or Draw`
                }
                if (title === "Home or Away") {
                    title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`
                }
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: '', suspend: suspend })
                arr.push({ title: '', value: value, suspend: suspend })
                tosend.push(arr)
            })

        }
    }
    return tosend;
}

export const betMatchGoals = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return oddData;
    }

    const participantsObject = { ...data?.odds?.[421]?.participants };

    if (participantsObject) {
        let array = [] as any;
        array = Object.values(participantsObject).reduce((acc: any, participant: any) => {
            const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

            if (existingIndex !== -1) {
                acc[existingIndex].push({
                    title: "",
                    value: participant.value_eu,
                    suspend: participant.suspend
                });
            } else {
                acc.push([
                    { title: participant.handicap, value: null, suspend: participant.suspend },
                    { title: "", value: participant.value_eu, suspend: participant.suspend }
                ]);
            }
            return acc;
        }, []);
        array.sort((a: any, b: any) => a[0].title - b[0].title);

        oddData["Match"] = array
    }
    const participantsObject1sthalf = { ...data?.odds?.[31]?.participants };

    if (participantsObject1sthalf) {
        let array = [] as any;
        array = Object.values(participantsObject1sthalf).reduce((acc: any, participant: any) => {
            const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

            if (existingIndex !== -1) {
                acc[existingIndex].push({
                    title: "",
                    value: participant.value_eu,
                    suspend: participant.suspend
                });
            } else {
                acc.push([
                    { title: participant.handicap, value: null, suspend: participant.suspend },
                    { title: "", value: participant.value_eu, suspend: participant.suspend }
                ]);
            }
            return acc;
        }, []);
        array.sort((a: any, b: any) => a[0].title - b[0].title);

        oddData["1st Half"] = array
    }

    if(oddData && oddData.subtabs){
        oddData.subtabs = oddData.subtabs.filter((item: string) => {
            if (oddData[item]?.length > 0) {
                return true
            } else {
                return false
            }
        })
    }
   

    return oddData
}

export const betNextGoal = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let tosend =[] as any;
    if (data) {
        Object.keys(data?.odds).map((item) => {
            if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes('goal?')) {
                const spread = Object.entries(data?.odds?.[item]?.participants)
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = '0';
                    title = item[1]?.name
                    if (title === "1") {
                        title = data?.team_info?.home?.name
                    }
                    if (title === "2") {
                        title = data?.team_info?.away?.name
                    }
                    if (title === "No goal") {
                        title = `Neither Team`
                    }
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    tosend.push([{ title: title, value: '', suspend: suspend },{ title: '', value: value, suspend: suspend }])
                })
            }
        })
    }
   

    return tosend
}


export const betTeamGoals = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return oddData;
    }

    const participantsObject = { ...data?.odds?.[1]?.participants };
    oddData.subtabs=[];
    if (participantsObject) {
        oddData.subtabs.push(data?.team_info?.home?.name)
        let array = [] as any;
        array = Object.values(participantsObject).reduce((acc: any, participant: any) => {
            const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

            if (existingIndex !== -1) {
                acc[existingIndex].push({
                    title: "",
                    value: participant.value_eu,
                    suspend: participant.suspend
                });
            } else {
                acc.push([
                    { title: participant.handicap, value: null, suspend: participant.suspend },
                    { title: "", value: participant.value_eu, suspend: participant.suspend }
                ]);
            }
            return acc;
        }, []);
        array.sort((a: any, b: any) => a[0].title - b[0].title);

        oddData[data?.team_info?.home?.name] = array
    }
    const participantsObject1sthalf = { ...data?.odds?.[2]?.participants };

    if (participantsObject1sthalf) {
        oddData.subtabs.push(data?.team_info?.away?.name)
        let array = [] as any;
        array = Object.values(participantsObject1sthalf).reduce((acc: any, participant: any) => {
            const existingIndex = acc.findIndex((arr: any) => arr[0].title === participant.handicap);

            if (existingIndex !== -1) {
                acc[existingIndex].push({
                    title: "",
                    value: participant.value_eu,
                    suspend: participant.suspend
                });
            } else {
                acc.push([
                    { title: participant.handicap, value: null, suspend: participant.suspend },
                    { title: "", value: participant.value_eu, suspend: participant.suspend }
                ]);
            }
            return acc;
        }, []);
        array.sort((a: any, b: any) => a[0].title - b[0].title);

        oddData[data?.team_info?.away?.name] = array
    }

    if(oddData && oddData.subtabs){
        oddData.subtabs = oddData.subtabs.filter((item: string) => {
            if (oddData[item]?.length > 0) {
                return true
            } else {
                return false
            }
        })
    }
   

    return oddData
}

export const betScore = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return oddData;
    }
    let tosend = [] as any;

    if (data?.odds?.[10001]?.participants) {
        oddData.subtabs= ["Full Time Score"]
        oddData["Full Time Score header"]= [data?.team_info?.home?.name, "Draw", data?.team_info?.away?.name];
        const result = [] as any;
        const left = [] as any;
        const middle = [] as any;
        const right = [] as any;
        Object.keys(data?.odds?.[10001]?.participants).map(item => {
            let checkingData = data?.odds?.[10001]?.participants[item]?.name.split('-');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (data?.odds?.[10001]?.participants[item]?.suspend === "0") {
                if (checkingData[0] > checkingData[1]) {
                    left.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                } else if (checkingData[0] === checkingData[1]) {
                    middle.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                } else {
                    right.push({
                        title: data?.odds?.[10001]?.participants[item]?.name,
                        value: data?.odds?.[10001]?.participants[item]?.value_eu,
                        suspend: data?.odds?.[10001]?.participants[item]?.suspend
                    })
                }
            }
        })
        console.log({ left: left, middle: middle, right: right })
        let maxlength = left.length;
        if (middle.length > maxlength) {
            maxlength = middle.length
        }
        if (right.length > maxlength) {
            maxlength = right.length
        }

        for (let i = 0; i < maxlength; i++) {
            let l = left[i] ? left[i] : { title: ' ', value: ' ', suspend: '0' }
            let m = middle[i] ? middle[i] : { title: ' ', value: ' ', suspend: '0' }
            let r = right[i] ? right[i] : { title: ' ', value: ' ', suspend: '0' }
            result.push([l, m, r])
        }
        oddData["Full Time Score"]=result
    }
    // console.log({ tosend })
    return oddData
}

export const betGoalOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[10562]?.participants) {
        const spread = Object.entries(data?.odds?.[10562]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                tosend.push([{ title: title, value: '', suspend: suspend }, { title: '', value: value, suspend: suspend }])
            })
        }
    }
    return tosend;
}

export const BetTeamToScorein2ndHalf = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[90307]?.participants) {
        const spread = Object.entries(data?.odds?.[90307]?.participants)
        if (spread.length > 0) {
            let arr=[{ title: data?.team_info?.home?.name, value: '', suspend: data?.odds?.[90307]?.suspend }]as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: '', value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[90308]?.participants) {
        const spread = Object.entries(data?.odds?.[90308]?.participants)
        if (spread.length > 0) {
            let arr=[{ title: data?.team_info?.away?.name, value: '', suspend: data?.odds?.[90308]?.suspend }]as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: '', value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const BetTeamToScoreinBothHalf = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    // if (data?.odds?.[90307]?.participants) {
    //     const spread = Object.entries(data?.odds?.[90307]?.participants)
    //     if (spread.length > 0) {
    //         let arr=[{ title: data?.team_info?.home?.name, value: '', suspend: data?.odds?.[90307]?.suspend }]as any;
    //         spread.map((item: any, index: number) => {
    //             let title = '';
    //             let value = '';
    //             let suspend = '0';
    //             title = item[1]?.name
    //             value = item[1]?.value_eu
    //             suspend = item[1]?.suspend
    //             arr.push({ title: '', value: value, suspend: suspend })
    //         })
    //         tosend.push(arr)
    //     }
    // }
    if (data?.odds?.[90311]?.participants) {
        const spread = Object.entries(data?.odds?.[90311]?.participants)
        if (spread.length > 0) {
            let arr=[{ title: data?.team_info?.away?.name, value: '', suspend: data?.odds?.[90311]?.suspend }]as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: '', value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const betMatchCorners = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data?.odds?.[16]?.participants) {
        const spread = Object.entries(data?.odds?.[16]?.participants)
        if (spread.length > 0) {
            let existing = [] as any;
            spread.forEach(([key, value]: [any, any]) => {
                if (existing.length == 0) {
                    existing.push({ title: `${value.handicap} Corners`, value: '', suspend: value.suspend });
                }
                existing.push({ title: '', value: value.value_eu, suspend: value.suspend });
                if (existing.length == 4) {
                    tosend.push(existing);
                    existing = []
                }
            });
        }
    }
    tosend.sort((a: any, b: any) => a[0].title - b[0].title);
    oddData["Match"] = tosend
    if(oddData && oddData.subtabs){
        oddData.subtabs = oddData.subtabs.filter((item: string) => {
            if (oddData[item]?.length > 0) {
                return true
            } else {
                return false
            }
        })
    }
    return oddData
}

export const whenWillGameEnd = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[5100008]?.participants) {
        const spread = Object.entries(data?.odds?.[5100008]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const willMatchGoOvertime = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[9200069]?.participants) {
        const spread = Object.entries(data?.odds?.[9200069]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const exactGoals = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    if (data?.odds?.[9312461]?.participants) {
        let result = [] as any;
        Object.keys(data?.odds?.[9312461]?.participants).map(item => {
            let title = data?.odds?.[9312461]?.participants[item]?.name
            const value = data?.odds?.[9312461]?.participants[item]?.value_eu
            const suspend = data?.odds?.[9312461]?.participants[item]?.suspend

            result.push({
                title: title,
                value: value,
                suspend: suspend
            })
            if (result.length === 3) {
                tosend.push(result)
                result = []
            }
        })
        if(result.length > 0) {
            while(result.length < 3)
                result.push({ title: '', value: '', suspend: '0'})
            tosend.push(result);
        }
    }

    return tosend

}


export const homeExactGoals = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    if (data?.odds?.[9312462]?.participants) {
        let result = [] as any;
        Object.keys(data?.odds?.[9312462]?.participants).map(item => {
            let title = data?.odds?.[9312462]?.participants[item]?.name
            const value = data?.odds?.[9312462]?.participants[item]?.value_eu
            const suspend = data?.odds?.[9312462]?.participants[item]?.suspend

            result.push({
                title: title,
                value: value,
                suspend: suspend
            })
            if (result.length === 3) {
                tosend.push(result)
                result = []
            }
        })
        if(result.length > 0) {
            while(result.length < 3)
                result.push({ title: '', value: '', suspend: '0'})
            tosend.push(result);
        }
    }

    return {marketname: `${data?.team_info?.home?.name} Exact Goals`, rows: tosend}

}



export const awayExactGoals = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    if (data?.odds?.[9312463]?.participants) {
        let result = [] as any;
        Object.keys(data?.odds?.[9312463]?.participants).map(item => {
            let title = data?.odds?.[9312463]?.participants[item]?.name
            const value = data?.odds?.[9312463]?.participants[item]?.value_eu
            const suspend = data?.odds?.[9312463]?.participants[item]?.suspend

            result.push({
                title: title,
                value: value,
                suspend: suspend
            })
            if (result.length === 3) {
                tosend.push(result)
                result = []
            }
        })
        if(result.length > 0) {
            while(result.length < 3)
                result.push({ title: '', value: '', suspend: '0'})
            tosend.push(result);
        }
    }

    return {marketname: `${data?.team_info?.away?.name} Exact Goals`, rows: tosend}

}

export const homeTotalGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[431]?.participants) {
        const spread = Object.entries(data?.odds?.[431]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if(arr.length < 3 && (title == "Over" || title == "Under")) {
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                }
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return {marketname: `${data?.team_info?.home?.name} Total Goals`, rows: tosend}
}


export const awayTotalGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[432]?.participants) {
        const spread = Object.entries(data?.odds?.[432]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if(arr.length < 3 && (title == "Over" || title == "Under")) {
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                }
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return {marketname: `${data?.team_info?.away?.name} Total Goals`, rows: tosend}
}


export const period2TeamTotals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [] as any;
    const rows = [] as any;
    if(data?.odds?.[437]?.participants) {
        const ou = Object.entries(data?.odds?.[437]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = item[1].suspend;
                title = item[1]?.name
                total.push({ title: `${title} ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
            })
        }
    }
    if(data?.odds?.[438]?.participants) {
        const ou = Object.entries(data?.odds?.[438]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = item[1].suspend;
                title = item[1]?.name
                total.push({ title: `${title} ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend});
            })
        }
    }
    if(total.length > 0)
        rows.push(total);


    // console.log('Sending New Data', data)

    return {header, rows: rows};
}

export const period3TeamTotals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [] as any;
    const rows = [] as any;
    if(data?.odds?.[439]?.participants) {
        const ou = Object.entries(data?.odds?.[439]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = item[1].suspend;
                title = item[1]?.name
                total.push({ title: `${title} ${item[1].value_eu}`, value: ` ${Number(item[1].handicap) > 0 ? '+' : ''}${item[1].handicap}`, suspend});
            })
        }
    }
    if(data?.odds?.[440]?.participants) {
        const ou = Object.entries(data?.odds?.[440]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = item[1].suspend;
                title = item[1]?.name
                total.push({ title: `${title} ${item[1].value_eu}`, value: ` ${Number(item[1].handicap) > 0 ? '+' : ''}${item[1].handicap}`, suspend});
            })
        }
    }
    if(total.length > 0)
        rows.push(total);


    // console.log('Sending New Data', data)

    return {header, rows: rows};
}

export const teamToWinTheMostPeriods = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[5100009]?.participants) {
        const spread = Object.entries(data?.odds?.[5100009]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name == 1 ? data?.team_info?.home?.name : (item[1]?.name == 2 ? data?.team_info?.away?.name : "Tie");
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const highestScoringPeriod = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[483]?.participants) {
        const spread = Object.entries(data?.odds?.[483]?.participants)
        if (spread.length > 0) {
            let arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name == 'X' ? "Tie" : item[1].name;
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
                if(arr.length == 3) {
                    tosend.push(arr);
                    arr = [] as any;
                }
            })
            if(arr.length > 0)
                tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const winningMargin = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const sends = [] as any;
    if (data?.odds?.[9312465]?.participants && data?.odds?.[9312466]?.participants) {
        const homeMargin = Object.entries(data?.odds?.[9312465]?.participants)
        const awayMargin = Object.entries(data?.odds?.[9312466]?.participants)
        for(let i = 0; i < homeMargin.length; ++ i) {
            const homeData: any = homeMargin[i];
            const awayData: any = awayMargin[i];
            let title = homeData[1]?.name;
            const rowData = [{title: title, value: '', suspend: '0'},
            {title: '', value: `${homeData[1].value_eu > 0 ? '+' : ''}${homeData[1].value_eu}`, suspend: homeData[1].suspend},
            {title: '', value: `${awayData[1].value_eu > 0 ? '+' : ''}${awayData[1].value_eu}`, suspend: awayData[1].suspend}];
            sends.push(rowData);
        }
    }

    return {header, rows: sends};
}


export const homeTeamToScoreInBothHalves = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[9312487]?.participants) {
        const spread = Object.entries(data?.odds?.[9312487]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}

export const awayTeamToScoreInBothHalves = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[9312491]?.participants) {
        const spread = Object.entries(data?.odds?.[9312491]?.participants)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    // console.log('Sending New Data', data)
    return tosend;
}