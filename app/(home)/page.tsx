import AddUserForm from "@/components/add-user-form/add-user-form";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 my-6">
      <AddUserForm />
    </div>
  );
}
