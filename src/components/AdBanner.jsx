import React, { useEffect } from "react";

export default function AdBanner({id}) {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      window.googletag
        .defineSlot(
          "/6355419/Travel/Europe/France/Paris",
          [300, 250],
          id
        )
        .addService(window.googletag.pubads());
      window.googletag.enableServices();
      window.googletag.display(id);
    });
  }, [id]);

  return (
    <div id={id} className="flex justify-center items-center bg-gray-200 w-full h-64"/>
  );
}
