'use client';
import React from "react";

export const fulltimeResult = (data: any) => {
    console.log({ data })
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '1');
    if (match && match.length > 0) {
        const spread = Object.entries(match[0]?.bookmakers[0].odds)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home") {
                    title = data?.localteam?.name
                }
                if (title === "Away") {
                    title = data?.visitorteam?.name
                }
                value = item[1]?.value
                suspend = item[1]?.stop === 'False' ? '0' : '1'
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}
export const doubleChance = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '222');
    if (match && match.length > 0) {
        const spread = Object.entries(match[0]?.bookmakers[0].odds)
        if (spread.length > 0) {
            const arr = [] as any;
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.name
                if (title === "Home/Draw") {
                    title = `${data?.localteam?.name} or Draw`
                }
                if (title === "Draw/Away") {
                    title = `Draw or ${data?.visitorteam?.name}`
                }
                if (title === "Home/Away") {
                    title = `${data?.localteam?.name} or ${data?.visitorteam?.name}`
                }
                value = item[1]?.value
                suspend = item[1]?.stop === 'False' ? '0' : '1'
                arr.push({ title: title, value: value, suspend: suspend })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const goalsOverUnderOV = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '5');
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds.filter((item: any) => item.ismain === 'True')[0];
        if (fmatch) {
            const arr = [] as any;
            arr.push({ title: fmatch.name, value: '', suspend: fmatch.stop === 'False' ? '0' : '1' })
            fmatch.odds.map((fmatchItem: any) => {
                arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    console.log('Sending New Data', data)
    return tosend;
}
export const resultBothTeamsToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;

    const match = data?.odds?.filter((item: any) => item.id === '22620');
    if (match && match.length > 0) {
        const spread = Object.entries(match[0]?.bookmakers[0].odds)
        if (spread.length > 0) {
            let home = [{ title: data?.localteam?.name, value: null, suspend: null }] as any;
            let away = [{ title: data?.visitorteam?.name, value: null, suspend: null }] as any;
            let draw = [{ title: 'Draw', value: null, suspend: null }] as any;
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/Yes") {
                    home.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Away/Yes") {
                    away.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Draw/Yes") {
                    draw.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
            });
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/No") {
                    home.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Away/No") {
                    away.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Draw/No") {
                    draw.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
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
    const match = data?.odds?.filter((item: any) => item.id === '15');
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds.map((fmatchItem: any) => {
            return {
                title: fmatchItem.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1'
            }
        })
        tosend.push(fmatch)
    }
    return tosend;
}

export const correctScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '81');
    if (match && match.length > 0) {
        const result = [] as any;
        const left = [] as any;
        const middle = [] as any;
        const right = [] as any;
        match[0]?.bookmakers[0].odds.map((item: any) => {
            let checkingData = item?.name.split(':');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (item?.stop === 'False') {
                if (checkingData[0] > checkingData[1]) {
                    left.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
                    })
                } else if (checkingData[0] === checkingData[1]) {
                    middle.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
                    })
                } else {
                    right.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
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
        tosend = result
    }
    return tosend;
}

