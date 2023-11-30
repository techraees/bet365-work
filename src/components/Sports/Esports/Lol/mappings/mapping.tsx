'use client';
import React from "react";

//game lines
export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const total = [{ title: 'Total Maps', value: null, suspend: 0 }] as any;
    const toWin = [{ title: 'To Win', value: null, suspend: 0 }] as any;
    const line = [{ title: 'Line', value: null, suspend: 0 }] as any;
    if (data?.odds?.[410]?.participants) {
        const towins = Object.entries(data?.odds?.[410]?.participants)
        if (towins.length > 0) {
            towins.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (toWin.length < 3 && (title === "Home" || title == "Away")) {
                    toWin.push({ title: ``, value: item[1].value_eu, suspend });
                }
            })
        }
    }

    if (data?.odds?.[444]?.participants) {
        const ou = Object.entries(data?.odds?.[444]?.participants)
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (total.length < 3 && title === "Over") {
                    total.push({ title: `O ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend });
                }
                if (total.length < 3 && title === "Under") {
                    total.push({ title: `U ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend });
                }
            })
        }
    }

    if (data?.odds?.[443]?.participants) {
        const lines = Object.entries(data?.odds?.[443]?.participants)
        if (lines.length > 0) {
            lines.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (line.length < 3 && title === "Home") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (line.length < 3 && title === "Away") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
            })
        }
    }

    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (toWin.length > 1)
        rows.push(toWin);
    if (line.length > 1)
        rows.push(line);
    if (total.length > 1)
        rows.push(total);

    return { header, rows: rows };
}
//map 1 winner
export const map1Winner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1179]?.participants) {
        const items: any = Object.entries(data?.odds?.[1179]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Home") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return rows;
}

//map 1 Kill Handicap
export const map1KillHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[9510035]?.participants) {
        const items: any = Object.entries(data?.odds?.[9510035]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            console.log("+++++++++", item);
            title = item?.name;
            if (row.length < 2 && title === "Home") {
                row.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 2 && title === "Away") {
                row.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return { header, rows: rows };;
}

//map 1 Totals
export const map1Totals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const header = ['', 'Over', 'Under'];
    let rows = [] as any;
    let kills = [{ title: 'Kills', value: null, suspend: 0 }] as any;
    if (data?.odds?.[9510015]?.participants) {
        const items: any = Object.entries(data?.odds?.[9510015]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (kills.length < 3 && title === "Over") {
                kills.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
            if (kills.length < 3 && title === "Under") {
                kills.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(kills);
    }
    return { header, rows: rows };;
}

//map 1 TotalKills odd/even
export const map1TotalKills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[9291513]?.participants) {
        const items: any = Object.entries(data?.odds?.[9291513]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Odd") {
                row.push({ title: 'Odd', value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Even") {
                row.push({ title: 'Even', value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return rows;
}


// map 2 winner
export const map2Winner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1180]?.participants) {
        const items: any = Object.entries(data?.odds?.[1180]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Home") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return rows;
}

//map 2 Kill Handicap
export const map2KillHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[9510036]?.participants) {
        const items: any = Object.entries(data?.odds?.[9510036]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 2 && title === "Home") {
                row.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 2 && title === "Away") {
                row.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return { header, rows: rows };;
}

//map 2 Totals
export const map2Totals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const header = ['', 'Over', 'Under'];
    let rows = [] as any;
    let kills = [{ title: 'Kills', value: null, suspend: 0 }] as any;
    if (data?.odds?.[9510016]?.participants) {
        const items: any = Object.entries(data?.odds?.[9510016]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (kills.length < 3 && title === "Over") {
                kills.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
            if (kills.length < 3 && title === "Under") {
                kills.push({ title: item.handicap, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(kills);
    }
    return { header, rows: rows };;
}

//map 2 TotalKills odd/even
export const map2TotalKills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[9291514]?.participants) {
        const items: any = Object.entries(data?.odds?.[9291514]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Odd") {
                row.push({ title: 'Odd', value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Even") {
                row.push({ title: 'Even', value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return rows;
}


//correctMapScore
export const correctMapScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const twoZero = [{ title: '2-0', value: null, suspend: 0 }] as any;
    const twoOne = [{ title: '2-1', value: null, suspend: 0 }] as any;
    if (data?.odds?.[11810]?.participants) {
        const twoZeros = Object.entries(data?.odds?.[11810]?.participants)
        if (twoZeros.length > 0) {
            twoZeros.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (twoZero.length < 3 && title === "2-0") {
                    twoZero.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (twoZero.length < 3 && title === "0-2") {
                    twoZero.push({ title: '', value: item[1].value_eu, suspend });
                }
            })
        }
    }

    if (data?.odds?.[11810]?.participants) {
        const ou = Object.entries(data?.odds?.[11810]?.participants);
        if (ou.length > 0) {
            ou.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (twoOne.length < 3 && title === "2-1") {
                    twoOne.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (twoOne.length < 3 && title === "1-2") {
                    twoOne.push({ title: '', value: item[1].value_eu, suspend });
                }
            })
        }
    }



    let rows = [] as any;
    if (twoZero.length > 1)
        rows.push(twoZero);
    if (twoOne.length > 1)
        rows.push(twoOne);

    return { header, rows: rows };
}
//toWinAtLeastOneMap
export const toWinAtLeastOneMap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const header = ['', 'Yes', 'No'];
    const home = [{ title: data?.team_info?.home?.name, value: null, suspend: 0 }] as any;
    const away = [{ title: data?.team_info?.away?.name, value: null, suspend: 0 }] as any;
    if (data?.odds?.[100101001]?.participants) {
        const items = Object.entries(data?.odds?.[100101001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (home.length < 3 && (title === "Home" || title == "Away")) {
                    home.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
            })
        }
    }
    if (data?.odds?.[100101001]?.participants) {
        const items = Object.entries(data?.odds?.[100101001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (away.length < 3 && (title === "Home" || title == "Away")) {
                    away.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
            })
        }
    }


    let rows = [] as any;
    if (home.length > 1)
        rows.push(home);
    if (away.length > 1)
        rows.push(away);

    return { header, rows: rows };
}


