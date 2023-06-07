import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import AuthIllustration from '@/pages/auth/container/AuthIllustration';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/entity/user';

export default function LoginPage() {
  const methods = useForm<{ email: string; password: string }>();
  const { handleSubmit } = methods;

  const router = useRouter();
  const login = useAuthStore.useLogin();

  const { mutate: handleLogin, isLoading } = useMutation(
    async (data: { email: string; password: string }) => {
      const res = await api.post('/user/login', data);
      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiReturn<User>>('/user/me');

      if (!user.data.data) {
        throw new Error('Sesi login tidak valid');
      }
      login({ ...user.data.data, token });
    }
  );

  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin(
      { email: data.email, password: data.password },
      { onSuccess: () => router.push('/') }
    );
  };

  return (
    <Layout>
      <SEO title='Login' description='Login Page' />
      <main className='flex min-h-screen w-full bg-base-surface'>
        <section className='hidden md:flex fixed w-full h-screen p-3 pointer-events-none'>
          <div className='w-1/3 min-w-[400px] h-full' />
          <div className='w-2/3 h-full'>
            <AuthIllustration />
          </div>
        </section>
        <section className='flex items-center justify-center w-full md:w-1/3 md:min-w-[400px] px-8 py-12'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full max-w-[400px] flex flex-col gap-6'
            >
              <Typography
                font='montserrat'
                variant='h3'
                weight='bold'
                className='text-teal-600 text-center'
              >
                Log In
              </Typography>

              <div className='space-y-3'>
                <Input
                  id='email'
                  label='Email'
                  placeholder='Masukkan Email'
                  validation={{ required: 'Email harus diisi' }}
                />
                <div className='flex flex-col gap-1.5'>
                  <Input
                    id='password'
                    type='password'
                    label='Password'
                    placeholder='Masukkan Password'
                    validation={{ required: 'Password harus diisi' }}
                  />
                  <UnstyledLink
                    href='/auth/forgot-password'
                    className='self-end underline text-teal-400 hover:text-teal-600'
                  >
                    <Typography font='open-sans' variant='c' weight='semibold'>
                      Lupa kata sandi?
                    </Typography>
                  </UnstyledLink>
                </div>
              </div>

              <div className='flex flex-col items-center gap-1.5'>
                <Button
                  type='submit'
                  className='w-full'
                  textClassName='font-secondary'
                  isLoading={isLoading}
                >
                  Log In
                </Button>
                <div className='flex'>
                  <Typography
                    font='open-sans'
                    variant='c'
                    className='text-teal-600'
                  >
                    Belum punya akun?&nbsp;
                  </Typography>
                  <UnstyledLink
                    href='/signup'
                    className='self-end underline text-teal-400 hover:text-teal-600'
                  >
                    <Typography font='open-sans' variant='c' weight='semibold'>
                      Daftar
                    </Typography>
                  </UnstyledLink>
                </div>
              </div>
            </form>
          </FormProvider>
        </section>
      </main>
    </Layout>
  );
}
