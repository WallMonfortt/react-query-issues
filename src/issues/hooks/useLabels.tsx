import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';


const getLabels = async():Promise<Label[]> => {
    await sleep(2);
    const {data} = await githubApi.get<Label[]>('/labels',{
      headers: {
        Authorization: null
      }
    });
    // const response = await fetch('https://api.github.com/repos/facebook/react/labels') // this is the same as the line above
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
            // initialData: [], // initial data to be used is similar to the placeholder data with the main difference that it will be used only the first time the query is run
            placeholderData: [
              {
                id: 725156255,
                node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                name: "good first issue (taken)",
                color: "b60205",
                default: false,
              },
              {
                id: 1249821345,
                node_id: "MDU6TGFiZWwxMjQ5ODIxMzQ1",
                url: "https://api.github.com/repos/facebook/react/labels/Component:%20ESLint%20Rules",
                name: "Component: ESLint Rules",
                color: "f7afdb",
                default: false,
              }
            ], // data to show while the query is loading
        }
      );

  return {labelsQuery};
}