export const halfTimeFullTime = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '12');
    if (match && match.length > 0) {
        let result = [] as any;
        const newformat = [] as any;
        match[0]?.bookmakers[0].odds.map((item: any) => {
            if (item.name === "Home/Home") {
                newformat[0] = item
            }
            if (item.name === "Home/Draw") {
                newformat[1] = item
            }
            if (item.name === "Home/Away") {
                newformat[2] = item
            }
            if (item.name === "Draw/Home") {
                newformat[3] = item
            }
            if (item.name === "Draw/Draw") {
                newformat[4] = item
            }
            if (item.name === "Draw/Away") {
                newformat[5] = item
            }
            if (item.name === "Away/Home") {
                newformat[6] = item
            }
            if (item.name === "Away/Draw") {
                newformat[7] = item
            }
            if (item.name === "Away/Away") {
                newformat[8] = item
            }
        })
        newformat.map((item: any) => {
            let title = item?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')
            const value = item?.value
            const suspend = item?.stop === 'False' ? '0' : '1'

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


export const asianHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "4");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        fmatchwrap.map((fmatch: any) => {
            if (fmatch) {
                const arr = [] as any;
                fmatch.odds.map((fmatchItem: any, index: number) => {
                    let title = fmatch.name
                    arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            }
        })
    }
    return tosend;
}

export const goalLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22836");
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds.filter((item: any) => item.ismain === 'True')[0];
        if (fmatch) {
            const arr = [] as any;
            arr.push({ title: fmatch.name, value: '', suspend: fmatch.stop === 'False' ? '0' : '1' })
            fmatch.odds.map((fmatchItem: any) => {
                arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}


export const drawNoBet = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22836");
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds.filter((item: any) => item.ismain === 'True')[0];
        if (fmatch) {
            const arr = [] as any;
            arr.push({ title: fmatch.name, value: '', suspend: fmatch.stop === 'False' ? '0' : '1' })
            fmatch.odds.map((fmatchItem: any) => {
                arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const handicapResult = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "79");
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds[0];
        if (fmatch) {
            const arr = [] as any;
            const rearrange = [] as any;
            fmatch.odds.map((item: any) => {
                if (item.name === "Home") {
                    rearrange[0] = item
                } else if (item.name === "Draw") {
                    rearrange[1] = item
                } else if (item.name === "Away") {
                    rearrange[2] = item
                }
            })
            rearrange.map((fmatchItem: any, index: number) => {
                let title = fmatch.name
                if (index !== 0) {
                    if (title.includes('+')) {
                        title = title.replace('+', '-')
                    } else if (title.includes('-')) {
                        title = title.replace('-', '+')
                    }
                }
                arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}

export const alternativeHandicapResult = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "79");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        fmatchwrap.reverse();
        fmatchwrap.map((fmatch: any) => {
            if (fmatch) {
                const arr = [] as any;
                const rearrange = [] as any;
                fmatch.odds.map((item: any) => {
                    if (item.name === "Home") {
                        rearrange[0] = item
                    } else if (item.name === "Draw") {
                        rearrange[1] = item
                    } else if (item.name === "Away") {
                        rearrange[2] = item
                    }
                })
                rearrange.map((fmatchItem: any, index: number) => {
                    let title = fmatch.name
                    if (index !== 0) {
                        if (title.includes('+')) {
                            title = title.replace('+', '-')
                        } else if (title.includes('-')) {
                            title = title.replace('-', '+')
                        }
                    }
                    arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            }
        })

    }
    return tosend;
}


export const minuteResult = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22626");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        const arr = [] as any;
        fmatchwrap.map((fmatchItem: any, index: number) => {
            let title = fmatchItem.name
            if (fmatchItem.name === "Home") {
                title = data?.localteam?.name
            } else if (fmatchItem.name === "Away") {
                title = data?.visitorteam?.name
            }

            arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)

    }
    return tosend;
}

export const first10Minutes = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22907");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        fmatchwrap.map((fmatch: any) => {
            if (fmatch) {
                const arr = [{ title: 'Goals', value: '', suspend: '0' }] as any;
                fmatch.odds.map((fmatchItem: any, index: number) => {
                    let title = fmatch.name
                    arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            }
        })

    }
    return tosend;
}

export const toScoreaPenalty = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "23266");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        const arr = [] as any;
        fmatchwrap.map((fmatchItem: any, index: number) => {
            let title = fmatchItem.name
            if (fmatchItem.name === "Home") {
                title = `${data?.localteam?.name} to score a penalty`
            } else if (fmatchItem.name === "Away") {
                title = `${data?.visitorteam?.name} to score a penalty`
            }

            arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)

    }
    return tosend;
}
export const toMissaPenalty = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "23267");
    if (match && match.length > 0) {
        const fmatchwrap = match[0]?.bookmakers[0].odds;
        const arr = [] as any;
        fmatchwrap.map((fmatchItem: any, index: number) => {
            let title = fmatchItem.name
            if (fmatchItem.name === "Home") {
                title = `${data?.localteam?.name} to miss a penalty`
            } else if (fmatchItem.name === "Away") {
                title = `${data?.visitorteam?.name} to miss a penalty`
            }

            arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)

    }
    return tosend;
}



export const alternativegoalLine = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22836");
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;

        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatch: any) => {
                const arr = [] as any;
                arr.push({ title: fmatch.name, value: '', suspend: fmatch.stop === 'False' ? '0' : '1' })
                fmatch.odds.map((fmatchItem: any) => {
                    arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            })

        }
    }
    return tosend;
}

