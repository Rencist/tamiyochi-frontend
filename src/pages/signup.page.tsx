import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import SelectInput from '@/components/form/SelectInput';
import TextArea from '@/components/form/TextArea';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import { REG_EMAIL, REG_PHONE } from '@/constant/regex';
import Layout from '@/layouts/Layout';
import AuthIllustration from '@/pages/auth/container/AuthIllustration';
import { SignUp } from '@/types/entity/auth';

export default function SignUpPage() {
  const methods = useForm<SignUp>();
  const { handleSubmit } = methods;

  const onSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('mabar');
  };

  return (
    <Layout>
      <SEO title='Sign Up' description='Sign Up Page' />
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
              className='w-full max-w-[400px] flex flex-col gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography
                font='montserrat'
                variant='h3'
                weight='bold'
                className='text-teal-600 text-center'
              >
                Sign Up
              </Typography>

              <div className='space-y-3'>
                <Input
                  id='nama'
                  label='Nama Lengkap'
                  placeholder='Masukkan Nama Lengkap'
                  validation={{ required: 'Nama harus diisi' }}
                />
                <Input
                  id='email'
                  label='Email'
                  placeholder='Masukkan Email'
                  validation={{
                    required: 'Email harus diisi',
                    pattern: {
                      value: REG_EMAIL,
                      message: 'Email tidak valid',
                    },
                  }}
                />

                <Input
                  id='password'
                  type='password'
                  label='Password'
                  placeholder='Masukkan Password'
                  validation={{ required: 'Password harus diisi' }}
                />

                <Input
                  id='no_telp'
                  label='Nomor Telepon'
                  prefix='+62'
                  placeholder='Masukkan Nomor Telepon'
                  validation={{
                    required: 'Nomor telepon harus diisi',
                    pattern: {
                      value: REG_PHONE,
                      message: 'Nomor telepon tidak valid',
                    },
                  }}
                />

                <TextArea
                  id='alamat'
                  label='Alamat'
                  placeholder='Masukkan Alamat'
                  validation={{ required: 'Alamat harus diisi' }}
                />
                <SelectInput
                  id='provinsi'
                  label='Provinsi'
                  placeholder='Pilih Provinsi'
                  validation={{ required: 'Provinsi harus diisi' }}
                />
                <SelectInput
                  id='kabupaten_id'
                  label='Kabupaten'
                  placeholder='Pilih Kabupaten'
                  validation={{ required: 'Kabupaten harus diisi' }}
                >
                  <option value='' disabled>
                    --- Pilih Kabupaten ---
                  </option>
                </SelectInput>
              </div>

              <div className='flex flex-col items-center gap-1.5'>
                <Button
                  type='submit'
                  className='w-full'
                  textClassName='font-secondary'
                >
                  Sign Up
                </Button>
                <div className='flex'>
                  <Typography
                    font='open-sans'
                    variant='c'
                    className='text-teal-600'
                  >
                    Sudah punya akun?&nbsp;
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
