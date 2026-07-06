
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">

   

        <main className="flex-1 p-8">
          {children}
        </main>

     

    </div>
  );
}