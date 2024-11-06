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
  }, [organization]);

  return (
    <div className="flex justify-center items-center p-14 ">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectOrganizationUrl="/organization/:slug"
      />
    </div>
  );
};

export default page;
