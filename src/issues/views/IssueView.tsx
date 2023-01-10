import { Link, useParams, Navigate } from 'react-router-dom';
import LoadingIcon from '../../shared/components/LoadingIcon';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hooks';

export const IssueView = () => {

  const params = useParams();
  const { id = '0' } = params;
  const { issueQuery, issueCommentsQuery } = useIssue(+id);

  console.log(issueQuery.data);
  
  if (issueQuery.isLoading)  <LoadingIcon />
  if (!issueQuery.data){
   return(<Navigate to= "./issues/list" />)
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>
      {/* Primer comentario */}
      <IssueComment issue={ issueQuery.data } />
      {/* Comentario de otros */}
      {
        issueCommentsQuery.isLoading && <LoadingIcon />
      }
      {
        issueCommentsQuery.data?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))  
      }
      {/* <IssueComment body={ comment2 } />
      <IssueComment body={ comment3 } /> */}
    </div>
  )
}
