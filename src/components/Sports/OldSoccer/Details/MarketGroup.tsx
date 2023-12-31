'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from './MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import { dataFeedStr } from './datastructure';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
interface MarketGroupProps {
    data: any;
    active: string;
}

const singleLineHandicapOverUnder = (data: any, suspend: string, participants: any) => {
    data.suspend = suspend;
    data.over = null;
    data.under = null;
    data.handicap = null;

    if (data.suspend === "0") {
        Object.keys(participants).map(participat => {
            if (participants[participat]?.name === "Over") {
                data.over = participants[participat].value_eu
                data.handicap = participants[participat].handicap
            } else if (participants[participat]?.name === "Under") {
                data.under = participants[participat].value_eu
            }
        })
    }
    return data;
}

const fillHomeAway = (data: any, suspend: string, participants: any) => {
    data.suspend = suspend;
    data.home = null;
    data.away = null;

    if (data.suspend === "0") {
        Object.keys(participants).map(participat => {
            if (participants[participat]?.name === "Home") {
                data.home = participants[participat].value_eu
            } else if (participants[participat]?.name === "Away") {
                data.away = participants[participat].value_eu
            }
        })
    }
    return data;
}
const fill1nogoal2 = (data: any, suspend: string, participants: any) => {
    data.suspend = suspend;
    data["1"] = null;
    data.nogoal = null;
    data["2"] = null;
    data.corner = null;
    if (data.suspend === "0") {
        Object.keys(participants).map(participat => {
            if (participants[participat]?.name === "1") {
                data["1"] = participants[participat].value_eu
            } else if (participants[participat]?.name === "No goal") {
                data.nogoal = participants[participat].value_eu
            } else if (participants[participat]?.name === "2") {
                data["2"] = participants[participat].value_eu
            }
        })
    }
    return data;
}

const fillOddEven = (data: any, suspend: string, participants: any) => {
    data.suspend = suspend;
    data.odd = null;
    data.even = null;

    if (data.suspend === "0") {
        Object.keys(participants).map(participat => {
            if (participants[participat]?.name === "Odd") {
                data.odd = participants[participat].value_eu
            } else if (participants[participat]?.name === "Even") {
                data.even = participants[participat].value_eu
            }
        })
    }
    return data;
}

const MarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    const [marketData, setMarketData] = useState(dataFeedStr)

    let oddData = dataFeedStr as any;

    data && Object.keys(data?.stats).map((item) => {
        if (data.stats[item].name === "ICorner") {
            console.log('ICORNER')
            oddData["matchCorners"].currentCorner = Number(data.stats[item].home) + Number(data.stats[item].away)
        }

    })
    let computeCornerRaces = [] as any;
    data &&
        Object.keys(data?.odds).map((item) => {
            let participants = data.odds[item]?.participants;
            if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes('goal?')) {
                let ngoal = data.odds[item].name.replace('Which team will score the ', '');
                oddData["nGoal"].goal = ngoal.replace(' goal?', '')
                oddData["nGoal"].suspend = data.odds[item]?.suspend;
                const par1 = Object.keys(participants).filter(item => participants[item].name === '1')[0]
                const nogoal = Object.keys(participants).filter(item => participants[item].name === 'No goal')[0]
                const par2 = Object.keys(participants).filter(item => participants[item].name === '2')[0]
                oddData["nGoal"].home = participants[par1]?.value_eu
                oddData["nGoal"].nogoal = participants[nogoal]?.value_eu
                oddData["nGoal"].away = participants[par2]?.value_eu
            }
            if (data.odds[item].name === categoriesMapping["fulltimeResult"]) {
                oddData["fulltimeResult"].suspend = data.odds[item]?.suspend
                if (oddData["fulltimeResult"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home") {
                            oddData["fulltimeResult"].home = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Away") {
                            oddData["fulltimeResult"].away = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Draw") {
                            oddData["fulltimeResult"].draw = participants[participat].value_eu
                        }
                    })
                }
            }
            if (data.odds[item].name === "Double Chance") {
                oddData["doubleChance"].suspend = data.odds[item]?.suspend
                if (oddData["doubleChance"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home or Draw") {
                            oddData["doubleChance"].homeOrDraw = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Away or Draw") {
                            oddData["doubleChance"].awayOrDraw = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Home or Away") {
                            oddData["doubleChance"].homeOrAway = participants[participat].value_eu
                        }
                    })
                }
            }
            if (data.odds[item].name === "1x2 (1st Half)") {
                oddData["halfTimeResult"].suspend = data.odds[item]?.suspend
                if (oddData["halfTimeResult"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home") {
                            oddData["halfTimeResult"].home = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Draw") {
                            oddData["halfTimeResult"].draw = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Away") {
                            oddData["halfTimeResult"].away = participants[participat].value_eu
                        }
                    })
                }
            }
            if (data.odds[item].name === "Over/Under Line (1st Half)") {
                oddData["firstHalfGoals"].suspend = data.odds[item]?.suspend
                oddData["firstHalfGoals"].over = [];
                oddData["firstHalfGoals"].under = [];
                oddData["firstHalfGoals"].underhandicap = [];
                oddData["firstHalfGoals"].overhandicap = [];
                if (oddData["firstHalfGoals"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["firstHalfGoals"].over.push(participants[participat].value_eu)
                            oddData["firstHalfGoals"].overhandicap.push(participants[participat].handicap)
                        } else if (participants[participat]?.name === "Under") {
                            oddData["firstHalfGoals"].under.push(participants[participat].value_eu)
                            oddData["firstHalfGoals"].underhandicap.push(participants[participat].handicap)
                        }
                    })
                } else {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["firstHalfGoals"].overhandicap.push(participants[participat].handicap)
                        }
                    })
                }
            }
            if (data.odds[item].name === categoriesMapping["matchGoals"]) {
                oddData["matchGoals"].suspend = data.odds[item]?.suspend
                oddData["matchGoals"].over = [];
                oddData["matchGoals"].under = [];
                oddData["matchGoals"].underhandicap = [];
                oddData["matchGoals"].overhandicap = [];
                oddData["alternativeMatchGoals"].suspend = data.odds[item]?.suspend
                if (oddData["matchGoals"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["matchGoals"].over.push(participants[participat].value_eu)
                            oddData["matchGoals"].overhandicap.push(participants[participat].handicap)
                        } else if (participants[participat]?.name === "Under") {
                            oddData["matchGoals"].under.push(participants[participat].value_eu)
                            oddData["matchGoals"].underhandicap.push(participants[participat].handicap)
                        }
                    })
                } else {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["matchGoals"].overhandicap.push(participants[participat].handicap)
                        }
                    })
                }
            }
            if (data.odds[item].name === "Match Corners") {
                oddData["matchCorners"].suspend = data.odds[item]?.suspend;
                oddData["matchCorners"].over = [];
                oddData["matchCorners"].exactly = [];
                oddData["matchCorners"].under = [];
                oddData["matchCorners"].handicap = [];
                if (oddData["matchCorners"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["matchCorners"].over.push(participants[participat].value_eu)
                            oddData["matchCorners"].handicap.push(participants[participat].handicap)
                        } else if (participants[participat]?.name === "Exactly") {
                            oddData["matchCorners"].exactly.push(participants[participat].value_eu)
                        } else if (participants[participat]?.name === "Under") {
                            oddData["matchCorners"].under.push(participants[participat].value_eu)
                        }
                    })
                } else {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Over") {
                            oddData["matchCorners"].handicap.push(participants[participat].handicap)
                        }
                    })
                }
            }
            // single line Handicap Over Under
            if (data.odds[item].name === "Total Corners") {
                const twoWayCorner = singleLineHandicapOverUnder(oddData["twoWayCorner"], data.odds[item]?.suspend, participants);
                oddData["twoWayCorner"] = twoWayCorner;
            }
            if (data.odds[item].name === "Asian Corners") {
                const asianCorners = singleLineHandicapOverUnder(oddData["asianCorners"], data.odds[item]?.suspend, participants);
                oddData["asianCorners"] = asianCorners;
            }
            if (data.odds[item].name === "Over/Under Line") {
                const asianCorners = singleLineHandicapOverUnder(oddData["goalLine"], data.odds[item]?.suspend, participants);
                oddData["goalLine"] = asianCorners;
            }
            if (data.odds[item].name === "Asian Handicap") {
                oddData["asianHandicap"].suspend = data.odds[item]?.suspend;
                oddData["asianHandicap"].home = [];
                oddData["asianHandicap"].away = [];
                oddData["asianHandicap"].homeHandicap = [];
                oddData["asianHandicap"].awayHandicap = [];
                if (oddData["asianHandicap"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home") {
                            oddData["asianHandicap"].home.push(participants[participat].value_eu)
                            oddData["asianHandicap"].homeHandicap.push(participants[participat].handicap)
                        } else if (participants[participat]?.name === "Away") {
                            oddData["asianHandicap"].away.push(participants[participat].value_eu)
                            oddData["asianHandicap"].awayHandicap.push(participants[participat].handicap)

                        }
                    })
                }
            }

            if (data.odds[item].name === "Asian Handicap (1st Half)") {
                oddData["1stHalfAsianHandicap"].suspend = data.odds[item]?.suspend;
                oddData["1stHalfAsianHandicap"].home = [];
                oddData["1stHalfAsianHandicap"].away = [];
                oddData["1stHalfAsianHandicap"].homeHandicap = [];
                oddData["1stHalfAsianHandicap"].awayHandicap = [];
                if (oddData["1stHalfAsianHandicap"].suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home") {
                            oddData["1stHalfAsianHandicap"].home.push(participants[participat].value_eu)
                            oddData["1stHalfAsianHandicap"].homeHandicap.push(participants[participat].handicap)
                        } else if (participants[participat]?.name === "Away") {
                            oddData["1stHalfAsianHandicap"].away.push(participants[participat].value_eu)
                            oddData["1stHalfAsianHandicap"].awayHandicap.push(participants[participat].handicap)

                        }
                    })
                }
            }
            if (data.odds[item].name === "Draw No Bet") {
                const drawNoBet = fillHomeAway(oddData["drawNoBet"], data.odds[item]?.suspend, participants)
                oddData["drawNoBet"] = drawNoBet
            }
            if (data.odds[item].name === "Last Team to Score (3 way)") {
                const lastTeamToScore = fill1nogoal2(oddData["lastTeamToScore"], data.odds[item]?.suspend, participants)
                oddData["lastTeamToScore"] = lastTeamToScore
            }
            if (data.odds[item].name === "Goals Odd/Even") {
                const goalOddeven = fillOddEven(oddData["goalOddEven"], data.odds[item]?.suspend, participants)
                oddData["goalOddEven"] = goalOddeven
            }
            if (data.odds[item].name.startsWith("Race to the ") && data.odds[item].name.includes(" corner?")) {
                let cornerRaceObject = {
                    suspend: "01",
                    corner: null,
                    '1': null,
                    neither: null,
                    '2': null
                }
                let cornersRaceNumber = data.odds[item].name.replace('Race to the ', '');
                cornersRaceNumber = cornersRaceNumber.replace(' corner?', '')
                cornersRaceNumber = cornersRaceNumber.trim();
                cornersRaceNumber = cornersRaceNumber.slice(0, -2);
                cornerRaceObject.corner = cornersRaceNumber
                cornerRaceObject.suspend = data.odds[item]?.suspend;
                if (data.odds[item]?.suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "1") {
                            cornerRaceObject["1"] = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Neither") {
                            cornerRaceObject.neither = participants[participat].value_eu
                        } else if (participants[participat]?.name === "2") {
                            cornerRaceObject["2"] = participants[participat].value_eu
                        }
                    })
                }
                computeCornerRaces.push({ ...cornerRaceObject });
            }


        })
    oddData["cornersRace"].corner = computeCornerRaces;
    if (computeCornerRaces.length > 0) {
        oddData["cornersRace"].suspend = "0"
    }

    // useEffect(() => {
    //     const marketDatadup = dataFeedStr;
    //     console.log('run1', marketDatadup)
    //     data && Object.keys(data?.stats).map((item) => {
    //         if (data.stats[item].name === "ICorner") {
    //             marketDatadup["matchCorners"].currentCorner = Number(data.stats[item].home) + Number(data.stats[item].away)
    //         }

    //     })
    //     let computeCornerRaces = [] as any;
    //     data && Object.keys(data?.odds).map((item) => {
    //         let participants = data.odds[item]?.participants;
    //         if (data.odds[item].name.startsWith('Which team will score the ') && data.odds[item].name.includes('goal?')) {
    //             let ngoal = data.odds[item].name.replace('Which team will score the ', '');
    //             marketDatadup["nGoal"].goal = ngoal.replace(' goal?', '')
    //             marketDatadup["nGoal"].suspend = data.odds[item]?.suspend;
    //             const par1 = Object.keys(participants).filter(item => participants[item].name === '1')[0]
    //             const nogoal = Object.keys(participants).filter(item => participants[item].name === 'No goal')[0]
    //             const par2 = Object.keys(participants).filter(item => participants[item].name === '2')[0]
    //             marketDatadup["nGoal"].home = participants[par1]?.value_eu
    //             marketDatadup["nGoal"].nogoal = participants[nogoal]?.value_eu
    //             marketDatadup["nGoal"].away = participants[par2]?.value_eu
    //         }
    //         if (data.odds[item].name === categoriesMapping["fulltimeResult"]) {
    //             marketDatadup["fulltimeResult"].suspend = data.odds[item]?.suspend
    //             if (marketDatadup["fulltimeResult"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Home") {
    //                         marketDatadup["fulltimeResult"].home = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Away") {
    //                         marketDatadup["fulltimeResult"].away = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Draw") {
    //                         marketDatadup["fulltimeResult"].draw = participants[participat].value_eu
    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === "Double Chance") {
    //             marketDatadup["doubleChance"].suspend = data.odds[item]?.suspend
    //             if (marketDatadup["doubleChance"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Home or Draw") {
    //                         marketDatadup["doubleChance"].homeOrDraw = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Away or Draw") {
    //                         marketDatadup["doubleChance"].awayOrDraw = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Home or Away") {
    //                         marketDatadup["doubleChance"].homeOrAway = participants[participat].value_eu
    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === "1x2 (1st Half)") {
    //             marketDatadup["halfTimeResult"].suspend = data.odds[item]?.suspend
    //             if (marketDatadup["halfTimeResult"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Home") {
    //                         marketDatadup["halfTimeResult"].home = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Draw") {
    //                         marketDatadup["halfTimeResult"].draw = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Away") {
    //                         marketDatadup["halfTimeResult"].away = participants[participat].value_eu
    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === "Over/Under Line (1st Half)") {
    //             marketDatadup["firstHalfGoals"].suspend = data.odds[item]?.suspend
    //             marketDatadup["firstHalfGoals"].over = [];
    //             marketDatadup["firstHalfGoals"].under = [];
    //             marketDatadup["firstHalfGoals"].underhandicap = [];
    //             marketDatadup["firstHalfGoals"].overhandicap = [];
    //             if (marketDatadup["firstHalfGoals"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["firstHalfGoals"].over.push(participants[participat].value_eu)
    //                         marketDatadup["firstHalfGoals"].overhandicap.push(participants[participat].handicap)
    //                     } else if (participants[participat]?.name === "Under") {
    //                         marketDatadup["firstHalfGoals"].under.push(participants[participat].value_eu)
    //                         marketDatadup["firstHalfGoals"].underhandicap.push(participants[participat].handicap)
    //                     }
    //                 })
    //             } else {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["firstHalfGoals"].overhandicap.push(participants[participat].handicap)
    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === categoriesMapping["matchGoals"]) {
    //             marketDatadup["matchGoals"].suspend = data.odds[item]?.suspend
    //             marketDatadup["matchGoals"].over = [];
    //             marketDatadup["matchGoals"].under = [];
    //             marketDatadup["matchGoals"].underhandicap = [];
    //             marketDatadup["matchGoals"].overhandicap = [];
    //             marketDatadup["alternativeMatchGoals"].suspend = data.odds[item]?.suspend
    //             if (marketDatadup["matchGoals"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["matchGoals"].over.push(participants[participat].value_eu)
    //                         marketDatadup["matchGoals"].overhandicap.push(participants[participat].handicap)
    //                     } else if (participants[participat]?.name === "Under") {
    //                         marketDatadup["matchGoals"].under.push(participants[participat].value_eu)
    //                         marketDatadup["matchGoals"].underhandicap.push(participants[participat].handicap)
    //                     }
    //                 })
    //             } else {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["matchGoals"].overhandicap.push(participants[participat].handicap)
    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === "Match Corners") {
    //             marketDatadup["matchCorners"].suspend = data.odds[item]?.suspend;
    //             marketDatadup["matchCorners"].over = [];
    //             marketDatadup["matchCorners"].exactly = [];
    //             marketDatadup["matchCorners"].under = [];
    //             marketDatadup["matchCorners"].handicap = [];
    //             if (marketDatadup["matchCorners"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["matchCorners"].over.push(participants[participat].value_eu)
    //                         marketDatadup["matchCorners"].handicap.push(participants[participat].handicap)
    //                     } else if (participants[participat]?.name === "Exactly") {
    //                         marketDatadup["matchCorners"].exactly.push(participants[participat].value_eu)
    //                     } else if (participants[participat]?.name === "Under") {
    //                         marketDatadup["matchCorners"].under.push(participants[participat].value_eu)
    //                     }
    //                 })
    //             } else {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Over") {
    //                         marketDatadup["matchCorners"].handicap.push(participants[participat].handicap)
    //                     }
    //                 })
    //             }
    //         }
    //         // single line Handicap Over Under
    //         if (data.odds[item].name === "Total Corners") {
    //             const twoWayCorner = singleLineHandicapOverUnder(marketDatadup["twoWayCorner"], data.odds[item]?.suspend, participants);
    //             marketDatadup["twoWayCorner"] = twoWayCorner;
    //         }
    //         if (data.odds[item].name === "Asian Corners") {
    //             const asianCorners = singleLineHandicapOverUnder(marketDatadup["asianCorners"], data.odds[item]?.suspend, participants);
    //             marketDatadup["asianCorners"] = asianCorners;
    //         }
    //         if (data.odds[item].name === "Over/Under Line") {
    //             const asianCorners = singleLineHandicapOverUnder(marketDatadup["goalLine"], data.odds[item]?.suspend, participants);
    //             marketDatadup["goalLine"] = asianCorners;
    //         }
    //         if (data.odds[item].name === "Asian Handicap") {
    //             marketDatadup["asianHandicap"].suspend = data.odds[item]?.suspend;
    //             marketDatadup["asianHandicap"].home = [];
    //             marketDatadup["asianHandicap"].away = [];
    //             marketDatadup["asianHandicap"].homeHandicap = [];
    //             marketDatadup["asianHandicap"].awayHandicap = [];
    //             if (marketDatadup["asianHandicap"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Home") {
    //                         marketDatadup["asianHandicap"].home.push(participants[participat].value_eu)
    //                         marketDatadup["asianHandicap"].homeHandicap.push(participants[participat].handicap)
    //                     } else if (participants[participat]?.name === "Away") {
    //                         marketDatadup["asianHandicap"].away.push(participants[participat].value_eu)
    //                         marketDatadup["asianHandicap"].awayHandicap.push(participants[participat].handicap)

    //                     }
    //                 })
    //             }
    //         }

    //         if (data.odds[item].name === "Asian Handicap (1st Half)") {
    //             marketDatadup["1stHalfAsianHandicap"].suspend = data.odds[item]?.suspend;
    //             marketDatadup["1stHalfAsianHandicap"].home = [];
    //             marketDatadup["1stHalfAsianHandicap"].away = [];
    //             marketDatadup["1stHalfAsianHandicap"].homeHandicap = [];
    //             marketDatadup["1stHalfAsianHandicap"].awayHandicap = [];
    //             if (marketDatadup["1stHalfAsianHandicap"].suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "Home") {
    //                         marketDatadup["1stHalfAsianHandicap"].home.push(participants[participat].value_eu)
    //                         marketDatadup["1stHalfAsianHandicap"].homeHandicap.push(participants[participat].handicap)
    //                     } else if (participants[participat]?.name === "Away") {
    //                         marketDatadup["1stHalfAsianHandicap"].away.push(participants[participat].value_eu)
    //                         marketDatadup["1stHalfAsianHandicap"].awayHandicap.push(participants[participat].handicap)

    //                     }
    //                 })
    //             }
    //         }
    //         if (data.odds[item].name === "Draw No Bet") {
    //             const drawNoBet = fillHomeAway(marketDatadup["drawNoBet"], data.odds[item]?.suspend, participants )
    //             marketDatadup["drawNoBet"]= drawNoBet
    //         } 
    //         if (data.odds[item].name === "Last Team to Score (3 way)") {
    //             const lastTeamToScore = fill1nogoal2(marketDatadup["lastTeamToScore"], data.odds[item]?.suspend, participants )
    //             marketDatadup["lastTeamToScore"]= lastTeamToScore
    //         }
    //         if (data.odds[item].name === "Goals Odd/Even") {
    //             const goalOddeven = fillOddEven(marketDatadup["goalOddEven"], data.odds[item]?.suspend, participants )
    //             marketDatadup["goalOddEven"]= goalOddeven
    //         } 
    //         if (data.odds[item].name.startsWith("Race to the ") && data.odds[item].name.includes(" corner?")){
    //             let cornerRaceObject = {
    //                 suspend: "01",
    //                 corner: null,
    //                 '1': null,
    //                 neither: null,
    //                 '2': null
    //             }
    //             let cornersRaceNumber = data.odds[item].name.replace('Race to the ', '');
    //             cornersRaceNumber = cornersRaceNumber.replace(' corner?', '')
    //             cornersRaceNumber = cornersRaceNumber.trim();
    //             cornersRaceNumber = cornersRaceNumber.slice(0, -2);
    //             cornerRaceObject.corner = cornersRaceNumber
    //             cornerRaceObject.suspend = data.odds[item]?.suspend;
    //             if (data.odds[item]?.suspend === "0") {
    //                 Object.keys(participants).map(participat => {
    //                     if (participants[participat]?.name === "1") {
    //                         cornerRaceObject["1"] = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "Neither") {
    //                         cornerRaceObject.neither = participants[participat].value_eu
    //                     } else if (participants[participat]?.name === "2") {
    //                         cornerRaceObject["2"] = participants[participat].value_eu
    //                     }
    //                 })
    //             }
    //             computeCornerRaces.push({...cornerRaceObject});
    //         }


    //     })
    //     marketDatadup["cornersRace"].corner = computeCornerRaces;
    //     if(computeCornerRaces.length>0){
    //         marketDatadup["cornersRace"].suspend = "0"
    //     }
    //     console.log('run2', marketDatadup)
    //     setMarketData(marketDatadup)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data])

    if (!data) {
        return null
    }

    console.log('detail market', marketData, data)
    console.log('oddData', oddData, data)

    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map(market => {
                if (oddData[market as keyof typeof marketData].marketname === "Alternative Match Goals") {
                    if (oddData["matchGoals"].over.length < 2) {
                        return null;
                    }
                }
                if (active === "Bet Builder") {
                    const valid = ["Result", "Double Chance", "Match Goals", "Next Goal", "Score", "Goals Odd/Even"]
                    if (!valid.includes(oddData[market as keyof typeof oddData].marketname)) {
                        return null;
                    }
                }
                if (active === "Asian Lines") {
                    const valid = ["Asian Handicap", "Goal Line"]
                    if (!valid.includes(oddData[market as keyof typeof oddData].marketname)) {
                        return null;
                    }
                }
                if (active === "Corners/Cards") {
                    const valid = ["Match Corner", "2-way Corners", "Asian Corners", "Corners Race", "Corners"]
                    if (!valid.includes(oddData[market as keyof typeof oddData].marketname)) {
                        return null;
                    }
                }
                if (active === "Goals") {
                    const valid = ["nGoal", "Match Goal", "Last Team To Score", "Goals Odd/Even"]
                    if (!valid.includes(oddData[market as keyof typeof oddData].marketname)) {
                        return null;
                    }
                }
                if (active === "Half") {
                    const valid = ["Half Time Result", "First Half Goals", "Half Time Correct Score", "1st - Half Handicap", "Both Team Score in 1st Half"]
                    if (!valid.includes(oddData[market as keyof typeof oddData].marketname)) {
                        return null;
                    }
                }

                return (
                    <div key={market} className={'group/item'}
                        onMouseEnter={() => {
                            setMarketData((prevMarketData) => {
                                return {
                                    ...prevMarketData,
                                    [market]: {
                                        ...prevMarketData[market as keyof typeof marketData],
                                        hover: true
                                    }
                                }
                            })
                        }}
                        onMouseLeave={() => {
                            setMarketData((prevMarketData) => {
                                return {
                                    ...prevMarketData,
                                    [market]: {
                                        ...prevMarketData[market as keyof typeof marketData],
                                        hover: false
                                    }
                                }
                            })
                        }}
                    >
                        <div
                            className={cn(" flex cursor-pointer pl-[30px] pr-[15px] border-t border-solid border-t-[rgba(24,153,112,.75)]",
                                oddData[market as keyof typeof oddData]?.suspend !== "0" ? "text-[hsla(0,0%,100%,.3)] hover:text-[hsla(0,0%,100%,.6)] fill-[hsla(0,0%,100%,.3)] hover:fill-[hsla(0,0%,100%,.6)]" : "text-[white] hover:text-brand-green-light fill-[white] hover:fill-brand-green-light")}
                            onClick={() => {
                                setMarketData({
                                    ...marketData,
                                    [market]: {
                                        ...marketData[market as keyof typeof marketData],
                                        show: !marketData[market as keyof typeof marketData].show
                                    }
                                })
                            }}
                        >
                            <div className={'text-base h-[50px] flex items-center font-[700]'}>
                                {market === 'nGoal' ?
                                    `${oddData["nGoal"]?.goal} Goal` :
                                    oddData[market as keyof typeof oddData].marketname
                                }
                                {(market === "asianHandicap" || market === "goalLine") ?
                                    ` (${data?.team_info?.home.score}-${data?.team_info?.away.score})` : ''
                                }
                            </div>
                            {/*  */}
                            {(oddData[market as keyof typeof oddData]?.suspend !== "0" && oddData[market as keyof typeof oddData]?.hover) &&
                                <div className={'flex ml-[10px] text-[12px] h-[50px] items-center font-[400] text-[hsla(0,0%,100%,.6)]'}>
                                    Currently Suspended
                                </div>
                            }
                            <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                                <div className={cn('group hidden items-center justify-center w-[50px] h-[50px] group-hover/item:flex')}>
                                    <div className='hidden items-center justify-center w-[20px] h-[20px] group-hover:flex'>
                                        <StarFilled className={cn("ml-[7px] h-[13px] w-[13px]")} />
                                    </div>
                                    <div className='flex items-center justify-center w-[20px] h-[20px] group-hover:hidden'>
                                        <StarBorderline className={cn("ml-[7px] h-[13px] w-[13px]")} />
                                    </div>
                                </div>

                                <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                                    {(marketData[market as keyof typeof marketData]?.hover || !marketData[market as keyof typeof marketData]?.show) &&
                                        <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                                    }
                                </div>
                            </div>
                        </div>
                        {market === "matchCorners" &&
                            <div className="h-[32px] cursor-pointer">
                                <div className="pl-[30px] pr-[15px] flex items-center w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[#ccc]">
                                    Current corners: {oddData["matchCorners"].currentCorner}
                                </div>
                            </div>
                        }

                        <div
                            className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', marketData[market as keyof typeof marketData]?.show ? 'max-h-[500px]' : 'max-h-[0px]')}>
                            <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[white]">
                                <MarketGroupBody data={data} market={market} marketData={oddData} />
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )

};

export default MarketGroup