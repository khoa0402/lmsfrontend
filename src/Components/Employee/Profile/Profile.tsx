import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { departments } from "../../../Data/DropdownData";
import { formatDate } from "../../../Utility/DateUtility";
import { useForm } from "@mantine/form";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import {
  getEmployee,
  updateEmployee,
} from "../../../Service/EmployeeProfileService";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [editMode, setEdit] = useState(false);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    getEmployee(user.profileId)
      .then((data) => {
        setProfile({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.profileId]);
  const form = useForm({
    initialValues: {
      dob: "",
      phone: "",
      address: "",
      idNumber: "",
      department: "",
    },
    validate: {
      dob: (value: any) => (!value ? "Date of Birth is required" : undefined),
      phone: (value: any) => (!value ? "Phone is required" : undefined),
      address: (value: any) => (!value ? "Address is required" : undefined),
      idNumber: (value: any) => (!value ? "ID Number is required" : undefined),
      department: (value: any) =>
        !value ? "Department is required" : undefined,
    },
  });
  const handleEdit = () => {
    form.setValues({
      ...profile,
      dob: profile.dob ? new Date(profile.dob) : undefined,
    });
    setEdit(true);
  };
  const handleSubmit = (e: any) => {
    let values = form.getValues();
    form.validate();
    if (!form.isValid()) return;
    updateEmployee({ ...profile, ...values })
      .then((data) => {
        successNotification("Profile updated successfully.");
        setProfile({ ...profile, ...values });
        setEdit(false);
      })
      .catch((error) => {
        errorNotification(error.response.data.errorMessage);
      });
  };
  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              variant="filled"
              src="/download.jpg"
              size={120}
              alt="it's me"
            />
            {editMode && (
              <Button onClick={open} variant="filled">
                Upload
              </Button>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">
              {user.name}
            </div>
            <div className="text-base text-neutral-700">{user.email}</div>
          </div>
        </div>
        {!editMode ? (
          <Button
            type="button"
            onClick={handleEdit}
            variant="filled"
            leftSection={<IconEdit />}
          >
            Edit
          </Button>
        ) : (
          <Button onClick={handleSubmit} type="submit" variant="filled">
            Submit
          </Button>
        )}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-2xl font-bold text-neutral-900 mb-4">
          Personal Information
        </div>
        <Table
          striped
          stripedColor="gray"
          verticalSpacing="sm"
          withColumnBorders={false}
        >
          <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
            <Table.Tr>
              <Table.Td className="font-medium text-lg">
                Date of Birth:
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <DateInput
                    {...form.getInputProps("dob")}
                    placeholder="Date of Birth"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">
                  {formatDate(profile.dob) ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-lg">Phone:</Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <NumberInput
                    {...form.getInputProps("phone")}
                    maxLength={10}
                    clampBehavior="strict"
                    placeholder="Phone"
                    hideControls
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">{profile.phone ?? "-"}</Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-lg">Address:</Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <TextInput
                    {...form.getInputProps("address")}
                    placeholder="Address"
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">
                  {profile.address ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-lg">ID Number:</Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <NumberInput
                    {...form.getInputProps("idNumber")}
                    maxLength={12}
                    clampBehavior="strict"
                    placeholder="ID Number"
                    hideControls
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">
                  {profile.idNumber ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-lg">Department:</Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <Select
                    {...form.getInputProps("department")}
                    placeholder="Department"
                    data={departments}
                  />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">
                  {profile.department ?? "-"}
                </Table.Td>
              )}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-lg">Role:</Table.Td>
              {editMode ? (
                <Table.Td className="text-lg">
                  <TextInput placeholder="Role" />
                </Table.Td>
              ) : (
                <Table.Td className="text-lg">{user.role}</Table.Td>
              )}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <span className="text-lg font-bold">Upload Profile Picture</span>
        }
        centered
      ></Modal>
    </div>
  );
};

export default Profile;
