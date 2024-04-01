export default function Seperator() {
  return (
    <div className="w-full relative h-5 flex items-center">
      <div className="h-0.5 bg-NiceGray/80 w-[70%] m-auto"></div>
      <div className="absolute w-full h-full flex items-center justify-center">
        <h1 className="w-fit h-fit bg-secondBg z-10 px-2">or</h1>
      </div>
    </div>
  );
}
