import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SuccessOverlay from './components/SuccessOverlay';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5 sm:p-10">
      <RegistrationForm onSuccess={() => setIsSuccess(true)} />
      <SuccessOverlay isVisible={isSuccess} />
    </div>
  );
}

export default App;
