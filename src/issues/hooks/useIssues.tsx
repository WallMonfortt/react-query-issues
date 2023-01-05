import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';
import { useState, useEffect } from 'react';


interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async( {labels, state, page = 1}: Props): Promise<Issue[]> => {

  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length) {
    const labelString = labels.join(','); // labels = ['label1', 'label2'] => 'label1,label2'
    params.append('labels', labelString);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues',{params});
  return data;
}

export const useIssues = ({state, labels} : Props) => {

  const [page, setPage] = useState(1);

  useEffect(() => { // reset the page to 1 when the state or labels change
    setPage(1);
  }, [state, labels])
  

  const issuesQuery = useQuery(
    ['issues', { state, labels, page }], // key, send an object with the state and labels as a second argument to the query
    () => getIssues( {labels, state, page} ),
  );

  const nextPage = () => {
    if ( issuesQuery.data?.length === 0 ) return;

    setPage( page + 1 );
  }

  const prevPage = () => {
    if ( page > 1 ) setPage( page - 1 );
  }

  return { 
    // Properties
    issuesQuery,

    //Getter
    page: issuesQuery.isFetching ? 'Loading...' : page,

    // Methods
    nextPage,
    prevPage
  
  };
}
