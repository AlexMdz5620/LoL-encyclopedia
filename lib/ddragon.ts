export const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn`;
export const COMMUNITY_DRAGON_URL = "https://raw.communitydragon.org/latest";
export const urlImgChampion = 'https://ddragon.leagueoflegends.com/cdn/img/champion';

export async function getLatestVersion(): Promise<string> {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions = await res.json();
    return versions[0];
}