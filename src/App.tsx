import { RouterProvider } from 'react-router-dom';

import { DialogHost } from '@/components/ui/dialog';
import { DrawerHost } from '@/components/ui/drawer';
import { Toaster } from '@/components/ui/sonner';
import { router } from '@/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <DialogHost />
      <DrawerHost />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
