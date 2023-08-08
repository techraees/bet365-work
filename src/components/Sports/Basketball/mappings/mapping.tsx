'use client';
import React from "react";

export const gameLines = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [];
    if (data?.odds?.[1446]?.participants) {
        const spread = Object.entries(data?.odds?.[1446]?.participants)
        if (spread.length > 0) {
            const arr = [{ title: "Spread", value: '', suspend: data.odds?.[1446]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[1450]?.participants) {
        const gltotal = Object.entries(data?.odds?.[1450]?.participants)
        if (gltotal.length > 0) {
            const arr = [{ title: "Total", value: '', suspend: data.odds?.[1450]?.suspend }]

            gltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (item[1]?.name === "Over") {
                    arr.push({ title: `O ${title}`, value: value, suspend: suspend })
                } else {
                    arr.push({ title: `U ${title}`, value: value, suspend: suspend })
                }

            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180032]?.participants) {
        const mltotal = Object.entries(data?.odds?.[180032]?.participants)
        if (mltotal.length > 0) {
            const arr = [{ title: "Money Line", value: '', suspend: data.odds?.[180032]?.suspend }]
            mltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    console.log('Sending New Data')
    return tosend;
}


export const pointBetting = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    // [{handicap, home, away}]
    const tosend = [] as any;
    if (data?.odds?.[180654]?.participants) {
        const bet = Object.entries(data?.odds?.[180654]?.participants)
        console.log('Sending New Data PointBetting', { bet })
        if (bet.length > 0) {
            bet.forEach(([key, value]: [any, any]) => {
                const existingRow = tosend.find((row: any) => row[0].title === value.handicap);
                if (existingRow) {
                    existingRow.push({ title: "", value: value.value_eu, suspend: value.suspend });
                } else {
                    tosend.push([
                        { title: value.handicap, value: null, suspend: value.suspend },
                        { title: "", value: value.value_eu, suspend: value.suspend }
                    ]);
                }
            });
            tosend.sort((a: any, b: any) => a[0].title - b[0].title);
        }
    }
    console.log('Sending New Data PointBetting')
    return tosend;
}

export const currentPoints = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    let total = ""
    if (data?.team_info?.home?.score && data?.team_info?.away?.score) {
        const homepoint = data?.team_info?.home?.score
        const awaypoint = data?.team_info?.away?.score
        total = (Number(homepoint) + Number(awaypoint)).toString()
    }
    return total;
}

export const quarterLines2Way =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[180079]?.participants) {
        const spread = Object.entries(data?.odds?.[180079]?.participants)
        if (spread.length > 0) {
            const arr = [{ title: "Spread", value: '', suspend: data.odds?.[180079]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180080]?.participants) {
        const gltotal = Object.entries(data?.odds?.[180080]?.participants)
        if (gltotal.length > 0) {
            const arr = [{ title: "Total", value: '', suspend: data.odds?.[180080]?.suspend }]

            gltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (item[1]?.name === "Over") {
                    arr.push({ title: `O ${title}`, value: value, suspend: suspend })
                } else {
                    arr.push({ title: `U ${title}`, value: value, suspend: suspend })
                }

            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180077]?.participants) {
        const mltotal = Object.entries(data?.odds?.[180077]?.participants)
        if (mltotal.length > 0) {
            const arr = [{ title: "Money Line", value: '', suspend: data.odds?.[180077]?.suspend }]
            mltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const oddEven =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[113]?.participants) {
        const oddeven1 = Object.entries(data?.odds?.[113]?.participants)
        if (oddeven1.length > 0) {
            const arr = [{ title: "Match", value: '', suspend: data.odds?.[113]?.suspend }]
            oddeven1.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[449]?.participants) {
        const oddeven2 = Object.entries(data?.odds?.[449]?.participants)
        if (oddeven2.length > 0) {
            const arr = [{ title: "1st Half", value: '', suspend: data.odds?.[449]?.suspend }]
            oddeven2.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}


export const half =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [];
    if (data?.odds?.[180061]?.participants) {
        const spread = Object.entries(data?.odds?.[180061]?.participants)
        if (spread.length > 0) {
            const arr = [{ title: "Spread", value: '', suspend: data.odds?.[180061]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180062]?.participants) {
        const gltotal = Object.entries(data?.odds?.[180062]?.participants)
        if (gltotal.length > 0) {
            const arr = [{ title: "Total", value: '', suspend: data.odds?.[180062]?.suspend }]

            gltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (item[1]?.name === "Over") {
                    arr.push({ title: `O ${title}`, value: value, suspend: suspend })
                } else {
                    arr.push({ title: `U ${title}`, value: value, suspend: suspend })
                }

            })
            tosend.push(arr)
        }
    }
    if (data?.odds?.[180060]?.participants) {
        const mltotal = Object.entries(data?.odds?.[180060]?.participants)
        if (mltotal.length > 0) {
            const arr = [{ title: "Money Line", value: '', suspend: data.odds?.[180060]?.suspend }]
            mltotal.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}


export const resultTotalGoals =(data: any)=>{
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    if (data?.odds?.[5300563]?.participants) {
        const spread = Object.entries(data?.odds?.[5300563]?.participants)
        if (spread.length > 0) {
            const arr1 = [{ title: "Home", value: '', suspend: data.odds?.[5300563]?.suspend }]
            const arr2 = [{ title: "Away", value: '', suspend: data.odds?.[5300563]?.suspend }]
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if(item[1]?.name === "Home/o" || item[1]?.name === "Home/u" ){
                    arr1.push({ title: title, value: value, suspend: suspend })
                }
                if(item[1]?.name === "Away/o" || item[1]?.name === "Away/u" ){
                    arr2.push({ title: title, value: value, suspend: suspend })
                }
            })
            tosend.push(arr1)
            tosend.push(arr2)
        }
    }
    
    return tosend;
}

