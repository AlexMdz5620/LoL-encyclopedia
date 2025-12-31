import ChampionDetail from '@/components/champion/ChampionDetail';
import { fetchChampionDetails } from '@/services/champions';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const champion = await fetchChampionDetails(id);

  if (!champion) {
    return notFound();
  }

  return <ChampionDetail champion={champion}/>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const champion = await fetchChampionDetails(id);

  return {
    title: `${champion?.name} - ${champion?.title} | LoL Encyclopedia`,
    description: champion?.blurb,
  }
}
