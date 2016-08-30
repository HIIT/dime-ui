import expect from 'expect';
import profilesPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('profilesPageReducer', () => {
  it('returns the initial state', () => {
    expect(profilesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
