import React from 'react'

type Props = {}

export default function BetslipLoader({}: Props) {
  return (
    <div>
        <div>
            <div>
            <div className="overflow-hidden fixed h-full w-full flex items-end pointer-events-none justify-center z-[62] transition-[bottom] duration-[0.2s] left-0 bottom-10"
                style={{
                    contain: "layout"
                }}>
                <div className="touch-none overflow-hidden origin-[center_bottom] pointer-events-auto relative w-full max-w-[450px] block transition-transform duration-[0.25s,opacity] delay-[0.25s] opacity-100 m-0 rounded-[5px] bottom-0 inset-x-0"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "none !important"
                    }}>
                <div className="max-h-[200px] z-[1] overflow-hidden transition-[max-height] duration-[0.25s] ease-[ease-in-out] relative"></div>
                <div className="relative min-h-[auto] transition-[min-height] duration-[0.25s] ease-[ease-in-out]">
                    <div className="pb-[env(safe-area-inset-bottom)] flex items-stretch relative w-full overflow-hidden bg-[#f0f0f0] cursor-pointer h-auto min-h-[55px] rounded-[5px_5px_0_0]">
                    <div className="flex w-full bg-[#f0f0f0] relative whitespace-nowrap min-h-[55px] justify-between pl-[15px] pr-[65px] py-0">
                        <div className="w-full flex-[1_1_100%]">
                        <div className="whitespace-nowrap leading-5 text-[15px] font-bold text-[#545454] flex items-center pt-2.5 pb-[5px]">
                            Selections<span className="inline-block text-[10px] font-bold leading-[15px] min-w-[15px] h-[15px] bg-[#126e51] relative top-[-7px] text-white text-center pointer-events-none px-0.5 py-0 rounded-[999px] left-[3px]">2</span>
                        </div>
                        <div className="hidden font-normal transition-opacity duration-[0.5s] leading-4 text-[11px] cursor-pointer text-[#137a5a] absolute pl-[15px] pr-[5px] pb-2 left-0 bottom-0">
                            Show Options
                        </div>
                        <div className="hidden font-normal transition-opacity duration-[0.5s] leading-4 text-[11px] cursor-pointer text-[#137a5a] absolute pl-[15px] pr-[5px] pb-2 left-px">
                            Hide Options
                        </div>
                        <div className="text-[#666] text-[11px] flex flex-wrap overflow-hidden max-h-9 items-center transition-[margin] duration-[0.25s] mb-[9px]">
                            <div className={`text-xs leading-[18px] text-[#666] inline-flex self-center mr-[5px] after:content-[","]`}>Italy (Arthur) Esports</div>
                            <div className={`text-xs leading-[18px] text-[#666] inline-flex self-center mr-[5px] after:content-["_"]`}>
                            England (Obelix) Esports or Draw
                            </div>
                            <div className="opacity-0 hidden text-[#137a5a] leading-4 bg-[#f0f0f0]">
                            + 0 more
                            </div>
                        </div>
                        </div>
                        <div className="flex-auto h-full hidden">
                        <div className="bss-DefaultContent_OddsSummary">
                            <div className="bss-DefaultContent_OddsSummary-title">
                            1 x Doubles
                            </div>
                            <div className="bss-DefaultContent_OddsSummary-value">2.35</div>
                        </div>
                        <div className="bss-DefaultContent_DetailsSummary-bonus"></div>
                        </div>
                        <div className="leading-4 hidden transition-opacity duration-[0.5s]">
                        <div className="bs-Balance_Label">Balance</div>
                        <div className="bs-Balance_ValueWrapper">
                            <div className="bs-Balance_Value">€11.32</div>
                        </div>
                        </div>
                        <div className={`bg-[12px_7px] h-full min-h-[65px] flex items-center justify-center absolute cursor-pointer w-[55px] border-l-neutral-300 transition-opacity duration-[0.5s] border-l border-solid right-0 top-0`}>
                        <div className='w-3.5 h-2 transition-transform duration-[0.25s] rotate-180'
                            style={{
                                background: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23367A65' fill-rule='evenodd' d='M12 .784L11.243 0 6 5.431.757 0 0 .784l5.243 5.432L6 7l.757-.784z'/%3E%3C/svg%3E") 0 0 no-repeat`
                            }}></div></div>
                    </div>
                    </div>
                </div>
                <div className="items-center w-full h-0 z-10 relative justify-between shadow-[inset_0_-1px_0_0_#d4d4d4] overflow-hidden text-xs transition-[height] duration-[0.25s] ease-[ease-in-out] flex px-[15px] py-0 bg-[#f0f0f0]">
                    <div className="bss-ControlBar_RemoveButton">
                    <div className="bss-ControlBar_RemoveAll">Remove all</div>
                    </div>
                    <div className="bss-ControlBar_ReuseButton">
                    <div className="bss-ControlBar_ReuseSelections">
                        Reuse Selections
                    </div>
                    </div>
                    <div className="bss-ControlBar_TypesWrapper">
                    <div className="bss-ControlBar_BetslipTypesButton">
                        Singles and Multiples
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}