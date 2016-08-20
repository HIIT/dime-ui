import expect from 'expect';
import logInPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('logInPageReducer', () => {
  it('returns the initial state', () => {
    expect(logInPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
