import React from "react";
import { modals } from "@mantine/modals";
import ProfileEditForm from "./profileEditForm";

export const ProfileDataEditionModal = () => modals.open({
  title: "Edit your profile",
  children: <ProfileEditForm />
})

export default ProfileDataEditionModal;
