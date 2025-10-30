
export default function MonCard() {

  const spriteSrc = "/Pokemon/TYNAMO.png";
  const stylePoints = Array(6).fill(10);

  return (
    <div
      className="border border-[#b0b0b0] rounded-md shadow flex flex-row min-h-[260px]"
      style={{
        fontFamily: "monospace",
        position: "relative",
        background: "#f8f8f8",
      }}
    >
      {/* Left: Main info */}
      <div className="flex flex-col items-center justify-start flex-1 pt-3 pb-3 px-4">
        <div className="text-[16px] font-bold text-[#444] mb-1">Tynamo</div>
        <div className="text-[14px] text-[#444] mb-1">Lv. 13</div>
        <img
          src={spriteSrc}
          alt="Tynamo"
          className="w-[80px] h-[80px] mb-2"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="text-[14px] text-[#2a7fc1] mb-1">Oran Berry</div>
        <div className="text-[14px] text-[#7a5ca1] mb-1">Frustrate</div>
        <div className="flex flex-col items-center w-full px-4 mb-1 space-y-[2px]">
          <div className="text-[14px] text-[#444]">Nasty Nip</div>
          <div className="text-[14px] text-[#444]">Growl</div>
          <div className="text-[14px] text-[#444]">Jolt</div>
          <div className="text-[14px] text-[#444]">Bite</div>
        </div>
      </div>

      {/* Right: Style Points (now right-aligned with border on the outside) */}
      <div className="flex flex-col justify-end items-center bg-[#d8d8d8] rounded-r-md px-4 pb-2 border-r-[2px] border-[#222]">
        {stylePoints.map((sp, i) => (
          <div
            key={i}
            className="text-[14px] text-[#444] font-bold my-[3px] leading-none"
          >
            {sp}
          </div>
        ))}
      </div>
    </div>
  );
}
