import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SegmentPanel from "./components/SegmentPanel";
import { IoIosArrowBack } from "react-icons/io";

function App() {
  const [segmentPanelOpen, setSegmentPanelOpen] = useState(false);

  return (
    <>
      <div className='segment-header'>
          <IoIosArrowBack height="2rem" width= "1.5rem"/>
          <span>&nbsp;&nbsp;View Audience</span>
      </div>
      {/* <h1>Segment App</h1> */}
      <div className="card">
        <button className="save-seg-but" onClick={() => setSegmentPanelOpen(true)}>Save Segment</button>
        {segmentPanelOpen ? (
          <SegmentPanel setSegmentPanelOpen={setSegmentPanelOpen} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
