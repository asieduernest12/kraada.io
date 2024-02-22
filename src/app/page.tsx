import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const items = Array(14)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `item ${i}`,
    price: i * 10,
    description: `this is item ${i}`,
    image: `https://picsum.photos/id/870/1920/500?grayscale&blur=2`,
  }));

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex h-[100%] min-h-screen flex-col">
      <nav className="sticky top-0  bg-cyan-300 z-index-5 shadow-sm shadow-orange-200">
        <ul className="flex flex-row gap-2 p-2 text-2xl uppercase">
          <div className="left-nav-items flex gap-2">
            <li>home</li>
          </div>
          <div className="flex flex-grow gap-2"></div>

          <div className="right-nav-items flex gap-2">
            <li>join waitlist</li>
            <li>checkout</li>
          </div>
        </ul>
      </nav>

      {/* main content area with scroll prallax for items */}
      <section className="flex flex-grow snap-mandatory snap-y overflow-scroll snap-always flex-col gap-4 bg-green-200 p-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/item/${item.id}`}
            className="flex min-h-full snap-start flex-row gap-2 rounded-md bg-white p-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[100%] snap-start object-cover object-center"
            />
            {/* <div className="flex flex-col gap-2">
              <h2 className="text-2xl">{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div> */}
          </Link>
        ))}
      </section>

      <footer className="footer bg-cyan-100 p-2 text-2xl">footer</footer>
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
