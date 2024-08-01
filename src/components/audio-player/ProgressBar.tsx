import { useState } from "react";

export default function ProgressBar() {
  const [value, setValue] = useState("0");
  return (
    <div className="flex w-full justify-center p-3 items-center">
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          02:00
        </span>
      </div>
      <div className="flex w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2">
        <input
          className="w-full accent-black cursor-pointer"
          type="range"
          min="0"
          defaultValue="0"
          max="100"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            console.log(value);
          }}
        //onMouseDown={this.handleMouseDownSeek}
        //onMouseUp={this.handleMouseUpSeek}
        />
      </div>
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          04:00
        </span>
      </div>
    </div>
  );
}
