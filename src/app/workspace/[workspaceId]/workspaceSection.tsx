export interface WorkspaceSectionProps {
  label: string;
  hint: string;
  children: React.ReactNode;
  onNew?: () => void;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = (props: WorkspaceSectionProps) => {
  const { label, hint, children, onNew } = props;
  return <div className='__workspaceSection flex flex-col mt-3'>{children}</div>;
};
