import TeamMain from "@/components/layout/main/TeamMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { buildNoIndexMetadata } from "@/libs/seo";
import React from "react";

export const metadata = buildNoIndexMetadata("Team");

const Team = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <TeamMain />
    </PageWrapper>
  );
};

export default Team;
