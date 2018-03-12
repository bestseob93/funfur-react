import React from 'react';

import { Label } from '../index';
import { SelectField } from '../Field/index';

const SelectLine = ({ label, field, fetchObject }) => {

    return (
        <div>
            <Label {...label} />
            <SelectField {...field} {...fetchObject} />
        </div>
    )
};

export default SelectLine;