import React, { useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
import { ActionIcon, Button } from "@mantine/core";
import { IconBell, IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJwt } from "../../Slices/JwtSlice";
import { removeUser } from "../../Slices/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state: any) => state.jwt);
  const handleLogout = () => {
    console.log("logout");
    dispatch(removeJwt());
    dispatch(removeUser());
  };
  return (
    <div className="flex items-center justify-between w-full h-14 bg-teal-600 shadow-cyan-700/50 shadow-lg px-3">
      <ActionIcon
        variant="subtle"
        color="white"
        size="lg"
        aria-label="Settings"
      >
        <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.75} />
      </ActionIcon>
      <div className="flex items-center gap-3">
        {jwt ? (
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        {jwt && (
          <>
            <ActionIcon
              variant="subtle"
              color="white"
              size="lg"
              aria-label="Settings"
            >
              <IconBell style={{ width: "70%", height: "70%" }} stroke={1.75} />
            </ActionIcon>
            <ProfileIcon />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
