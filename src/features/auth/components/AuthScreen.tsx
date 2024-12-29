"use client"

import { useState } from 'react';
import { SingFlow } from '../types';

export const AuthScreen: React.FC = () => {
    const [state, setState] = useState<SingFlow>('singIn');
    return <div className='h-full flex items-center justify-center bg-[#5C3B58]'>AuthScreen component works!</div>;
};
