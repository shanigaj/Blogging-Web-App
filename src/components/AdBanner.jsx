import React, { useEffect, useRef } from "react";

export default function AdBanner({ 
  id, 
  adUnitPath = "/6355419/Travel/Europe/France/Paris", 
  width = 728,
  height = 90,
  className = "" 
}) {
  const isLoaded = useRef(false);

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      if (!isLoaded.current) {
        window.googletag
          .defineSlot(adUnitPath, [width, height], id)
          .addService(window.googletag.pubads());
        window.googletag.enableServices();
        window.googletag.display(id);
        isLoaded.current = true;
      }
    });
  }, [id, adUnitPath, width, height]);

  return (
    <div 
      className={`relative flex justify-center items-center bg-gray-50 border border-dashed border-gray-300 text-gray-400 rounded overflow-hidden ${className}`}
      style={{ minHeight: height, minWidth: width > 0 ? width : 'auto' }}
    >
      <div id={id} className="flex flex-col justify-center items-center w-full h-full p-2">
        <span className="text-[10px] font-semibold tracking-wider uppercase">Advertisement</span> 
        <span className="text-[10px] opacity-70">{width}x{height}</span>
      </div>
    </div>
  );
}
