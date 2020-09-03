import React from 'react';
import { Select } from 'antd';



export interface OwnProps {
    onChange: (values: Array<string>) => void;
    onDeselect:(value:string)=>void;
    candidates: Array<string>
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
                    candidates.map(candidate => (
                        <Select.Option key={candidate} value={candidate}>
                            {candidate}
                        </Select.Option>

                    ))
                }
            </Select>

       



        </>
    )

}





export default InputSelectMultiple;