const SkeletonPost = () => {
  return (
    <div className='flex p-3 bg-white w-[60vw] mt-3 h-[300px] rounded-lg text-gray-700 animate-fade-in text-[15px]'>
      <section className='w-[60%]  animate-pulse flex flex-col '>
        <div className='flex '>
          <div className='mr-3 w-[140px] h-[120px] bg-gray-300 rounded-md' />
          <ul className="w-full flex flex-col gap-y-2">
            <text className='text-[16px] font-medium'></text>
            {Array(4).fill(0).map((i: number) => <li key={i} className='h-4 w-9/12 rounded-md bg-gray-300'> </li>)}
          </ul>
        </div>

        <ul className="mt-10 flex flex-col gap-y-5">
          {Array(3).fill(0).map((i: number) => <li key={i} className="h-4 w-10/12 bg-gray-300 rounded-md"></li>)}
        </ul>
      </section>
      <div className='w-[50%] flex flex-col gap-y-3'>
        <div className="h-3 w-11/12 rounded-md bg-gray-300 "></div>
        <div className="h-3 w-10/12 rounded-md bg-gray-300 "></div>
        <div className="h-3 w-9/12 rounded-md bg-gray-300 "></div>
        <div className="h-3 w-9/12 rounded-md bg-gray-300 "></div>
      </div>
    </div>
  );
};

export default SkeletonPost