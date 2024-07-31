export default function ProgressBar() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          02:00
        </span>
      </div>
      <div className="relative w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2">
        <div className="bg-secondary h-2 w-full rounded-lg"></div>
        <div className="bg-black h-2 w-[10%] rounded-lg absolute top-0"></div>
      </div>
      <div className="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
        <span className="text-xs text-gray-700 uppercase font-medium pl-2">
          04:00
        </span>
      </div>
    </div>
  );
}