export const firstHalfAsianHandicap = (data: any, one: boolean = false) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22601");
    if (match && match.length > 0) {
        let fmatchWrap = match[0]?.bookmakers[0].odds;
        if (one) {
            fmatchWrap = match[0]?.bookmakers[0].odds.filter((item: any) => item.ismain === 'True');
            const arr = [] as any;
            fmatchWrap[0].odds.map((fmatchItem: any) => {
                arr.push({ title: fmatchWrap[0].name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        } else {
            if (fmatchWrap && fmatchWrap.length > 0) {
                fmatchWrap.map((fmatch: any) => {
                    const arr = [] as any;
                    fmatch.odds.map((fmatchItem: any) => {
                        arr.push({ title: fmatch.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                    })
                    tosend.push(arr)
                })

            }
        }
    }
    return tosend;
}

export const firstHalfGoalLine = (data: any, one: boolean = false) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22837");
    if (match && match.length > 0) {
        let fmatchWrap = match[0]?.bookmakers[0].odds;
        if (one) {
            fmatchWrap = match[0]?.bookmakers[0].odds.filter((item: any) => item.ismain === 'True');
            console.log({ one, fmatchWrap })
            const arr = [{ title: fmatchWrap[0].name, value: '', suspend: '0' }] as any;
            fmatchWrap[0].odds.map((fmatchItem: any) => {
                arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        } else {
            if (fmatchWrap && fmatchWrap.length > 0) {
                fmatchWrap.map((fmatch: any) => {
                    const arr = [{ title: fmatch.name, value: '', suspend: '0' }] as any;
                    fmatch.odds.map((fmatchItem: any) => {
                        arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                    })
                    tosend.push(arr)
                })

            }
        }
    }
    return tosend;
}

export const betResult = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "1")

    if (match && match.length > 0) {
        const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "2102")
    if (match && match.length > 0) {
        const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "3")
    if (match && match.length > 0) {
        const arr = [{ title: "2nd Half", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22626")
    if (match && match.length > 0) {
        const arr = [{ title: "10 Minute", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    return tosend;
}
export const betBothTeamsToScore = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "15")

    if (match && match.length > 0) {
        const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22604")
    if (match && match.length > 0) {
        const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22605")
    if (match && match.length > 0) {
        const arr = [{ title: "2nd Half", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    return tosend;
}
export const betGoalOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "22608")

    if (match && match.length > 0) {
        const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22609")
    if (match && match.length > 0) {
        const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: "", value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    return tosend;
}
export const betDoubleChance = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "222")

    if (match && match.length > 0) {

        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' or ')
            const arr = [{ title: title, value: '', suspend: fmatchItem.stop === 'False' ? '0' : '1' }] as any;

            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            tosend.push(arr)
        })

    }
    return tosend;
}
export const bethalftimeFulltime = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "12")

    if (match && match.length > 0) {

        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')
            const arr = [{ title: title, value: '', suspend: fmatchItem.stop === 'False' ? '0' : '1' }] as any;

            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            tosend.push(arr)
        })

    }
    return tosend;
}

export const betScore = (data: any, oddData: any) => {
    if (!data && !data.odds) {
        return oddData;
    }
    let result = [] as any;
    let left = [] as any;
    let middle = [] as any;
    let right = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "81")

    if (match && match.length > 0) {

        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let checkingData = fmatchItem?.name.split(':');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (checkingData[0] > checkingData[1]) {
                left.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
            } else if (checkingData[0] === checkingData[1]) {
                middle.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
            } else {
                right.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
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
        oddData["Full Time Score"] = result

    }
    match = data?.odds?.filter((item: any) => item.id === "181")
    result = [] as any;
    left = [] as any;
    middle = [] as any;
    right = [] as any;
    if (match && match.length > 0) {

        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let checkingData = fmatchItem?.name.split(':');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (checkingData[0] > checkingData[1]) {
                left.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
            } else if (checkingData[0] === checkingData[1]) {
                middle.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
            } else {
                right.push({
                    title: fmatchItem?.name.replace(':', "-"),
                    value: fmatchItem.value,
                    suspend: fmatchItem.stop === 'False' ? '0' : '1'
                })
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
        oddData["Half Time Score"] = result

    }
    return oddData
}
export const bethalfWithMostGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "91")

    if (match && match.length > 0) {
        const rearrange = [] as any;
        match[0]?.bookmakers[0].odds.map((item: any) => {
            if (item.name === "1st Half") {
                rearrange[0] = item
            } else if (item.name === "2nd Half") {
                rearrange[1] = item
            } else if (item.name === "Draw") {
                rearrange[2] = item
            }
        })
        rearrange?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            if (title === "Draw") {
                title = "Neither Half (Tie)"
            }
            const arr = [{ title: title, value: '', suspend: fmatchItem.stop === 'False' ? '0' : '1' }] as any;

            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            tosend.push(arr)
        })

    }
    return tosend;
}
export const betteamSpecials = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "22607")

    if (match && match.length > 0) {
        const arr = [{ title: 'to Win to Nil', value: '', suspend: match[0]?.bookmakers[0].stop === 'False' ? '0' : '1' }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')


            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })

        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22615")

    if (match && match.length > 0) {
        const arr = [{ title: 'to Win Either Half', value: '', suspend: match[0]?.bookmakers[0].stop === 'False' ? '0' : '1' }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')


            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })

        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "2293")

    if (match && match.length > 0) {
        const arr = [{ title: 'to Win Both Halves', value: '', suspend: match[0]?.bookmakers[0].stop === 'False' ? '0' : '1' }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')


            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })

        })
        tosend.push(arr)
    }
    match = data?.odds?.filter((item: any) => item.id === "22833")

    if (match && match.length > 0) {
        const arr = [{ title: 'to Score in Both Halves', value: '', suspend: match[0]?.bookmakers[0].stop === 'False' ? '0' : '1' }] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            title = title.replace('/', ' - ')


            arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })

        })
        tosend.push(arr)
    }

    return tosend;
}

