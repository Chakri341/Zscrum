"use client";

import React from 'react'
import { usePathname } from "next/navigation";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";


const OrganisationSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (!isLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <div className="flex justify-end mt-1 bg-gray-100 rounded-md">
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
          }
          afterCreateOrganizationUrl="/organisation/:slug"
          afterSelectOrganizationUrl="/organisation/:slug"
          createOrganizationUrl="/onboarding"
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "border border-gray-300 rounded-md px-5 py-2",
              organizationSwitcherTriggerIcon: "black",
            },
          }}
        />
      </SignedIn>
    </div>
  );
}

export default OrganisationSwitcher
