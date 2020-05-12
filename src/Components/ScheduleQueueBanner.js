import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import "./Styles/ScheduleQueueBannerStyles.css";
import FbMessageLogoBlue from "../messenger_blue.svg";
import FbPostLogoBlue from "../facebook_blue.svg";

const GRADIENT_BUTTON_LABEL_STYLE = {
  color: "#ffffff",
  textTransform: "none",
  fontSize: "16px",
  padding: "0.5em"
};
const PRIMARY_COLOR = { color: "#177eba" };
const GREY_COLOR = { color: "#666666" };
const ICON_STYLE = {
  width: "1em",
  height: "1em",
  marginRight: "0.5vw"
};

// Banner to display events in queue, and next to be posted
const ScheduleQueueBanner = ({ allEvents, openSelectDateModal }) => {
  let numPosts = 0,
    numMessenger = 0;
  let sortedEvents = allEvents.filter(e => e.date > Date.now()); // Filter out old events
  sortedEvents.forEach(event => {
    if (event.channel === "FACEBOOK POST") {
      numPosts += 1;
    }
    if (event.channel === "FACEBOOK MESSAGE") {
      numMessenger += 1;
    }
  });
  return (
    <div className="header_wrapper">
      <div className="header-left" />
      <div className="header-center">
        <FlatButton
          className="button"
          labelStyle={GRADIENT_BUTTON_LABEL_STYLE}
          onClick={() => {
            let arg = sortedEvents[0]
              ? sortedEvents[0].date // .date???
              : moment().valueOf();
            openSelectDateModal(arg);
          }}
          label={`Next Event: ${
            sortedEvents[0]
              ? moment(sortedEvents[0].date).format("Do MMMM") +
                ` @ ${moment(sortedEvents[0].time).format("LT")}`
              : "No"
          }`}
        />
      </div>
      <div className="header-right">
        <div>
          <h4 style={PRIMARY_COLOR}>Upcoming: </h4>
        </div>
        <div>
          <ul>
            <li style={GREY_COLOR}>
              <img alt="Logo" src={FbPostLogoBlue} style={ICON_STYLE} />
              {numPosts}
            </li>
            <li style={GREY_COLOR}>
              <img alt="Logo" src={FbMessageLogoBlue} style={ICON_STYLE} />
              {numMessenger}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ScheduleQueueBanner.propTypes = {
  totalUpcomingEvents: PropTypes.array,
  nextEvent: PropTypes.object,
  onClick: PropTypes.func
};

export default ScheduleQueueBanner;
