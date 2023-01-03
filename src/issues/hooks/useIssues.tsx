import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';

const getIssues = async(): Promise<Issue[]> => {

  await sleep(2);

    const { data } = await githubApi.get<Issue[]>('/issues');
    console.log(data);
    return data;
}

export const useIssues = () => {
  const issuesQuery = useQuery(
    ['issues'],
    getIssues,
  )

  return { issuesQuery };
}
