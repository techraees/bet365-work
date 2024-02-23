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
  useEffect(() => {
    setCouponsForPage(coupons.slice(0, 10));
    setTotalPages(Math.max(Math.ceil(coupons.length / 10), 1));
  }, [coupons]);

  useEffect(() => {
    setCouponsForPage(coupons.slice((currentPage - 1) * 10, currentPage * 10));
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
      <div className='overflow-y-auto overflow-x-hidden overscroll-none md:h-[calc(605px_-1px)]'>
        <BetsContainer coupons={couponsForPage}/>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            onClick={onPrev}
            className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 ${currentPage > 1 ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'}`}
          >
            Previous
          </a>
          <a
            onClick={onNext}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 ${currentPage < totalPages ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'}`}
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{Math.min(coupons.length, (currentPage-1) * 10 + 1)}</span> to <span className="font-medium">{Math.min(coupons.length, currentPage * 10)}</span> of{' '}
              <span className="font-medium">{coupons.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                onClick={onPrev}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage > 1 ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Previous</span>
                <Chevron className={`h-5 w-5 fill-black rotate-90`} />
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {
                currentPage > 2 &&
                <a
                  onClick={() => setCurrentPage(1)}
                  aria-current="page"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  1
                </a>
              }
              {
                currentPage > 3 &&
                <a
                  onClick={() => setCurrentPage(2)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
              }
              {
                currentPage > 4 &&
                <a
                  onClick={() => setCurrentPage(3)}
                  className="relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </a>
              }
              {
                currentPage > 5 &&
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
              }
              {
                currentPage > 1 &&
                <a
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  {currentPage - 1}
                </a>
              }
              <a
                className="relative  z-10 inline-flex items-center bg-indigo-600 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
              >
                {currentPage}
              </a>
              {
                currentPage < totalPages &&
                <a
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {currentPage + 1}
                </a>
              }
              {
                currentPage < totalPages - 4 &&
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
              }
              {
                currentPage < totalPages - 3 &&
                <a
                  onClick={() => setCurrentPage(totalPages - 2)}
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  {totalPages - 2}
                </a>
              }
              {
                currentPage < totalPages - 2 &&
                <a
                  onClick={() => setCurrentPage(totalPages - 1)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {totalPages - 1}
                </a>
              }
              {
                currentPage < totalPages - 1 && 
                <a
                  onClick={() => setCurrentPage(totalPages)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {totalPages}
                </a>
              }
              <a
                onClick={onNext}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0  ${currentPage < totalPages ? 'bg-white hover:bg-gray-50' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Next</span>
                <Chevron className={`h-5 w-5 fill-black rotate-[270deg]`} />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}