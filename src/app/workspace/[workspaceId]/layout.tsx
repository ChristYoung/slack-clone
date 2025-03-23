'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import Sidebar from './sidebar';
import Toolbar from './toolbar';
import { WorkspaceSidebar } from './workspaceSidebar';

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout: React.FC<WorkSpaceIdLayoutProps> = ({ children }) => {
  return (
    <div className='__layout h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup autoSaveId={'j-workspace-layout'} direction='horizontal'>
          <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5E2C5F]'>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className='cursor-row-resize' />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
