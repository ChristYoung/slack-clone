import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SignInCard: React.FC = () => {
    return <Card className='__SignInCard w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
            <CardTitle>Login to continue</CardTitle>
            <CardDescription>Use your email or another service</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5'>
                <Input disabled={false} value="" placeholder='Email' type='email' onChange={() => { }} required />
                <Input disabled={false} value="" placeholder='Password' type='password' onChange={() => { }} required />
                <Button type='submit' className='w-full' size={'lg'}>Continue</Button>
            </form>
            <Separator />
            <div className='flex flex-col gap-y-2.5'>
                <Button variant='outline' className='w-full' size={'lg'}><FcGoogle /> Continue with Google</Button>
                <Button variant='outline' className='w-full' size={'lg'}><FaGithub /> Continue with Github</Button>
            </div>
            <p className='text-xs text-muted-foreground'>
                Don&apos;t have an account? <span className='text-sky-700 hover:underline cursor-pointer'>Sign up</span>
            </p>
        </CardContent>
    </Card>;
};
