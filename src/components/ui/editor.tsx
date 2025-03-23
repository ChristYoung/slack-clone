export interface EditorProps {}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  return (
    <div className='__editor flex flex-col'>
      <div
        className='flex flex-col border border-slate-200 rounded-md 
        overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white'
      >
        Editor
      </div>
    </div>
  );
};

export default Editor;