export const alternativetotalGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '5');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatch: any) => {
                const arr = [{ title: fmatch.name, value: '', suspend: '0' }] as any;
                fmatch.odds.map((fmatchItem: any) => {
                    arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            })

        }
    }
    return tosend;
}
export const resultTotalGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === "22621");
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;

        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatch: any) => {
                let arr1 = [{ title: data?.localteam?.name, value: '', suspend: fmatchWrap?.stop === 'False' ? '0' : '1' }] as any;
                let arr2 = [{ title: data?.visitorteam?.name, value: '', suspend: fmatchWrap?.stop === 'False' ? '0' : '1' }] as any;
                let arr3 = [{ title: 'Draw', value: '', suspend: fmatchWrap?.stop === 'False' ? '0' : '1' }] as any;

                fmatch.odds.map((fmatchItem: any) => {
                    if (fmatchItem.name === ('Home/Over')) {
                        arr1[1] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    } else if (fmatchItem.name === ('Home/Under')) {
                        arr1[2] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    } else if (fmatchItem.name === ('Away/Over')) {
                        arr2[1] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    } else if (fmatchItem.name === ('Away/Under')) {
                        arr2[2] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    } else if (fmatchItem.name === ('Draw/Over')) {
                        arr3[1] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    } else if (fmatchItem.name === ('Draw/Under')) {
                        arr3[2] = { title: fmatch?.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' }
                    }

                })
                tosend.push(arr1)
                tosend.push(arr2)
                tosend.push(arr3)
            })

        }
    }
    return tosend;
}

