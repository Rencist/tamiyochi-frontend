import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

import Filter from '@/components/form/Filter';
import Input from '@/components/form/Input';
import PageNavigation from '@/components/PageNavigation';
import SEO from '@/components/SEO';
import { GENRE } from '@/constant/manga';
import usePageNavigation from '@/hooks/usePageNavigation';
import Layout from '@/layouts/Layout';
import Card from '@/pages/dashboard/components/Card';
import { PaginatedApiResponse } from '@/types/api';
import { Seri } from '@/types/entity/manga';

export default function DashboardPage() {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { pageState, setPageState } = usePageNavigation({ pageSize: 60 });

  const url = `seri?page=${pageState.pageIndex + 1}&per_page=${
    pageState.pageSize
  }`;

  const { data: queryData } = useQuery<PaginatedApiResponse<Seri[]>>([url], {
    keepPreviousData: true,
  });

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
          <section className='flex flex-col gap-8 items-end'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {queryData &&
                queryData.data.data_per_page.map((seri) => (
                  <Card
                    key={seri.id}
                    id={seri.id}
                    name={seri.judul}
                    author={seri.penulis[0]}
                    score={seri.skor}
                    imageSrc={seri.foto}
                    readers={seri.total_pembaca}
                    volumes={seri.manga.length.toString()}
                    year={seri.tahun_terbit.split('/')[2]}
                    synopsis={seri.sinopsis}
                    genre={seri.genre}
                  />
                ))}
            </div>
            {queryData && (
              <PageNavigation
                meta={queryData?.data.meta}
                pageState={pageState}
                pageCount={5}
                setPageState={setPageState}
              />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
