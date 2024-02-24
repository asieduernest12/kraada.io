import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const genItems = () => Array(14)
  .fill(null)
  .map((_, i) => ({
    id: i, name: `item ${i}`, price: i * 10, description: `this is item ${i}`, image: `https://picsum.photos/id/870/1920/500?grayscale&blur=2`,
  }));

const items = [
  //monday
  { name: "monday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/41201a6c-b96d-4f13-a7d9-c0b6a1b56e1e/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "monday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/8f00bdf0-5317-441d-8b7b-9918218cccfe/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "tuesday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/f42b151e-ecf4-4126-b3bf-5fa4eaa78ed5/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "tuesday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/eb1ee673-49d9-44ee-8a9f-4e5707612a72/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "wednesday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/94a1db75-7415-4647-9131-84d60661343d/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "wednesday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/9293df45-2acb-4670-9e7c-9d4e4cd83560/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "thursday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/4026422c-cc9a-44f6-b7df-87ca9d294d9e/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "thursday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/65bb4df4-ab5b-437e-8023-b5e551c972f0/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Friday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/42411018-f3c0-4ab6-9044-0b24634d3183/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Friday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/df319ec9-890f-4378-95a6-9f876ebb79c0/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Saturday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/355794c7-56de-450b-8ee3-35ab94a332f3/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Saturday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/2eb26104-7f4c-4179-a311-a9bf970d154c/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Sunday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/4570d4c8-fc8c-44f5-9c68-b34fd3e97ab7/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
  { name: "Sunday black", price: 100, description: "this is a black monday", image: "https://dynamic.bonfireassets.com/thumb/design-image/41201a6c-b96d-4f13-a7d9-c0b6a1b56e1e/7329f207-b69c-4f7e-8322-9f628fd81358/900/" },
] ?? genItems();



export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="grid h-screen overflow-hidden bg-gray-100">
      <nav className="z-index-5 sticky  top-0 bg-cyan-300 shadow-sm shadow-orange-200">
        <ul className="flex flex-row gap-2 p-2 lg:text-2xl uppercase">
          <div className="left-nav-items flex gap-2">
            <li>thisisyom</li>
          </div>
          <div className="flex flex-grow gap-2"></div>

          <div className="right-nav-items flex gap-2">
            <li>store</li>
          </div>
        </ul>
      </nav>

      {/* main content area with scroll prallax for items */}
      <section className="flex flex-grow snap-y snap-proximity scroll-smooth flex-col gap-4 overflow-y-scroll bg-green-200 p-4">
        {items.map((item) => (
          <Link
            key={item.image}
            href={`/#`}
            className="grid place-content-center min-h-full max-w-full overflow-hidden  snap-center flex-row gap-2 rounded-md bg-white p-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-position-x-center object-position-y-[10px]"
            />
            {/* <div className="flex flex-col gap-2">
              <h2 className="text-2xl">{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div> */}
          </Link>
        ))}
      </section>

      <footer className="footer bg-cyan-100 p-2 lg:text-2xl text-center">yom &copy;</footer>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
