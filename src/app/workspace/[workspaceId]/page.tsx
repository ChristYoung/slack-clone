export interface WorkSpaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkSpaceIdPage: React.FC<WorkSpaceIdPageProps> = (props: WorkSpaceIdPageProps) => {
  return <div className='__page'>ID: {props.params.workspaceId}</div>;
};

export default WorkSpaceIdPage;
