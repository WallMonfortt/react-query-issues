import { useInfiniteQuery } from '@tanstack/react-query'
import { State, Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';


interface Props {
    state?: State;
    labels: string[];
    page?: number
}

interface QueryPropos{
    pageParam?: number;
    queryKey: (string | Props) [];

}

const getIssues = async( { pageParam = 1, queryKey }: QueryPropos): Promise<Issue[]> => {

    const [,, args] = queryKey;
    const { state, labels } = args as Props;
  
    const params = new URLSearchParams();
  
    if (state) params.append('state', state);
  
    if (labels.length) {
      const labelString = labels.join(','); // labels = ['label1', 'label2'] => 'label1,label2'
      params.append('labels', labelString);
    }
  
    params.append('page', pageParam.toString());
    params.append('per_page', '5');
  
    const { data } = await githubApi.get<Issue[]>('/issues',{params});
    return data;
  }
  

export const useIssuesInfinite = ({ state, labels}: Props) => {

    const issuesQuery = useInfiniteQuery(
        [
            'issues',
            'infinite',
            {state, labels},
        ],
        (data) => getIssues( data ),
        {
            getNextPageParam: (lastPage, pages) => {
                if ( lastPage.length === 0) return;

                return pages.length + 1;
            }
        }
    )
  return {
    issuesQuery
  }
}
