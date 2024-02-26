import React, { useEffect, useState } from 'react'
import BetsContainer from './BetsContainer/BetsContainer'
import FeaturesContainer from './FeaturesContainer/FeaturesContainer'
import GamesPodContainer from './GamesPodContainer/GamesPodContainer'
import Chevron from "@/components/ui/icons/chevron";

type Props = {
  coupons: any[]
}

export default function Scroller({coupons}: Props) {
  const [couponsForPage, setCouponsForPage] = useState<any[]>([]);
  const [totalPages, setTotalPages ] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  console.log('@----coupons-----@', coupons);
  useEffect(() => {
    setCouponsForPage(coupons.slice(0, 5));
    setTotalPages(Math.max(Math.ceil(coupons.length / 5), 1));
    setCurrentPage(Math.min(currentPage, totalPages));
  }, [coupons.length]);

  useEffect(() => {
    setCouponsForPage(coupons.slice((currentPage - 1) * 5, currentPage * 5));
  }, [currentPage]);

  const onNext = () => {
    if(currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  }

  const onPrev = () => {
    if(currentPage > 1)
      setCurrentPage(currentPage - 1);
  }

  return (
    <div>
      <div className='overflow-y-auto overflow-x-hidden overscroll-none'>
        <BetsContainer coupons={couponsForPage}/>
      </div>
      { totalPages > 1 &&
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div className='bg-white rounded-full'>
              <a
                onClick={onPrev}
                className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-0 my-auto px-3 py-0 rounded-2xl ${currentPage > 1 ? 'hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer' : 'hover:bg-transparent hover:cursor-default pointer-events-none'}`}
              >
                <div className={`rotate-[-135deg]`}>
                  <div className={`relative inline-block w-[0.4em] h-[0.4em] border-r-[0.12em] border-t-[0.12em] border-solid`}
                    style={{
                      borderTopColor: `rgba(0,0,0,${currentPage > 1 ? '0.87' : '0.43'})`,
                      borderRightColor: `rgba(0,0,0,${currentPage > 1 ? '0.87' : '0.43'})`
                    }}
                  >
                  </div>
                </div>
              </a>
            </div>
            <div className='bg-white rounded-full'>
              <a
                onClick={onNext}
                className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-0 my-auto px-3 py-0 rounded-2xl ${currentPage < totalPages ? 'hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer' : 'hover:bg-transparent hover:cursor-default pointer-events-none'}`}
              >
                <div className={`rotate-45`}>
                  <div className={`relative inline-block w-[0.4em] h-[0.4em] border-r-[0.12em] border-t-[0.12em] border-solid`}
                    style={{
                      borderTopColor: `rgba(0,0,0,${currentPage < totalPages ? '0.87' : '0.43'})`,
                      borderRightColor: `rgba(0,0,0,${currentPage < totalPages ? '0.87' : '0.43'})`
                    }}
                  ></div>
                </div>
              </a>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-full shadow-sm bg-white" aria-label="Pagination">
                <a
                  onClick={onPrev}
                  className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-0 my-auto px-3 py-0 rounded-2xl ${currentPage > 1 ? 'hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer' : 'hover:bg-transparent hover:cursor-default pointer-events-none'}`}
                >
                  <div className={`rotate-[-135deg]`}>
                    <div className={`relative inline-block w-[0.4em] h-[0.4em] border-r-[0.12em] border-t-[0.12em] border-solid`}
                      style={{
                        borderTopColor: `rgba(0,0,0,${currentPage > 1 ? '0.87' : '0.43'})`,
                        borderRightColor: `rgba(0,0,0,${currentPage > 1 ? '0.87' : '0.43'})`
                      }}
                    ></div>
                  </div>
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                {
                  currentPage > 2 &&
                  <a
                    onClick={() => setCurrentPage(1)}
                    aria-current="page"
                    className="h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer"
                  >
                    1
                  </a>
                }
                {
                  currentPage > 3 &&
                  <span className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:h-8 hover:text-center hover:text-[rgba(0,0,0,0.87)] hover:flex hover:box-border hover:items-center hover:tracking-[0.01071em] hover:leading-[1.43] hover:text-[13px] hover:min-w-[32px] hover:bg-transparent hover:cursor-default hover:mx-1 hover:my-auto hover:px-3 hover:py-0 hover:rounded-2xl`}>
                    ...
                  </span>
                }
                {
                  currentPage > 1 &&
                  <a
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer"
                  >
                    {currentPage - 1}
                  </a>
                }
                <a
                  className="h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] bg-[rgba(0,0,0,0.08)] mx-1 my-auto px-3 py-0 rounded-2xl"
                >
                  {currentPage}
                </a>
                {
                  currentPage < totalPages &&
                  <a
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer"
                  >
                    {currentPage + 1}
                  </a>
                }
                {
                  currentPage < totalPages - 2 &&
                  <span className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:h-8 hover:text-center hover:text-[rgba(0,0,0,0.87)] hover:flex hover:box-border hover:items-center hover:tracking-[0.01071em] hover:leading-[1.43] hover:text-[13px] hover:min-w-[32px] hover:bg-transparent hover:cursor-default hover:mx-1 hover:my-auto hover:px-3 hover:py-0 hover:rounded-2xl`}>
                    ...
                  </span>
                }
                {
                  currentPage < totalPages - 1 && 
                  <a
                    onClick={() => setCurrentPage(totalPages)}
                    className="h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-1 my-auto px-3 py-0 rounded-2xl hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer"
                  >
                    {totalPages}
                  </a>
                }
                <a
                  onClick={onNext}
                  className={`h-8 text-center text-[rgba(0,0,0,0.87)] flex box-border items-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] mx-0 my-auto px-3 py-0 rounded-2xl ${currentPage < totalPages ? 'hover:bg-[rgba(0,0,0,0.04)] hover:cursor-pointer' : 'hover:bg-transparent hover:cursor-default pointer-events-none'}`}
                >
                  <div className={`rotate-45`}>
                    <div className={`relative inline-block w-[0.4em] h-[0.4em] border-r-[0.12em] border-t-[0.12em] border-solid`}
                      style={{
                        borderTopColor: `rgba(0,0,0,${currentPage < totalPages ? '0.87' : '0.43'})`,
                        borderRightColor: `rgba(0,0,0,${currentPage < totalPages ? '0.87' : '0.43'})`
                      }}
                    ></div>
                  </div>
                </a>
              </nav>
            </div>
          </div>
        </div>
      }
    </div>
  )
}