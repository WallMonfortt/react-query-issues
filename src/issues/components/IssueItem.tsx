import { FC } from 'react';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Issue, State } from '../interfaces';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';
import { timeSince } from '../../helpers';




interface Props {
    issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const prefetchData = () =>{ // this function call the prefetchQuery function and do the query in the background
        queryClient.prefetchQuery(
            ['issue', issue.number], // this is the key of the query to be prefetched
            () => getIssueInfo(issue.number), {
                staleTime: 1000 * 60 * 10,
            }
        );

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComments(issue.number), {
                staleTime: 1000 * 60 * 10, // this is the time that the data will be updated in the cache and the query will be called again
            }
        );
    }

    const preSetData = () => { // this function call the setQueryData function and set the data to the cache
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000, // this is the time that the data will be updated in the cache 
            }
        );
    }
    console.log(issue);
    return (
        <div className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${issue.number}`)}
            // onMouseEnter = {prefetchData} // this is the function that will be called when the mouse enters the div
            onMouseEnter = {preSetData}
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open
                        ? (<FiInfo size={30} color="red" className='fiInfo'/>) 
                        : (<FiCheckCircle size={30} color="green" />)
                }
                            

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span 
                                key={label.id} 
                                className="badge rounded-pill m-1" 
                                style={{backgroundColor: `#${ label.color }` , color: 'black'}}
                                >
                                    {label.name}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
