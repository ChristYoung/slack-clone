import { ImageIcon, Smile } from 'lucide-react';
import Quill, { type QuillOptions } from 'quill';
import { Delta, Op } from 'quill/core';
import 'quill/dist/quill.snow.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

import { Hit } from '../hit';
import { Button } from './button';

type EditorValue = {
  image?: File | null;
  body: string;
};

export interface EditorProps {
  onSubmit?: ({ image, body }: EditorValue) => void;
  variant?: 'create' | 'edit';
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: React.MutableRefObject<Quill | null>;
  defaultValue?: Delta | Op[];
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const {
    variant = 'create',
    placeholder,
    defaultValue = [],
    innerRef,
    onSubmit,
    disabled,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorText, setEditorText] = useState<string>('');

  // Why use ref here?
  const submitRef = useRef(onSubmit);
  const placeHolderRef = useRef(placeholder);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const quillRef = useRef<Quill | null>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeHolderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeHolderRef.current,
      readOnly: disabledRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                // TODO: need to call submit when press 'enter'
                return;
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quillInstance.insertText(quillInstance.getSelection()?.index || 0, '\n');
              },
            },
          },
        },
      },
    };

    const quillInstance = new Quill(editorContainer, options);
    quillRef.current = quillInstance;
    quillRef.current.focus();

    if (innerRef?.current) {
      innerRef.current = quillInstance;
    }

    quillInstance.setContents(defaultValueRef.current);
    setEditorText(quillInstance.getText());

    quillInstance.on(Quill.events.TEXT_CHANGE, () => {
      setEditorText(quillInstance.getText());
    });

    return () => {
      quillInstance && quillInstance.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = '';
      }
      if (quillRef) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty =
    editorText
      .replace(/<(.|\n)*?>/g, '') // 将所有的html元素转义, 因为<br />, <p></p>等空html元素也应该被视为空
      .trim().length === 0;

  return (
    <div className='__editor flex flex-col'>
      <div
        className='flex flex-col border border-slate-200 rounded-md 
        overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white'
      >
        <div ref={containerRef} className='h-full ql-custom'></div>
        <div className='flex px-2 pb-2 z-[5]'>
          <Hit label='hide formatting'>
            <Button disabled variant='ghost' size='iconSm'>
              <PiTextAa className='size-4' />
            </Button>
          </Hit>
          <Button disabled variant='ghost' size='iconSm'>
            <Smile className='size-4' />
          </Button>
          {variant === 'edit' && (
            <div className='ml-auto flex items-center gap-x-2'>
              <Button variant={'outline'} size={'sm'}>
                Cancel
              </Button>
              <Button
                size={'sm'}
                disabled={disabled || isEmpty}
                className='bg-[#007a5a] hover:bg-[#007a5a]/800 text-white'
              >
                Save
              </Button>
            </div>
          )}
          {variant === 'create' && (
            <>
              <Button disabled variant='ghost' size='iconSm'>
                <ImageIcon className='size-4' />
              </Button>
              <Button
                className='ml-auto bg-[#007a5a] hover:bg-[#007a5a]/800 text-white'
                disabled={disabled || isEmpty}
                variant='ghost'
                size='iconSm'
              >
                <MdSend className='size-4' />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='p-2 text-[10px] text-muted-foreground flex justify-end'>
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
