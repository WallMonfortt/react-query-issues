import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import LoadingIcon from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { issuesQuery } = useIssues();

  const onLabelChanged = (labelName: string) => {
    ( selectedLabels.includes(labelName)) // if the label is already selected
    ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName)) // remove label
    : setSelectedLabels([...selectedLabels, labelName])
   } // add label

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {issuesQuery.isLoading 
          ? <LoadingIcon /> 
          : <IssueList issues={issuesQuery.data || []} />
        }
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange = {(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
