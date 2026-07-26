import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://kirmandapa.vercel.app';
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-5 sm:p-10">
      <img src="/assets/error.png" alt="Under Maintenance" className="max-w-lg w-full mb-8" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Under Maintenance</h1>
      <p className="text-gray-500 text-center">
        Website ini sedang dalam perbaikan.
      </p>
    </div>
  );
}

export default App;
