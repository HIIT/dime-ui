import expect from 'expect';
import requiresAuthReducer from '../reducer';
import { fromJS } from 'immutable';

describe('requiresAuthReducer', () => {
  it('returns the initial state', () => {
    expect(requiresAuthReducer(undefined, {})).toEqual(fromJS({}));
  });
});
