import React from 'react';
import {
    shallow
} from 'enzyme';
import App from '../src/client/components/app.jsx';
import renderer from 'react-test-renderer';

test('#App', () => {
    const app = renderer.create( <
        App / >
    );
    let appTree = app.toJSON();
    expect(appTree).toMatchSnapshot();
    console.log(appTree);
});