export const lastTeamToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '2225');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            fmatchWrap.map((fmatchItem: any) => {
                let title = fmatchItem.name
                if (title === "Home") {
                    title = data?.localteam?.name
                } else if (title === "Away") {
                    title = data?.visitorteam?.name
                } else if (title === "Draw") {
                    title = 'No Goal'
                }
                arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)


        }
    }
    return tosend;
}

export const goalOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "22608")
    if (match && match.length > 0) {
        const arr = [] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    return tosend;
}
export const firsthalfgoalOddEven = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === "22609")
    if (match && match.length > 0) {
        const arr = [] as any;
        match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
            let title = fmatchItem?.name
            title = title.replaceAll('Home', data?.localteam?.name)
            title = title.replaceAll('Away', data?.visitorteam?.name)
            arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
        })
        tosend.push(arr)
    }
    return tosend;
}

export const bothTeamsToScoreHalf = (data: any, half: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === '22604');
    if (half === '2') {
        match = data?.odds?.filter((item: any) => item.id === '22605');
    }
    if (match && match.length > 0) {
        const fmatch = match[0]?.bookmakers[0].odds.map((fmatchItem: any) => {
            return {
                title: fmatchItem.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1'
            }
        })
        tosend.push(fmatch)
    }
    return tosend;
}

export const HalfGoals = (data: any, half: any = '1') => {

    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === '6');
    if (half === '2') {
        match = data?.odds?.filter((item: any) => item.id === '7');
    }
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatch: any) => {
                const arr = [{ title: fmatch.name, value: '', suspend: '0' }] as any;
                fmatch.odds.map((fmatchItem: any) => {
                    arr.push({ title: '', value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
                })
                tosend.push(arr)
            })

        }
    }
    return tosend;
}
export const cleanSheet = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const arr = [] as any;
    let match = data?.odds?.filter((item: any) => item.id === '13');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatchItem: any) => {
                arr.push({ title: fmatchItem.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
        }
    }
    match = data?.odds?.filter((item: any) => item.id === '14');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            fmatchWrap.map((fmatchItem: any) => {
                arr.push({ title: fmatchItem.name, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
        }
    }
    tosend.push(arr)
    return tosend;
}

export const halfTimeResult = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '2102');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            fmatchWrap.map((fmatchItem: any) => {
                let title = fmatchItem.name
                if (title === "Home") {
                    title = data?.localteam?.name
                } else if (title === "Away") {
                    title = data?.visitorteam?.name
                } else if (title === "Draw") {
                    title = 'Draw'
                }
                arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}
export const halfTimeDoubleChance = (data: any) => {

    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '22602');
    if (match && match.length > 0) {
        const fmatchWrap = match[0]?.bookmakers[0].odds;
        if (fmatchWrap && fmatchWrap.length > 0) {
            const arr = [] as any
            fmatchWrap.map((fmatchItem: any) => {
                let title = fmatchItem.name
                title = title.replaceAll('Home', data?.localteam?.name)
                title = title.replace('/', ' or ')
                title = title.replaceAll('Away', data?.visitorteam?.name)
                arr.push({ title: title, value: fmatchItem.value, suspend: fmatchItem.stop === 'False' ? '0' : '1' })
            })
            tosend.push(arr)
        }
    }
    return tosend;
}
export const halfTimeResultBothTeamsToScore = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;

    const match = data?.odds?.filter((item: any) => item.id === '22840');
    if (match && match.length > 0) {
        const spread = Object.entries(match[0]?.bookmakers[0].odds)
        if (spread.length > 0) {
            let home = [{ title: data?.localteam?.name, value: null, suspend: null }] as any;
            let away = [{ title: data?.visitorteam?.name, value: null, suspend: null }] as any;
            let draw = [{ title: 'Draw', value: null, suspend: null }] as any;
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/Yes") {
                    home.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Away/Yes") {
                    away.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Draw/Yes") {
                    draw.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
            });
            spread.forEach(([key, value]: [any, any]) => {
                if (value.name === "Home/No") {
                    home.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Away/No") {
                    away.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
                }
                if (value.name === "Draw/No") {
                    draw.push({ title: '', value: value.value, suspend: value.stop === 'False' ? '0' : '1' })
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

export const halfTimeCorrectScore = (data: any) => {
    if (!data && !data.odds) {
        return []
    }
    let tosend = [] as any;
    const match = data?.odds?.filter((item: any) => item.id === '181');
    if (match && match.length > 0) {
        const result = [] as any;
        const left = [] as any;
        const middle = [] as any;
        const right = [] as any;
        match[0]?.bookmakers[0].odds.map((item: any) => {
            let checkingData = item?.name.split(':');
            checkingData[0] = Number(checkingData[0]);
            checkingData[1] = Number(checkingData[1]);
            if (item?.stop === 'False') {
                if (checkingData[0] > checkingData[1]) {
                    left.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
                    })
                } else if (checkingData[0] === checkingData[1]) {
                    middle.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
                    })
                } else {
                    right.push({
                        title: item?.name.replace(":", "-"),
                        value: item?.value,
                        suspend: item?.stop === 'False' ? '0' : '1'
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
        tosend = result
    }
    return tosend;
    return tosend
}
// upto



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
                console.log(data.odds[item])
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

        console.log(keys);
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
export const alternativematchGoals = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }
    const tosend = [] as any;
    const participantsObject = { ...data?.odds?.[421]?.participants };
    const keysToRemove = Object.keys(participantsObject).slice(-2);

    keysToRemove.forEach(key => {
        delete participantsObject[key];
    });
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
    console.log('Sending New Data', data)
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
    console.log('Sending New Data', data)
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
        tosend = result
    }
    // console.log({ tosend })
    return tosend
}





export const firstHalfHandicap = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[2000]?.participants) {
        console.log('data?.odds?.[2000]?.participants', data?.odds?.[2000]?.participants)
        const spread = Object.entries(data?.odds?.[2000]?.participants)
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
    return tosend;
}





export const asianCorners = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data?.odds?.[90006]?.participants) {
        const participantsObject = data?.odds?.[90006]?.participants;
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
    return tosend;
}
export const firstHalfAsianCorners = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data?.odds?.[906]?.participants) {
        const participantsObject = data?.odds?.[906]?.participants;
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
    return tosend;
}

