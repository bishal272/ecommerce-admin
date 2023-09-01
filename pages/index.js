import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function index() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between items-center">
        <h1>Overview</h1>

        <div className="flex flex-col bg-gray-300 gap-1 text-black rounded-full overflow-hidden w-14">
          <img src={session?.user.image} alt="" className="" />
          {/* <span className="px-2">{session?.user.name}</span> */}
        </div>
      </div>
      <div className="border border-b border-gray-500 my-2"></div>
      <h2>
        Hello,<b>{session?.user.name}</b>
      </h2>
    </Layout>
  );
}
