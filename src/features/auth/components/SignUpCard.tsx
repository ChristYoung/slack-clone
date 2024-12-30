import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignFlow } from '../types';
import { useState } from 'react';

export interface SignUpCardProps {
    setState: (state: SignFlow) => void;
}

export const SignUpCard: React.FC<SignUpCardProps> = (props: SignUpCardProps) => {
    const { setState } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    return <Card className='__SignUpCard w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
            <CardTitle>Sign up to continue</CardTitle>
            <CardDescription>Use your email or another service</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5'>
                <Input disabled={false} value={email} placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}} required />
                <Input disabled={false} value={password} placeholder='Password' type='password' onChange={(e) => {setPassword(e.target.value)}} required />
                <Input disabled={false} value={confirmPassword} placeholder='Confirm the password' type='password' onChange={(e) => {setConfirmPassword(e.target.value)}} required />
                <Button type='submit' className='w-full' size={'lg'}>Continue</Button>
            </form>
            <Separator />
            <div className='flex flex-col gap-y-2.5'>
                <Button variant='outline' className='w-full' size={'lg'}><FcGoogle /> Continue with Google</Button>
                <Button variant='outline' className='w-full' size={'lg'}><FaGithub /> Continue with Github</Button>
            </div>
            <p className='text-xs text-muted-foreground'>
                Already have an account? <span className='text-sky-700 hover:underline cursor-pointer'
                onClick={() => setState('singIn')}>Sign in</span>
            </p>
        </CardContent>
    </Card>;
};
