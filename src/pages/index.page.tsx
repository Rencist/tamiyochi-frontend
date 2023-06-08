import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

import Filter from '@/components/form/Filter';
import Input from '@/components/form/Input';
import SEO from '@/components/SEO';
import { GENRE } from '@/constant/manga';
import Layout from '@/layouts/Layout';
import Card from '@/pages/dashboard/components/Card';
import { PaginatedApiResponse } from '@/types/api';
import { Seri } from '@/types/entity/manga';

export default function DashboardPage() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const { data: queryData } = useQuery<PaginatedApiResponse<Seri[]>>(
    ['seri?page=1&per_page=50'],
    {
      keepPreviousData: true,
    }
  );

  const onChange = () => {
    return;
  };

  return (
    <Layout withNavbar={true}>
      <SEO />
      <main className='space-y-8 min-h-screen bg-base-surface pt-[92px]'>
        <div className='p-12 space-y-8'>
          <section className='w-full'>
            {/* TODO */}
            <FormProvider {...methods}>
              <form
                onChange={handleSubmit(onChange)}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              >
                <Input id='search' placeholder='Search' leftIcon={BiSearch} />
                <div className='flex flex-row gap-3 lg:col-start-3'>
                  <Filter placeholder='Genre' filters={GENRE} multiple />
                  <Filter
                    placeholder='Sort By'
                    defaultValue='Title'
                    filters={['Title', 'Rating', 'Popularity', 'Release Date']}
                  />
                </div>
              </form>
            </FormProvider>
          </section>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {queryData &&
              queryData.data.data_per_page.map((seri, index) => (
                <Card
                  key={index}
                  id={seri.id}
                  name={seri.judul}
                  author={seri.penulis[0]}
                  score={seri.skor}
                  imageSrc={seri.foto}
                  readers={seri.total_pembaca}
                  volumes={seri.manga.length.toString()}
                  year={seri.tahun_terbit.split('/')[2]}
                  synopsis={seri.sinopsis}
                  genre={seri.genre
                    .map(({ nama }) => nama)
                    .filter(
                      (value, index, arr) => arr.indexOf(value) === index
                    )}
                />
              ))}
          </section>
          {/* 
            TODO 
            Page Navigation
          */}
        </div>
      </main>
    </Layout>
  );
}
