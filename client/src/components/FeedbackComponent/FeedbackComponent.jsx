import React, { useState } from "react";
import "./feedback.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";

export default function FeedbackComponent() {
  const [feedbackShow, setFeedBackShow] = useState(false);

  const showFeedback = () => setFeedBackShow(true);
  const hideFeedback = () => setFeedBackShow(false);
  return (
    <div>
      {feedbackShow ? (
        <div className="feedback">
          <div className="text-right">
            <IoIosCloseCircleOutline size={30} onClick={hideFeedback} />
          </div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSckEh66cRLKRhcvFYAn0wVgDGNZUKktBgJTIVXnTAx6pMTDrw/viewform?embedded=true"
            width="400"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Feedback
          </iframe>
          </div>
          
      ) : (
        <RiFeedbackLine
          size={30}
          onClick={showFeedback}
          className="feedbackBtn"
        />
      )}
    </div>
  );
}
