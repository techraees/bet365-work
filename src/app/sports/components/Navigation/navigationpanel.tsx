import React from 'react';
import { navItems, navDropdowns } from './list';
import CustomLink from '@/components/ui/Link';
import { cn } from '@/lib/utils';


const NavigationPanel = () => {

    return (
        <div className='w-full h-full flex text-base flex-col overflow-auto'>
            <div className='text-[#00dfa9] pl-[20px] pr-[10px] pt-[32px] pb-[10px] text-xs font-[700]'>FULL LIST</div>
            <div className='flex flex-col'>
                {navItems?.map((item, index) => {
                    const Icon = item?.icon
                    return (
                        <CustomLink
                            key={index}
                            href={item.link}
                            className="text-sm"
                            activeClassName="text-sm font-[700]"
                        >
                            <div className='pl-5 h-[45px] flex items-center text-[#ddd] hover:bg-[#383838] hover:text-[#fff] cursor-pointer'>
                                {Icon && <Icon className={"h-[18px] w-[18px] saturate-100 mr-[8px]"}/>}
                                <div className='truncate'>{item?.label}</div>
                            </div>

                        </CustomLink>

                    )
                })}
            </div>

        </div >
    )

}

export default NavigationPanel;