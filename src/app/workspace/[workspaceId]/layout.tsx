'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

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
        <ResizablePanelGroup autoSaveId={'j-workspace-layout'} direction='horizontal'>
          <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5E2C5F]'>
            <div>Channels Side bar</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
