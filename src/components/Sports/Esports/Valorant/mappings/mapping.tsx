'use client';
import React from "react";

//map2TotalRoundsOddEven
export const map2TotalRoundsOddEven = (data: any) => {
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
                if (row.length == 0 && title=="Odd") {
                    row.push({ title: 'Odd', value: null, suspend });
                }
                if (row.length == 0 && title=="Even") {
                    row.push({ title: 'Even', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item.value_eu, suspend });
                }
                if (row.length == 2){
                    rows.push(row);
                    row = [];
                }
            })
        }
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
                if (row.length == 0 && title=="Yes") {
                    row.push({ title: 'Yes', value: null, suspend });
                }
                if (row.length == 0 && title=="No") {
                    row.push({ title: 'No', value: null, suspend });
                }
                if (row.length == 1) {
                    row.push({ title: '', value: item.value_eu, suspend });
                }
                if (row.length == 2){
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

