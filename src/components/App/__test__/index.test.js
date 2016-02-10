import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { App } from '../index';

should();

describe('App', () => {
	it('should render ok', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<App />);
		const result = renderer.getRenderOutput();
		// root object of component should be a div
		result.type.should.equal('div');
	});
});
