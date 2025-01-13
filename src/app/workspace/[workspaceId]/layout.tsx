'use client';

import Sidebar from './sidebar';
import Toolbar from './toolbar';

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout: React.FC<WorkSpaceIdLayoutProps> = ({ children }) => {
  return (
    <div className='__layout h-full bg-red-200'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
