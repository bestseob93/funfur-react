import * as React from 'react';
import { Component } from 'react';

import Button from 'antd/lib/button';
import { Switch, Icon } from 'antd';

import './Hello.css';

interface Props {
    name: string;
    age: number;
}

interface Nothing {

}

export default class Hello extends Component<Props, Nothing> {
    render() {
        return (
            <div className="hello">
                Hello typescript!
                <Button/>
                <br />
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} />
                <br />
                <Switch checkedChildren="1" unCheckedChildren="0" />
                <br />
                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked={true} />

            </div>
        );
    }
}