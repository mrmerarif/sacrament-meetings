export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  });
  
  return (
  <header className="bg-blue-600 py-4 text-white shadow-md">
  <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4">
  <h1 className="text-2xl font-bold">West Valley Ward</h1>
  <span className="text-sm sm:text-base">{today}</span>
  </div>
  </header>
  );
  }