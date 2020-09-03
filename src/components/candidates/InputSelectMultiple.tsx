import React from 'react';
import { Select } from 'antd';
import { Candidate } from '../candidates/CandidateForm';



export interface OwnProps {
    onChange: (values: Array<string>) => void;
    onDeselect:(value:string)=>void;
    candidates: Array<Candidate>
}
  

interface Props extends OwnProps {
   
}


const InputSelectMultiple: React.FC<Props> = ({onChange, candidates, onDeselect }) => {


    return (
        <>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={onChange}
                onDeselect={onDeselect}
            >
                {
                    candidates.map(element => (
                        <Select.Option key={element.photoUrl} value={element.name}>
                            {element.name}
                        </Select.Option>

                    ))
                }
            </Select>

       



        </>
    )

}





export default InputSelectMultiple;