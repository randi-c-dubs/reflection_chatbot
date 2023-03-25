import { useEffect, useRef } from "react";

import scratchblocks from "scratchblocks";

const ScratchWidget = ({ scratchCode }) => {
  const ref = useRef(null);
  useEffect(() => {
    // parse the code into an svg
    const doc = scratchblocks.parse(scratchCode);
    const svg = scratchblocks.render(doc, {style: "scratch3", scale:0.7});

    // render and display the svg
    ref.current.innerHTML = "";
    ref.current.appendChild(svg);
  }, []);

  return <div ref={ref}></div>;
};

export default ScratchWidget;
