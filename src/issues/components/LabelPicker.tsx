import { useLabels } from '../hooks/useLabels';
import { FaSpinner } from 'react-icons/fa';
import { FC } from 'react';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}


export const LabelPicker: FC<Props> = ( { selectedLabels, onChange} ) => {

 const {labelsQuery} = useLabels();

 if (labelsQuery.isLoading) // isLoading is because is the first time the query is run, isFetching is when the query is running again
    return <FaSpinner />;
  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span 
        key={label.id}
        className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
        style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
        onClick={() => onChange(label.name)}
    >
        {label.name}
    </span>
      ))} 
    </div>
  )
}
