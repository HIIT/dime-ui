import expect from 'expect';
import timelinePageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('timelinePageReducer', () => {
  it('returns the initial state', () => {
    expect(timelinePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
