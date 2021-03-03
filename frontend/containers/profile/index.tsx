import { ProfileCard } from "@/components/Profile/ProfileCard";
import React from "react";
import { Wrapper, Info, Ads } from "./styles";
import { Reviews } from "@/components/Review/Reviews";
import { ProfileDev } from "@/components/Profile/ProfileDev";
import { ProfileMentor } from "@/components/Profile/ProfileMentor";

export const ProfileContainer = () => {
  return (
    <Wrapper>
      <Info>
        <ProfileCard />
        <Reviews />
      </Info>
      <Ads>
        <ProfileDev />
        <ProfileMentor />
      </Ads>
    </Wrapper>
  );
};
