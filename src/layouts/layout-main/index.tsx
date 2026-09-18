import { Outlet } from 'react-router-dom';

export function LayoutMain() {
  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6">
      <Outlet />
    </div>
  );
}
