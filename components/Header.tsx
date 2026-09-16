export default function Header() {
    const today = new Date().toLocaleDateString();
  
    return (
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">West Valley Ward</h1>
          <span>{today}</span>
        </div>
      </header>
    );
  }
  