export const cornerRace = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data) {
        Object.keys(data?.odds).map((item) => {
            if (data.odds[item].name.startsWith('Race to the ') && data.odds[item].name.includes('corner?')) {
                let corner = data.odds[item].name.replace('Race to the ', '');
                corner = corner.replace(' corner?', '')
                corner = corner.slice(0, -2);
                const spread = Object.entries(data?.odds?.[item]?.participants)
                const arr = [{ title: corner, value: null, suspend: data.odds[item].suspend }] as any;
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = "0";
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                })
                tosend.push(arr)
            }
        })
    }
    return tosend;
}

export const corners = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    let tosend = [] as any;
    if (data) {
        Object.keys(data?.odds).map((item) => {
            if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes(' corner? (2 Way)')) {
                let corner = data.odds[item].name.replace('Which team will score the ', '');
                corner = corner.replace(' corner? (2 Way)', '')
                corner = corner + ' Corner';
                const spread = Object.entries(data?.odds?.[item]?.participants)
                const arr = [{ title: corner, value: null, suspend: data.odds[item].suspend }] as any;
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = "0";
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                })
                tosend.push(arr)
            }
            if (data.odds[item].name === "Last Corner") {
                const spread = Object.entries(data?.odds?.[item]?.participants)
                const arr = [{ title: "Last", value: null, suspend: data.odds[item].suspend }] as any;
                spread.map((item: any, index: number) => {
                    let title = '';
                    let value = '';
                    let suspend = "0";
                    value = item[1]?.value_eu
                    suspend = item[1]?.suspend
                    arr.push({ title: title, value: value, suspend: suspend })
                })
                tosend.push(arr)
            }
        })
        // formatting making Last to alway appear at last
        if (tosend.length > 1) {
            const newData = [...tosend];
            let lastArray = null;

            for (const array of newData) {
                if (array[0].title === 'Last') {
                    lastArray = array;
                    newData.splice(newData.indexOf(array), 1);
                    break;
                }
            }
            if (lastArray) {
                newData.push(lastArray);
            }
            tosend = newData
        }

    }
    return tosend;
}

