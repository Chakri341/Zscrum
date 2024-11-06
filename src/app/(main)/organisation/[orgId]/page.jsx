import { getOrganization } from "@/actions/organisations";
import OrganisationSwitcher from "@/components/OrganisationSwitcher/OrganisationSwitcher";
import React from "react";
import ProjectList from "./_components/projectsList";
import UserIssues from "./_components/userIssues";
import { auth } from "@clerk/nextjs/server";

const page = async ({ params }) => {
  const { orgId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const organisation = await getOrganization(orgId);

  if (!organisation) {
    return <div>Organisation not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <div class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
          {organisation.name}'s Projects
        </div>

        <OrganisationSwitcher />
      </div>
      <div className="mb-4">
        <ProjectList orgId={organisation.id} />
      </div>
      <div className="mt-8">
        <UserIssues userId={userId} />
      </div>
    </div>
  );
};

export default page;
