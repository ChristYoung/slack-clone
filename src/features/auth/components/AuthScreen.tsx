"use client"

import { useState } from 'react';
import { SingFlow } from '../types';
import { SignInCard } from './SignInCard';
import { SignUpCard } from './SignUpCard';

export const AuthScreen: React.FC = () => {
    const [state, setState] = useState<SingFlow>('singIn');
    return <div className='__AuthScreen h-full flex items-center justify-center bg-[#5C3B58]'>
        <div className='md:h-auto md:w-[420px]'>
            { state === 'singIn' ? <SignInCard /> : <SignUpCard /> }
        </div>
    </div>;
};
