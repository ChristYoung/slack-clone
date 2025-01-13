export interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
  return (
    <nav className='__toolbar bg-[#481349] flex items-center justify-between h-10 p-1.5 text-white'>
      toolbar component works!
    </nav>
  );
};

export default Toolbar;
