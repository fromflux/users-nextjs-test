import Link from "next/link";
import { TUserDTO } from "./types";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { ChevronRightIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Users() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  const users = await res.json() as Array<TUserDTO>;

  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-xl font-semibold mb-6">Users</h1>
      <ul className="flex flex-col gap-4">
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <Item variant="outline">
                <ItemContent>
                  {user.fullname}
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </Item>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
