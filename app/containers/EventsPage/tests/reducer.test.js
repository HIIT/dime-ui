import expect from 'expect';
import eventsPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('eventsPageReducer', () => {
  it('returns the initial state', () => {
    expect(eventsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
