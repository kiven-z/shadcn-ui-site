import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { router } from '@/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
