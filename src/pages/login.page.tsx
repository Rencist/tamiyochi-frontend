import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import AuthIllustration from '@/pages/auth/container/AuthIllustration';

export default function LoginPage() {
  const methods = useForm<{ email: string; password: string }>();
  const { handleSubmit } = methods;

  const onSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('mabar');
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
