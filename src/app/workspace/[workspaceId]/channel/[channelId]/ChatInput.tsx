import dynamic from 'next/dynamic';
import Quill from 'quill';
import { useRef } from 'react';

const Editor = dynamic(() => import('@/components/ui/editor'), { ssr: false });

export interface ChatInputProps {
  placeHolder: string;
}

export const ChatInput: React.FC<ChatInputProps> = (props: ChatInputProps) => {
  const { placeHolder } = props;
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className='__ChatInput px-5 w-full'>
      <Editor variant='create' placeholder={placeHolder} onSubmit={() => {}} innerRef={editorRef} />
    </div>
  );
};
