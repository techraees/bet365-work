import React from 'react'

type Props = {}

const stylesForShoreMore = {
    maskSize: "5px 8px",
    maskRepeat: "no-repeat",
    '--mixin-svg-inlined': `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 13'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M1.284 12.5L.5 11.743 5.931 6.5.5 1.257 1.284.5l5.432 5.243.784.757-.784.757z'/%3E%3C/svg%3E")`,
    WebkitMaskImage: 'var(--mixin-svg-inlined)',
    maskImage: 'var(--mixin-svg-inlined)',
} as React.CSSProperties;

export default function PodLoaderItem({}: Props) {
  return (
    <div>
      <div className='bg-transparent pb-5'>
        <div className='flex items-center h-[55px] text-[17px] leading-5 text-[color(display-p3_0.157_1_0.733)] font-bold px-[30px] py-0'>
          <div className='mr-auto'>Features</div>
          <div className='text-[11px] leading-[13px] text-[#ddd] font-bold align-middle flex items-baseline cursor-pointer relative ml-2.5 before:content-[""] before:block before:h-[55px] before:w-full before:absolute before:-translate-x-2/4 before:-translate-y-2/4 before:left-2/4 before:top-2/4'>
            Show more
            <div className='block bg-white min-w-[5px] h-2 ml-1' style={stylesForShoreMore}></div>
          </div>
        </div>
        <div className='relative overflow-hidden w-full m-0 px-[30px] py-0' style={{ transform: "translateZ(0)"}}>
          <div className='hidden w-[30px] h-full cursor-pointer absolute z-[1] transition-all duration-[0.2s] ease-[ease] opacity-0 invisible left-0 top-0'></div>
          <div className='flex overflow-y-hidden pl-0' style={{ scrollSnapType: "x mandatory", WebkitScrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch"}}>
            <div className='transition-[left] duration-[0.35s] text-[0] w-full flex relative items-start left-0'>
              <div className='bg-[url(/home/images/Home/imgs/V9Features/pbb\_Feature-Match-Live\_eng.webp)] flex-[1_0_calc(50%_-_2.5px)] min-w-[350px] h-full min-h-[265px] cursor-pointer relative overflow-hidden bg-[#1f1f1f] bg-[auto_250px] bg-top bg-no-repeat snap-start mr-0 scroll-ml-[30px] rounded-[5px] before:content-[""] before:block before:h-[250px] before:w-[500px] before:absolute before:bg-[linear-gradient(90deg,#1f1f1f_0,transparent_100px,transparent_400px,#1f1f1f)] before:-translate-x-2/4 before:left-2/4 before:top-0'>
                <div className='relative pt-[225px] pb-[15px] px-2.5'>
                  <div className='h-[60px] flex justify-center'>
                    <div className='bg-[url(/home/images/Home/imgs/V9Icons/Match\_Live.svg)] w-full bg-no-repeat bg-[50%]'></div>
                  </div>
                  <div className='w-full text-sm leading-[23px] text-[color(display-p3_0.157_1_0.733)] font-bold uppercase text-center'>MATCH LIVE</div>
                  <div className='w-full text-[22px] leading-7 text-white font-bold text-center mb-[15px]'>
                    Follow the action as it happens
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='hidden w-[30px] h-full cursor-pointer absolute z-[1] transition-all duration-[0.2s] ease-[ease] opacity-0 invisible right-0 top-0'></div>
        </div>
      </div>
    </div>
  );
}