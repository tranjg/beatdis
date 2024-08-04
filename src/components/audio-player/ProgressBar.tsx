import { ChangeEventHandler, MouseEvent, FC, useState } from "react";

interface Props {
  min?: number;
  max?: number;
  value?: number;
  buffered?: number;
  onChange?(value: number): void
  onDragStart?(): void;
  onDragEnd?(value: number): void;
}

const ProgressBar: FC<Props> = ({ min, max, value, buffered, onChange, onDragStart, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return;
    const { value } = e.target
    onChange(+value);
  }

  const handleDragStart = () => {
    if (onDragStart) onDragStart()
    setIsDragging(true)
  }
  const handleDragEnd = (e: MouseEvent<HTMLInputElement>) => {
    if (onDragEnd) onDragEnd(+e.currentTarget.value)
    setIsDragging(false)
  }

  return (
    <div className="flex w-full justify-center p-3 items-center">
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          02:00
        </span>
      </div>
      <div className="flex w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2 relative bg items-center">
        <input
          className="range"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleOnChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          style={{zIndex: isDragging ? 1: 2}}
        />
        {/* buffered value */}
        <div style={{ width: buffered + "%" }} className="absolute h-full bg-secondary rounded-md outline-none"></div>
        {/* actual value */}
        <div style={{ width: value + "%" }} className="absolute h-full bg-primary rounded-md outline-none"></div>
      </div>
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          04:00
        </span>
      </div>
    </div>
  );
}

export default ProgressBar
