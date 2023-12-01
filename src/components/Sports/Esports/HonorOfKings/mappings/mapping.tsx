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
                    toWin.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend });
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
                    total.push({ title: `O ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend:item[1].suspend });
                }
                if (total.length < 3 && title === "Under") {
                    total.push({ title: `U ${item[1].handicap}`, value: ` ${Number(item[1].value_eu) > 0 ? '+' : ''}${item[1].value_eu}`, suspend:item[1].suspend });
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
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend:item[1].suspend });
                }
                if (line.length < 3 && title === "Away") {
                    line.push({ title: item[1].handicap, value: item[1].value_eu, suspend:item[1].suspend });
                }
            })
        }
    }

    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (toWin.length > 1)
        rows.push(toWin);
    if (total.length > 1)
        rows.push(total);
    if (line.length > 1)
        rows.push(line);

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
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map1 kills
export const map1Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend });
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}

//map 2 winner
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
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map2 kills
export const map2Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend });
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend });
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}

//map 3 winner
export const map3Winner = (data: any) => {
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
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map3 kills
export const map3Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend });
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}

//map 4 winner
export const map4Winner = (data: any) => {
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
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map4 kills
export const map4Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}

//map 5 winner
export const map5Winner = (data: any) => {
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
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map5 kills
export const map5Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}

//map 6 winner
export const map6Winner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1182295]?.participants) {
        const items: any = Object.entries(data?.odds?.[1182295]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map6 kills
export const map6Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }
    if (data?.odds?.[1182595]?.participants) {
        const items = Object.entries(data?.odds?.[1182595]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}
//map6 towers
export const map6Towers = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const firstTower = [{ title: 'First Tower', value: null, suspend: 0 }] as any;
    if (data?.odds?.[9591565]?.participants) {
        const items = Object.entries(data?.odds?.[9591565]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstTower.length < 3) {
                    firstTower.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (firstTower.length > 1)
        rows.push(firstTower);
    return { header, rows: rows };
}
//map6FirstTyrant
export const map6FirstTyrant = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1182595]?.participants) {
        const items: any = Object.entries(data?.odds?.[1182595]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "1") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "2") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        rows.push(row);
    }
    return rows;
}

//map 7 winner
export const map7Winner = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1182295]?.participants) {
        const items: any = Object.entries(data?.odds?.[1182295]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "Home" && item.suspend == "0") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "Away" && item.suspend == "0") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
            }
        });
        if (row.length > 1) {
            rows.push(row);
        }
    }
    return rows;
}
//map7 kills
export const map7Kills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const killHandicap = [{ title: 'Kill Handicap', value: null, suspend: 0 }] as any;
    const firstBlood = [{ title: 'First Blood', value: null, suspend: 0 }] as any;
    if (data?.odds?.[101001001]?.participants) {
        const items = Object.entries(data?.odds?.[101001001]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (killHandicap.length < 3) {
                    killHandicap.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }
    if (data?.odds?.[1182695]?.participants) {
        const items = Object.entries(data?.odds?.[1182695]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstBlood.length < 3) {
                    firstBlood.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (killHandicap.length > 1)
        rows.push(killHandicap);
    if (firstBlood.length > 1)
        rows.push(firstBlood);

    return { header, rows: rows };
}
//map7 RaceToKills
export const map7RaceToKills = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[9591584]?.participants) {
        const items = Object.entries(data?.odds?.[9591584]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0) {
                    row.push({ title: item[1].handicap, value: '', suspend })
                }
                if (row.length < 3) {
                    row.push({ title: ``, value: item[1].value_eu, suspend: item[1].suspend });
                }
                if (row.length == 3) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }

    return rows;
}
//map7 towers
export const map7Towers = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    // title = data?.team_info?.home?.name
    const header = ['', data?.team_info?.home?.name, data?.team_info?.away?.name];
    const firstTower = [{ title: 'First Tower', value: null, suspend: 0 }] as any;
    if (data?.odds?.[9591565]?.participants) {
        const items = Object.entries(data?.odds?.[9591565]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (firstTower.length < 3) {
                    firstTower.push({ title: ``, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    // console.log('Sending New Data', data)
    let rows = [] as any;
    if (firstTower.length > 1)
        rows.push(firstTower);
    return { header, rows: rows };
}
//map7FirstTyrant
export const map7FirstTyrant = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let rows = [] as any;
    let row = [] as any;
    if (data?.odds?.[1182595]?.participants) {
        const items: any = Object.entries(data?.odds?.[1182595]?.participants);
        items.map((itm: any) => {
            let title = '';
            const item = itm[1];
            title = item?.name;
            if (row.length < 3 && title === "1") {
                row.push({ title: data?.team_info?.home?.name, value: item.value_eu, suspend: item.suspend });
            }
            if (row.length < 3 && title === "2") {
                row.push({ title: data?.team_info?.away?.name, value: item.value_eu, suspend: item.suspend });
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
    let rows = [] as any;
    let row = [] as any;

    if (data?.odds?.[11810]?.participants) {
        const items = Object.entries(data?.odds?.[11810]?.participants)
        if (items.length > 0) {
            items.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (row.length == 0) {
                    row.push({ title: title, value: null, suspend: "0" })
                }
                if (row.length < 3 && items.length > 0) {
                    row.push({ title: '', value: item[1].value_eu, suspend:item[1].suspend});
                }
                if (row.length == 3) {
                    rows.push(row);
                    row = [];
                }
            })
        }
    }
    return rows;
}
//matchEitherTeamsToScore
export const matchEitherTeamsToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const header = ['', 'Yes', 'No'];
    const ultraKill = [{ title: 'Ultra Kill', value: null, suspend: 0 }] as any;
    const rampage = [{ title: 'Rampage', value: null, suspend: 0 }] as any;
    if (data?.odds?.[100101001]?.participants) {
        const ultraKills = Object.entries(data?.odds?.[100101001]?.participants)
        if (ultraKills.length > 0) {
            ultraKills.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (ultraKill.length < 3 && (title === "Home" || title == "Away")) {
                    ultraKill.push({ title: item[1].handicap, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }
    if (data?.odds?.[100101001]?.participants) {
        const rampages = Object.entries(data?.odds?.[100101001]?.participants)
        if (rampages.length > 0) {
            rampages.map((item: any, index: number) => {
                let title = '';
                let suspend = '0';
                title = item[1]?.name
                if (rampage.length < 3 && (title === "Home" || title == "Away")) {
                    rampage.push({ title: item[1].handicap, value: item[1].value_eu, suspend:item[1].suspend});
                }
            })
        }
    }


    let rows = [] as any;
    if (ultraKill.length > 1)
        rows.push(ultraKill);
    if (rampage.length > 1)
        rows.push(rampage);

    return { header, rows: rows };
}


