import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { sleep } from '../../helpers/sleep';

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    await sleep(3)
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    console.log(data);
    return data;
}


export const useIssue = ( issueNumber : number ) => {

    const issueQuery = useQuery(
        ['issue', issueNumber], // be careful with the key, it must be unique and the type must be the same as the one used in the query
        () => getIssueInfo(issueNumber),
    );

  return {
        issueQuery
    }
  
}

