import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import TextArea from '@/components/form/TextArea';
import Typography from '@/components/typography/Typography';
import CommentCard from '@/pages/manga/components/CommentCard';
import { PaginatedApiResponse } from '@/types/api';
import { Comment } from '@/types/entity/manga';

export default function Comment({ mangaId }: { mangaId: string }) {
  const methods = useForm<{ komentar: string }>();

  const url = `/komentar/${mangaId}?page=1&per_page=5`;
  const { data: commentData } = useQuery<PaginatedApiResponse<Comment[]>>(
    [url],
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Komentar Pembaca
      </Typography>

      <FormProvider {...methods}>
        <form className='flex flex-col w-full bg-base-surface gap-3 p-3 rounded-lg'>
          <div className='flex flex-row items-center gap-1.5'>
            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-base-light'>
              <BsFillPersonFill className='text-xl text-base-icon' />
            </div>
            <Typography variant='c' weight='semibold' className='text-teal-600'>
              Guest
            </Typography>
          </div>
          <TextArea
            id='komentar'
            placeholder='Tulis komentar di sini...'
            rows={5}
          />
          <Button type='submit' className='self-end'>
            Kirim Komentar
          </Button>
        </form>
      </FormProvider>

      <div className='flex flex-col gap-6'>
        {commentData?.data.data_per_page?.map(
          ({ id, isi, username, created_at }) => (
            <CommentCard
              key={id}
              content={isi}
              author={username}
              createdAt={created_at}
            />
          )
        )}
      </div>
    </div>
  );
}
