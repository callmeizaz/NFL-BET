import React from "react";

import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import { styled } from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";

import { ChatButtonIndicatorProps } from "./interfaces";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 10,
    padding: "0 4px",
    textAlign: "center",
    background: "#ff4d4f",
  },
}));

const ChatButtonIndicator = (props: ChatButtonIndicatorProps) => {
  const { unreadCount } = props;
  console.log("🚀 ~ file: index.tsx ~ line 23 ~ ChatButtonIndicator ~ unreadCount", unreadCount)
  return (
    <StyledBadge
      badgeContent={unreadCount}
      // badgeContent={5}
      color="secondary"
      className="absolute bottom-16 right-6 font-black"
    >
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="chat"
        // className="absolute bottom-16 right-6 font-black"
        onClick={() => {
          // setUnreadMessages(0);
          // unreadCount = 0;
          // setChatDrawerOpen(true);
        }}
      >
        <ChatIcon className="mr-2" />
        Chat
      </Fab>
    </StyledBadge>
  );
};
export default ChatButtonIndicator;