export const matchCorners = (data: any, oddData: any) => {
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
                    existing.push({ title: value.handicap, value: '', suspend: value.suspend });
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
    oddData.rows = tosend
    data && Object.keys(data?.stats).map((item) => {
        if (data.stats[item].name === "ICorner") {
            console.log('ICORNER')
            oddData.currentCorners = Number(data.stats[item].home) + Number(data.stats[item].away)
        }

    })
    return oddData
}


export const twoWayCorners = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[520]?.participants) {
        const spread = Object.entries(data?.odds?.[520]?.participants)
        if (spread.length > 0) {
            let existing = [] as any;
            spread.forEach(([key, value]: [any, any]) => {
                if (existing.length == 0) {
                    existing.push({ title: value.handicap, value: '', suspend: value.suspend });
                }
                existing.push({ title: '', value: value.value_eu, suspend: value.suspend });
                if (existing.length == 3) {
                    existing
                    tosend.push(existing);
                    existing = []
                }
            });

        }
    }
    return tosend;
}

export const toQualify = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[93005]?.participants) {
        const spread = Object.entries(data?.odds?.[93005]?.participants)
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
    return tosend;
}

export const twoCellTitleValue = (data: any, fn: string) => {
    if (!data && !data.odds) {
        return [];
    }
    if (!fn) {
        return []
    }
    let id = 1111111110 as number;
    if (fn === "toWintheTrophy") {
        id = 9200415
    } else if (fn === "gameWonInExtraTime") {
        id = 93009
    } else if (fn === "gameWonAfterPenaltiesShootout") {
        id = 50009
    } else if (fn === "bothTeamsToScoreFirstHalf") {
        id = 317
    } else if (fn === "bothTeamsToScoreSecondHalf") {
        id = 318
    } else if (fn === "teamCleanSheet") {
        id = 307
    } else {
        return []
    }
    const tosend = [] as any;
    if (data?.odds?.[id]?.participants) {
        const spread = Object.entries(data?.odds?.[id]?.participants)
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
    return tosend;
}

export const goalsOverUnder = (data: any, oddData: any, fn: string) => {

    if (!data && !data.odds) {
        return [];
    }

    let id = 10101010010100;
    if (fn === "homeGoals") {
        id = 1;
        oddData.marketname = oddData?.marketname?.replace('Home', data?.team_info?.home?.name)
    } else if (fn === "awayGoals") {
        id = 2;
        oddData.marketname = oddData?.marketname?.replace('Away', data?.team_info?.home?.name)
    } else {
        return oddData;
    }


    const tosend = [] as any;
    if (data?.odds?.[id]?.participants) {
        const participantsObject = data?.odds?.[id]?.participants;
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
    console.log('Sending New Data', data)

    oddData.rows = tosend
    return oddData;
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

    if (oddData && oddData.subtabs) {
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
    let tosend = [] as any;
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
                    tosend.push([{ title: title, value: '', suspend: suspend }, { title: '', value: value, suspend: suspend }])
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
    oddData.subtabs = [];
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

    if (oddData && oddData.subtabs) {
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




export const BetTeamToScorein2ndHalf = (data: any) => {
    if (!data && !data.odds) {
        return [];
    }

    const tosend = [] as any;
    if (data?.odds?.[90307]?.participants) {
        const spread = Object.entries(data?.odds?.[90307]?.participants)
        if (spread.length > 0) {
            let arr = [{ title: data?.team_info?.home?.name, value: '', suspend: data?.odds?.[90307]?.suspend }] as any;
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
            let arr = [{ title: data?.team_info?.away?.name, value: '', suspend: data?.odds?.[90308]?.suspend }] as any;
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
            let arr = [{ title: data?.team_info?.away?.name, value: '', suspend: data?.odds?.[90311]?.suspend }] as any;
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
    if (oddData && oddData.subtabs) {
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