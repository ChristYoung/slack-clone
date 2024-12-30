import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignFlow } from '../types';
import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

export interface SignInCardProps {
    setState: (state: SignFlow) => void;
}

export const SignInCard: React.FC<SignInCardProps> = (props: SignInCardProps) => {
    const { setState } = props;
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleProviderSignIn = (value: "github" | "google") => {
        signIn(value);
    };

    return <Card className='__SignInCard w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
            <CardTitle>Login to continue</CardTitle>
            <CardDescription>Use your email or another service</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5'>
                <Input disabled={false} value={email} placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}} required />
                <Input disabled={false} value={password} placeholder='Password' type='password' onChange={(e) => {setPassword(e.target.value)}} required />
                <Button type='submit' className='w-full' size={'lg'}>Continue</Button>
            </form>
            <Separator />
            <div className='flex flex-col gap-y-2.5'>
                <Button variant='outline' className='w-full' size={'lg'} onClick={() => handleProviderSignIn('github')}><FaGithub /> Continue with Github</Button>
                <Button variant='outline' className='w-full' size={'lg'} disabled><FcGoogle /> Continue with Google</Button>
            </div>
            <p className='text-xs text-muted-foreground'>
                Don&apos;t have an account? <span className='text-sky-700 hover:underline cursor-pointer'
                onClick={() => setState('signUp')}>Sign up</span>
            </p>
        </CardContent>
    </Card>;
};
