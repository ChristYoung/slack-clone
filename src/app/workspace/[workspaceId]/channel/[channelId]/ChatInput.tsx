import Editor from '@/components/ui/editor';

export interface ChatInputProps {}

export const ChatInput: React.FC<ChatInputProps> = (props: ChatInputProps) => {
  return (
    <div className='__ChatInput px-5 w-full'>
      <Editor />
    </div>
  );
};
