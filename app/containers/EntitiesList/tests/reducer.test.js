import expect from 'expect';
import entitiesListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('entitiesListReducer', () => {
  it('returns the initial state', () => {
    expect(entitiesListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
