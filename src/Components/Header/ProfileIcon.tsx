import { Menu, Text, Avatar } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";

const ProfileIcon = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar src="/download.jpg" size="md" alt="it's me" />
          <span className="font-semibold text-black">{user.name}</span>
        </div>
      </Menu.Target>
    </Menu>
  );
};

export default ProfileIcon;
