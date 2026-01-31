import AddUserForm from "@/components/add-user-form/add-user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 my-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-semibold">Add a user</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
