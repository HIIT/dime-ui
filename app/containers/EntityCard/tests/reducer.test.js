import expect from 'expect';
import entityCardReducer from '../reducer';
import { fromJS } from 'immutable';

describe('entityCardReducer', () => {
  it('returns the initial state', () => {
    expect(entityCardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
