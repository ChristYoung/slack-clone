import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/ui/editor'), { ssr: false });

export interface ChatInputProps {}

export const ChatInput: React.FC<ChatInputProps> = (props: ChatInputProps) => {
  return (
    <div className='__ChatInput px-5 w-full'>
      <Editor variant='create' />
    </div>
  );
};
