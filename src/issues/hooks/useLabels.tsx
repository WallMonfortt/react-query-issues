import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';


const getLabels = async():Promise<Label[]> => {
    await sleep(2);
    const {data} = await githubApi.get<Label[]>('/labels');
    // const response = await fetch('https://api.github.com/repos/facebook/react/labels')
    // const data = await response.json()
    console.log(data)
    return data
  }

export const useLabels = () => {
    const labelsQuery = useQuery(
        ['labels'], // key
        getLabels,  // fetcher function
        {
            staleTime: 1000 * 60 * 60, // time data is considered fresh
        }
      );

  return {labelsQuery};
}


