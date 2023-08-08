import React from "react";
interface SoccerSubcategoryHeaderProps {
    subcategory?: string;
}

const SoccerSubcategoryHeader: React.FC<SoccerSubcategoryHeaderProps> = ({ subcategory }) => {

    if (subcategory === "fulltimeResult") {
        return (<>
            <div className="flex items-center justify-center">1</div>
            <div className="flex items-center justify-center">X</div>
            <div className="flex items-center justify-center">2</div>
            <div className="flex items-center justify-center"></div>
        </>)
    } else if (subcategory === "matchGoals" || subcategory === "goalLineInPlay") {
        return (<>
            <div className="col-span-3 flex">
                <div className="flex flex-1 items-center justify-center">Over</div>
                <div className="flex flex-1 items-center justify-center">Under</div>
            </div>
            <div className="flex items-center justify-center"></div>
        </>
        )
    } else if (subcategory === "asianHandicapInPlay") {
        return (<>
            <div className="col-span-3 flex">
                <div className="flex flex-1 items-center justify-center">1</div>
                <div className="flex flex-1 items-center justify-center">2</div>
            </div>
            <div className="flex items-center justify-center"></div>
        </>
        )
    } else {
        return (<>
            <div className="flex items-center justify-center">1</div>
            <div className="flex items-center justify-center">X</div>
            <div className="flex items-center justify-center">2</div>
            <div className="flex items-center justify-center"></div>
        </>)
    }


}


export default SoccerSubcategoryHeader;