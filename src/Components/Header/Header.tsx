import React, { useEffect, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  ScrollArea,
} from "@mantine/core";
import { IconBell, IconMenu2 } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJwt } from "../../Slices/JwtSlice";
import { removeUser } from "../../Slices/UserSlice";
import { Text } from "@mantine/core";
import {
  getNotificationsByUser,
  markAllAsRead,
  markNotificationAsRead,
} from "../../Service/NotificationService";
import { formatDateWithTime } from "../../Utility/DateUtility";

const Header = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state: any) => state.jwt);
  const user = useSelector((state: any) => state.user);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();

  const loadNotifications = () => {
    if (!user?.profileId || !user?.role) return;

    getNotificationsByUser(user.profileId, user.role)
      .then((data) => {
        setNotifications(data || []);
        setUnreadCount((data || []).filter((n: any) => !n.read).length);
      })
      .catch((err) => console.error("Failed loading notifications", err));
  };

  useEffect(() => {
    loadNotifications();
    const timer = setInterval(loadNotifications, 30000);
    return () => clearInterval(timer);
  }, [user?.profileId]);

  const handleOpenMenu = () => {
    setMenuOpened(true);
  };

  const handleCloseMenu = () => {
    setMenuOpened(false);
  };

  const handleClickNotification = (n: any) => {
    if (!n.read) {
      markNotificationAsRead(n.id)
        .then(() => {
          setNotifications((prev) =>
            prev.map((item) =>
              item.id === n.id ? { ...item, read: true } : item
            )
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));
        })
        .catch((err) => console.error("Failed mark read", err));
    }
    if (n.url) {
      window.location.href = n.url;
    }
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch(removeJwt());
    dispatch(removeUser());
  };
  return (
    <div className="flex items-center justify-between w-full h-14 bg-teal-600 shadow-cyan-700/50 shadow-lg px-3">
      <div className="">
        {jwt && (
          <>
            <ProfileIcon />
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Menu
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          opened={menuOpened}
          position="bottom-end"
        >
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="white"
              size="lg"
              aria-label="Notifications"
            >
              <div style={{ position: "relative" }}>
                <IconBell
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.75}
                />
                {unreadCount > 0 && (
                  <Badge
                    color="red"
                    size="sm"
                    variant="filled"
                    style={{ position: "absolute", top: -6, right: -6 }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <div style={{ width: 360, maxWidth: "90vw" }}>
              <Group justify="space-between" px="sm" py="xs">
                <Text fw={600}>Notifications</Text>
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => {
                    if (!user?.profileId) return;
                    markAllAsRead(user.profileId)
                      .then(() => {
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, read: true }))
                        );
                        setUnreadCount(0);
                      })
                      .catch(() => {});
                  }}
                >
                  Mark all read
                </Button>
              </Group>
              <ScrollArea style={{ height: 300 }}>
                {notifications.length === 0 && (
                  <Text size="sm" px="sm" py="xs">
                    No notifications
                  </Text>
                )}
                {notifications
                  .slice()
                  .reverse()
                  .map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #eee",
                        background: n.read ? "transparent" : "#f5faff",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickNotification(n)}
                    >
                      <Group
                        justify="space-between"
                        align="flex-start"
                        wrap="nowrap"
                      >
                        <div>
                          <Text size="sm" fw={700}>
                            {n.senderName || "System"}{" "}
                            <Text span size="xs" color="dimmed">
                              {" "}
                              — {n.title}
                            </Text>
                          </Text>
                          <Text size="sm">{n.message}</Text>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Text size="xs" color="dimmed">
                            {formatDateWithTime(n.createdAt)}
                          </Text>
                          {!n.read && (
                            <Badge
                              size="xs"
                              color="blue"
                              style={{ marginTop: 6 }}
                            >
                              New
                            </Badge>
                          )}
                        </div>
                      </Group>
                    </div>
                  ))}
              </ScrollArea>
            </div>
          </Menu.Dropdown>
        </Menu>

        {jwt ? (
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
