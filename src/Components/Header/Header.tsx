import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJwt } from "../../Slices/JwtSlice";
import { removeUser } from "../../Slices/UserSlice";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../Service/NotificationService";
import { formatDateWithTime } from "../../Utility/DateUtility";
import ProfileIcon from "./ProfileIcon";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state: any) => state.jwt);
  const user = useSelector((state: any) => state.user);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [menuOpened, setMenuOpened] = useState(false);

  //Chỉ load thông báo nếu role là ROLE_EMPLOYEE
  const loadNotifications = async () => {
    if (user?.role !== "ROLE_EMPLOYEE") return;

    try {
      const data = await getNotifications();
      //Hiển thị thông báo mới nhất lên TRÊN CÙNG
      const sorted = (data?.data || []).sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sorted);
      setUnreadCount(data?.unreadCount || 0);
    } catch (err) {
      console.error("Failed loading notifications", err);
    }
  };

  useEffect(() => {
    if (user?.role === "ROLE_EMPLOYEE") {
      loadNotifications();
      const timer = setInterval(loadNotifications, 30000);
      return () => clearInterval(timer);
    }
  }, [user?.role]);

  // Nhấn vào 1 thông báo
  const handleClickNotification = async (n: any) => {
    // Đánh dấu riêng thông báo đó đã đọc
    if (!n.isRead) {
      try {
        await markNotificationAsRead([n.id]);
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === n.id ? { ...item, isRead: true } : item
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error("Failed mark read", err);
      }
    }

    //Tất cả thông báo đều điều hướng đến trang này
    navigate("/role_employee/leave-requests");
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const handleLogout = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
  };

  return (
    <div className="flex items-center justify-between w-full h-14 bg-teal-600 shadow-cyan-700/50 shadow-lg px-3">
      <div>{jwt && <ProfileIcon />}</div>

      <div className="flex items-center gap-3">
        {user?.role === "ROLE_EMPLOYEE" && (
          <Menu
            onOpen={() => setMenuOpened(true)}
            onClose={() => setMenuOpened(false)}
            opened={menuOpened}
            position="bottom-end"
          >
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="white"
                size="lg"
                aria-label="Notifications"
                style={{ position: "relative" }}
              >
                <IconBell stroke={1.75} style={{ width: 22, height: 22 }} />
                {unreadCount > 0 && (
                  <Badge
                    color="red"
                    size="xs"
                    variant="filled"
                    style={{
                      position: "absolute",
                      top: 1,
                      right: 2,
                      minWidth: 16,
                      height: 16,
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <div style={{ width: 360, maxWidth: "90vw" }}>
                <Group justify="space-between" px="sm" py="xs">
                  <Text fw={600}>Notifications</Text>
                  <Button
                    variant="subtle"
                    size="xs"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all read
                  </Button>
                </Group>

                <ScrollArea style={{ height: 300 }}>
                  {notifications.length === 0 ? (
                    <Text size="sm" px="sm" py="xs">
                      No notifications
                    </Text>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: 12,
                          borderBottom: "1px solid #eee",
                          background: n.isRead ? "transparent" : "#f5faff",
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
                            <Text size="sm" fw={600}>
                              {n.message}
                            </Text>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <Text size="xs" color="dimmed">
                              {formatDateWithTime(n.createdAt)}
                            </Text>
                            {!n.isRead && (
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
                    ))
                  )}
                </ScrollArea>
              </div>
            </Menu.Dropdown>
          </Menu>
        )}

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
