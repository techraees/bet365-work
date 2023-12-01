'use client';
import React from "react";

//Map1FirstHalfWinnerIncTie
export const Map1FirstHalfWinnerIncTie = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[10000000000]?.participants) {
        const items = Object.entries(data?.odds?.[10000000000]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 3 && title == "Home") {
                    row.push({ title: data?.team_info?.home?.name, value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length < 3 && title == "Tie") {
                    row.push({ title: "Tie", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length < 3 && title == "Away") {
                    row.push({ title: data?.team_info?.away?.name, value: item[1].value_eu, suspend: item[1].suspend });
                }
            })
            rows.push(row);
        }
    }

    return rows;
}
//Map1FirstHalfWinnerMapWinner
export const Map1FirstHalfWinnerMapWinner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row1 = [] as any;
    let row2 = [] as any;
    let row3 = [] as any;
    if (data?.odds?.[951016311111]?.participants) {
        const items = Object.entries(data?.odds?.[951016311111]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row1.length == 0 && title == "1/1") {
                    row1.push({ title: `${data?.team_info?.home?.name} - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row1.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row1.length == 2 && title == "2/1") {
                    row1.push({ title: `${data?.team_info?.away?.name} - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row1.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row2.length == 0 && title == "1/2") {
                    row2.push({ title: `${data?.team_info?.home?.name} - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row2.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row2.length == 2 && title == "X/1") {
                    row2.push({ title: `Tie - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row2.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row3.length == 0 && title == "2/2") {
                    row3.push({ title: `${data?.team_info?.away?.name} - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row3.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row3.length == 2 && title == "X/2") {
                    row3.push({ title: `Tie - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row3.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
            })
            rows.push(row1);
            rows.push(row2);
            rows.push(row3);
        }
    }

    return rows;
}
//map1AltRoundsHandicap
export const map1AltRoundsHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[1659]?.participants) {
        const items = Object.entries(data?.odds?.[1659]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 2 && item[1].is_main == "0") {
                    row.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }

    return rows;
}
//map1MapWinnerTotalRounds
export const map1MapWinnerTotalRounds = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9510148]?.participants && data?.odds?.[9510149]?.participants) {
        const items = Object.entries(data?.odds?.[9510148]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 2 && title == "Over") {
                    row.push({ title: `Over${item[1].handicap}`, value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length < 2 && title == "Under") {
                    row.push({ title: `Under${item[1].handicap}`, value: item[1].value_eu, suspend: item[1].suspend });
                }
            })
        }
        const items2 = Object.entries(data?.odds?.[9510149]?.participants)
        if (items2.length > 0) {
            items2.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length > 1 && title == "Over") {
                    row.push({ title: `Over${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
                if (row.length > 1 && title == "Under") {
                    row.push({ title: `Under${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
            })
        }
        rows.push(row);
    }


    return rows;
}
//map2ToGoToOverTime
export const map1ToGoToOverTime = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9209562]?.participants) {
        const items = Object.entries(data?.odds?.[9209562]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0 && title == "Yes") {
                    row.push({ title: 'Yes', value: null, suspend });
                }
                if (row.length == 0 && title == "No") {
                    row.push({ title: 'No', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }


    return rows;
}
//map1TotalRoundsOddEven
export const map1TotalRoundsOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9290513]?.participants) {
        const items = Object.entries(data?.odds?.[9290513]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0 && title == "Odd") {
                    row.push({ title: 'Odd', value: null, suspend });
                }
                if (row.length == 0 && title == "Even") {
                    row.push({ title: 'Even', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }


    return rows;
}

//Map2FirstHalfWinnerIncTie
export const Map2FirstHalfWinnerIncTie = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[10000000000]?.participants) {
        const items = Object.entries(data?.odds?.[10000000000]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 3 && title == "Home") {
                    row.push({ title: data?.team_info?.home?.name, value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length < 3 && title == "Tie") {
                    row.push({ title: "Tie", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length < 3 && title == "Away") {
                    row.push({ title: data?.team_info?.away?.name, value: item[1].value_eu, suspend: item[1].suspend });
                }
            })
            rows.push(row);
        }
    }

    return rows;
}
//Map2FirstHalfWinnerMapWinner
export const Map2FirstHalfWinnerMapWinner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row1 = [] as any;
    let row2 = [] as any;
    let row3 = [] as any;
    if (data?.odds?.[9510163]?.participants) {
        const items = Object.entries(data?.odds?.[9510163]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row1.length == 0 && title == "1/1") {
                    row1.push({ title: `${data?.team_info?.home?.name} - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row1.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row1.length == 2 && title == "2/1") {
                    row1.push({ title: `${data?.team_info?.away?.name} - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row1.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row2.length == 0 && title == "1/2") {
                    row2.push({ title: `${data?.team_info?.home?.name} - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row2.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row2.length == 2 && title == "X/1") {
                    row2.push({ title: `Tie - ${data?.team_info?.home?.name}`, value: null, suspend: item[1].suspend });
                    row2.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row3.length == 0 && title == "2/2") {
                    row3.push({ title: `${data?.team_info?.away?.name} - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row3.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row3.length == 2 && title == "X/2") {
                    row3.push({ title: `Tie - ${data?.team_info?.away?.name}`, value: null, suspend: item[1].suspend });
                    row3.push({ title: "", value: item[1].value_eu, suspend: item[1].suspend });
                }
            })
            rows.push(row1);
            rows.push(row2);
            rows.push(row3);
        }
    }

    return rows;
}
//map2AltRoundsHandicap
export const map2AltRoundsHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[1660]?.participants) {
        const items = Object.entries(data?.odds?.[1660]?.participants)
        if (items.length > 2) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 2 && item[1].is_main == "0") {
                    row.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }


    return rows;
}
//map2MapWinnerTotalRounds
export const map2MapWinnerTotalRounds = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9510158]?.participants && data?.odds?.[9510159]?.participants) {
        const items = Object.entries(data?.odds?.[9510158]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length < 2 && title == "Over") {
                    row.push({ title: `Over${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
                if (row.length < 2 && title == "Under") {
                    row.push({ title: `Under${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
            })
        }
        const items2 = Object.entries(data?.odds?.[9510159]?.participants)
        if (items2.length > 0) {
            items2.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length > 1 && title == "Over") {
                    row.push({ title: `Over${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
                if (row.length > 1 && title == "Under") {
                    row.push({ title: `Under${item[1].handicap}`, value: item[1].value_eu, suspend });
                }
            })
        }
        rows.push(row);
    }


    return rows;
}
//map2ToGoToOverTime
export const map2ToGoToOverTime = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9209563]?.participants) {
        const items = Object.entries(data?.odds?.[9209563]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0 && title == "Yes") {
                    row.push({ title: 'Yes', value: null, suspend });
                }
                if (row.length == 0 && title == "No") {
                    row.push({ title: 'No', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }


    return rows;
}
//map2TotalRoundsOddEven
export const map2TotalRoundsOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let rows = [] as any;

    let row = [] as any;
    if (data?.odds?.[9290514]?.participants) {
        const items = Object.entries(data?.odds?.[9290514]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0 && title == "Odd") {
                    row.push({ title: 'Odd', value: null, suspend });
                }
                if (row.length == 0 && title == "Even") {
                    row.push({ title: 'Even', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row.length == 2) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }


    return rows;
}

//game lines
export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const toWin = [{ title: 'To Win', value: null, suspend: 0 }] as any;
    const line = [{ title: 'Rounds Line', value: null, suspend: 0 }] as any;
    const total = [{ title: 'Total Rounds', value: null, suspend: 0 }] as any;
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
                if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
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
//map1 lines
export const map1Lines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const toWin = [{ title: 'To Win', value: null, suspend: 0 }] as any;
    const line = [{ title: 'Rounds Line', value: null, suspend: 0 }] as any;
    const total = [{ title: 'Total Rounds', value: null, suspend: 0 }] as any;
    if (data?.odds?.[1182894]?.participants) {
        const towins = Object.entries(data?.odds?.[1182894]?.participants)
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

    if (data?.odds?.[1667]?.participants) {
        const ou = Object.entries(data?.odds?.[1667]?.participants)
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

    if (data?.odds?.[1659]?.participants) {
        const lines = Object.entries(data?.odds?.[1659]?.participants)
        if (lines.length > 0) {
            lines.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
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
//map2 lines
export const map2Lines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const toWin = [{ title: 'To Win', value: null, suspend: 0 }] as any;
    const line = [{ title: 'Rounds Line', value: null, suspend: 0 }] as any;
    const total = [{ title: 'Total Rounds', value: null, suspend: 0 }] as any;
    if (data?.odds?.[1182895]?.participants) {
        const towins = Object.entries(data?.odds?.[1182895]?.participants)
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

    if (data?.odds?.[1668]?.participants) {
        const ou = Object.entries(data?.odds?.[1668]?.participants)
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

    if (data?.odds?.[1660]?.participants) {
        const lines = Object.entries(data?.odds?.[1660]?.participants)
        if (lines.length > 0) {
            lines.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend });
                }
                if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
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
    let rows = [] as any;

    let row1 = [{ title: data?.team_info?.home?.name, value: '', suspend: "0" }] as any;
    let row2 = [{ title: data?.team_info?.away?.name, value: '', suspend: "0" }] as any;
    if (data?.odds?.[11808]?.participants) {
        const items = Object.entries(data?.odds?.[11808]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row1.length == 1 && title == "1/Yes") {
                    row1.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row2.length == 1 && title == "2/Yes") {
                    row2.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row1.length == 2 && title == "1/No") {
                    row1.push({ title: '', value: item[1].value_eu, suspend });
                }
                if (row2.length == 2 && title == "2/No") {
                    row2.push({ title: '', value: item[1].value_eu, suspend });
                }
            })
        }

        rows.push(row1);
        rows.push(row2);
    }

    return rows;
}
