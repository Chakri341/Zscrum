"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/lib/validate";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import OrganisationSwitcher from "@/components/OrganisationSwitcher/OrganisationSwitcher";
import { toast } from "sonner";

export default function CreateProjectPage() {
  const router = useRouter();

  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

    createProjectFn(data);
  };

  useEffect(() => {
    if (project) {
      toast.success("Project created Sucessfully")
      router.push(`/project/${project.id}`);
    }
  }, [loading]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">
          Oops! Only Admins can create projects.
        </span>
        <OrganisationSwitcher/>
      </div>
    );
  }

  
  return (
    <div className="container mx-auto py-10 bg-gray-50 shadow-lg rounded-lg p-8 w-3/4 md:w-1/2">
      <h1 className="text-5xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div>
          <Input
            id="name"
            {...register("name")}
            className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            placeholder="Project Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            id="key"
            {...register("key")}
            className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            placeholder="Project Key (Ex: RCYT)"
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>
        <div>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm h-28 focus:border-blue-400 focus:ring focus:ring-blue-200"
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        )}
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition-all duration-200"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
