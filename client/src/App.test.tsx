import { store } from './app/store';
import { PriorityType } from './entities/Types';
import { add, loadPriorities, remove, update } from './features/jobs/jobsSlice';

test('Gets priorities', () => {

  fetch("http://localhost:9000/priorities")
    .then(res => res.text())
    .then(res => {
      const parsedData = JSON.parse(res);
      const priorities = parsedData.result;

      // Checks priorities
      expect(priorities).toEqual([
        {
          value: PriorityType.Trivial,
          label: PriorityType.Trivial
        },
        {
          value: PriorityType.Regular,
          label: PriorityType.Regular
        },
        {
          value: PriorityType.Urgent,
          label: PriorityType.Urgent
        }
      ]);

      // Loads priorities
      store.dispatch(loadPriorities(priorities));
      let state = store.getState();
      expect(state.jobs.priorities).toEqual(priorities);

    });

});

test('CRUD actions', () => {

  //Adds
  store.dispatch(add({ key: "1", name: "Test Job", priority: PriorityType.Urgent }));
  let state = store.getState();
  expect(state.jobs.items.length).toBe(1);

  //Updates
  store.dispatch(update({ key: "1", name: "Test Job", priority: PriorityType.Trivial }));
  state = store.getState();
  const item = state.jobs.items[0];
  expect(item.key).toEqual("1");
  expect(item.name).toEqual("Test Job");
  expect(item.priority).toEqual(PriorityType.Trivial);

  //Removes
  store.dispatch(remove("1"));
  state = store.getState();
  expect(state.jobs.items.length).toBe(0);

});
