import expect from 'expect';
import eventsListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('eventsListReducer', () => {
  it('returns the initial state', () => {
    expect(eventsListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
