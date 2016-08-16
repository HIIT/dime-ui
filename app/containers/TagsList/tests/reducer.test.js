import expect from 'expect';
import tagsListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('tagsListReducer', () => {
  it('returns the initial state', () => {
    expect(tagsListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
