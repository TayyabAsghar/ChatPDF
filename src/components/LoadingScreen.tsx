const LoadingScreen = () => {
  const DivPositions = [
    "-ml-[47px] -mt-[15px] r1",
    "-ml-[31px] -mt-[43px] r1",
    "ml-[1px] -mt-[43px] r1",
    "ml-[17px] -mt-[15px] r1",
    "-ml-[31px] mt-[13px] r1",
    "ml-[1px] mt-[13px] r1",

    "-ml-[63px] -mt-[43px] r2",
    "ml-[33px] -mt-[43px] r2",
    "-ml-[15px] mt-[41px] r2",
    "-ml-[63px] mt-[13px] r2",
    "ml-[33px] mt-[13px] r2",
    "-ml-[15px] -mt-[71px] r2",
    "-ml-[47px] -mt-[71px] r2",
    "ml-[17px] -mt-[71px] r2",
    "-ml-[47px] mt-[41px] r2",
    "ml-[17px] mt-[41px] r2",
    "-ml-[79px] -mt-[15px] r2",
    "ml-[49px] -mt-[15px] r2",

    "-ml-[63px] -mt-[99px] r3",
    "ml-[33px] -mt-[99px] r3",
    "ml-[1px] -mt-[99px] r3",
    "-ml-[31px] -mt-[99px] r3",
    "-ml-[63px] mt-[69px] r3",
    "ml-[33px] mt-[69px] r3",
    "ml-[1px] mt-[69px] r3",
    "-ml-[31px] mt-[69px] r3",
    "-ml-[79px] -mt-[15px] r3",
    "-ml-[95px] -mt-[43px] r3",
    "-ml-[95px] mt-[13px] r3",
    "ml-[49px] mt-[41px] r3",
    "-ml-[79px] -mt-[71px] r3",
    "-ml-[111px] -mt-[15px] r3",
    "ml-[65px] -mt-[43px] r3",
    "ml-[65px] mt-[13px] r3",
    "-ml-[79px] mt-[41px] r3",
    "ml-[49px] -mt-[71px] r3",
    "ml-[81px] -mt-[15px] r3",
  ];

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-bl from-white to-indigo-600">
      <div className="w-[200px] h-[200px] absolute left-1/2 top-1/2 -ml-[100px] -mt-[100px]">
        <div className="gel center-gel">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>

        {DivPositions.map((className, _index) => (
          <div key={_index} className={`gel ${className}`}>
            <div className="hex-brick h1"></div>
            <div className="hex-brick h2"></div>
            <div className="hex-brick h3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
