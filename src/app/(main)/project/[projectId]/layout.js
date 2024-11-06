import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default async function ProjectLayout({ children }) {
  return (
    <div className="mx-auto bg-gray-50 p-2 ">
      <Suspense fallback={<BarLoader width={"100%"} color="#36d7b7" />}>
        {children}
      </Suspense>
    </div>
  );
}