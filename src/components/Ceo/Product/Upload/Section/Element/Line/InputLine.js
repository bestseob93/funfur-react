import React from 'react';

import { Label } from '../index';
import { InputField } from '../Field/index';

const InputLine = ({ label={}, field={}, fetchObject={} }) => {

    return (
        <div>
            <Label {...label} />
            <InputField {...field} {...fetchObject} />
        </div>
    )
};

export default InputLine;