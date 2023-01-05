import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

import { useIssues } from '../hooks';
import LoadingIcon from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListInfiniteView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>(); // this const will be used to filter the issues by state
  
  const { issuesQuery,page, nextPage, prevPage } = useIssues({state, labels: selectedLabels});

  const onLabelChanged = ( labelName: string ) => {
    ( selectedLabels.includes( labelName ) )
      ? setSelectedLabels( selectedLabels.filter( label => label !== labelName )  )
      : setSelectedLabels([...selectedLabels, labelName ]);
  }


  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? ( <LoadingIcon /> )
            : ( <IssueList 
              issues={ issuesQuery.data || [] }
              state={ state }
              onStateChanged = { (newState) => setState(newState)}
              /> )
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button className='btn mt-2 btn-outline-primary'>
            Load More...
          </button>
        </div>
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={ selectedLabels }
          onChange={ (labelName) => onLabelChanged(labelName) }
        />
      </div>
    </div>
  )
}