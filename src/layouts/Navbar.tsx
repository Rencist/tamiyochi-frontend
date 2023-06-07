import Image from 'next/image';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

export default function Navbar() {
  return (
    <header className='fixed top-0 z-[100] w-full'>
      <div className='flex h-[92px] flex-row justify-between items-center px-12 py-6 rounded-b-xl bg-teal-600'>
        <UnstyledLink href='/' className='flex flex-row items-center gap-2'>
          <div className='w-10 h-10'>
            <Image src='/images/logo.png' alt='Logo' width='640' height='640' />
          </div>
          <Typography
            font='montserrat'
            variant='h6'
            weight='bold'
            className='hidden md:block text-base-surface'
          >
            Tamiyochi
          </Typography>
        </UnstyledLink>

        <Typography
          font='montserrat'
          variant='h5'
          weight='bold'
          className='text-base-surface'
        >
          Koleksi Manga
        </Typography>

        <div className='flex flex-row gap-6'>
          <ButtonLink
            href='/login'
            size='large'
            variant='primary'
            textClassName='font-secondary'
          >
            Log In
          </ButtonLink>
          <ButtonLink
            href='/signup'
            size='large'
            variant='secondary'
            textClassName='font-secondary'
            className='bg-transparent'
          >
            Sign Up
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
