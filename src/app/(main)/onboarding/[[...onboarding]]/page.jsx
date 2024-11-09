"use client";
import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { organization } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (organization) {
      router.push(`/organisation/${organization.slug}`);
    }
  }, [organization, router]);

  return (
    <div className="flex justify-center items-center p-14 ">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organisation/:slug"
        afterSelectOrganizationUrl="/organisation/:slug"
      />
    </div>
  );
};

export default page;
