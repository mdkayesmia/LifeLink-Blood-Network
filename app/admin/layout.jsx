import AdminSidebar from "@/components/AdminSidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex">

      <AdminSidebar />

      <main className="flex-1 bg-gray-100 min-h-screen p-6">
       
        {children}
      </main>

    </div>
  );
}