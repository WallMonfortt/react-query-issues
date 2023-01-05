import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';


interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async( labels: string[] = [], state?: State,): Promise<Issue[]> => {

  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  const { data } = await githubApi.get<Issue[]>('/issues',{params});
  return data;
}

export const useIssues = ({state, labels} : Props) => {
  const issuesQuery = useQuery(
    ['issues', { state, labels }], // key, send an object with the state and labels as a second argument to the query
    () => getIssues( labels, state ),
  )

  return { issuesQuery };
}
