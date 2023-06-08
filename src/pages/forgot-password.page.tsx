import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import AuthIllustration from '@/pages/auth/container/AuthIllustration';

export default function ForgotPasswordPage() {
  const methods = useForm<{ email: string }>();
  const { handleSubmit } = methods;

  const onSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('mabar');
  };

  return (
    <Layout>
      <main className='flex min-h-screen w-full bg-base-surface'>
        <section className='hidden md:flex fixed w-full h-screen p-3 pointer-events-none'>
          <div className='w-1/3 min-w-[400px] h-full' />
          <div className='w-2/3 h-full'>
            <AuthIllustration />
          </div>
        </section>

        <section className='flex items-center justify-center w-full md:w-1/3 md:min-w-[400px]  px-8 py-12'>
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
                Reset Password
              </Typography>

              <div className='space-y-3'>
                <Input
                  id='email'
                  label='Email'
                  placeholder='Masukkan Email'
                  validation={{ required: 'Email harus diisi' }}
                />
              </div>

              <div className='flex flex-col items-center gap-1.5'>
                <Button
                  type='submit'
                  className='w-full'
                  textClassName='font-secondary'
                >
                  Kirim Email Reset Password
                </Button>

                <div className='flex gap-1'>
                  <Typography
                    font='open-sans'
                    variant='c'
                    className='text-teal-600'
                  >
                    Ingat kata sandi Anda?
                  </Typography>
                  <UnstyledLink
                    href='/login'
                    className='self-end underline text-teal-400 hover:text-teal-600'
                  >
                    <Typography font='open-sans' variant='c' weight='semibold'>
                      Masuk
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
