'use client';

import Toolbar from './toolbar';

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout: React.FC<WorkSpaceIdLayoutProps> = ({ children }) => {
  return (
    <div className='__layout h-full bg-red-200'>
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkSpaceIdLayout;
