import expect from 'expect';
import signInPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('signInPageReducer', () => {
  it('returns the initial state', () => {
    expect(signInPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
