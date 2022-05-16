import { useState } from "react";
import Button from "./components/Button";

const ActivityInput = ({ onSubmit }) => {
  const [activity, set_activity] = useState({});

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="rounded flex-grow h-6 p-1"
        placeholder="Activity"
        value={activity.name ?? ""}
        onChange={(e) => set_activity({ ...activity, name: e.target.value })}
      />
      <input
        type="number"
        className="rounded h-6 p-1 w-16"
        placeholder="30"
        value={activity.duration ?? 0}
        onChange={(e) =>
          set_activity({ ...activity, duration: e.target.value })
        }
      />
      <Button
        disabled={!activity.name || !activity.duration}
        onClick={() => {
          onSubmit(activity);
          set_activity({});
        }}
      >
        add
      </Button>
    </div>
  );
};

const ActivitiesList = ({ activities, onDelete }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">activities:</h2>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-2 bg-gray-200 p-1 rounded items-center"
          >
            <div className="flex-grow">{activity.name}</div>
            <div>{activity.duration}</div>
            <Button
              onClick={() => {
                onDelete(activity);
              }}
            >
              del
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Routine = () => {
  const [routine, set_routine] = useState([]);
  return (
    <div className="w-full flex flex-col space-y-2 h-full p-4 bg-stone-300 rounded-b">
      <ActivityInput
        onSubmit={(activity) => {
          console.log(activity);
          set_routine([...routine, activity]);
        }}
      />
      <div className="flex-grow">
        {routine.length ? (
          <ActivitiesList
            activities={routine}
            onDelete={(activity) => {
              set_routine(routine.filter((a) => a !== activity));
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            no activities.
          </div>
        )}
      </div>
      <Button onClick={() => set_routine([])}>save</Button>
    </div>
  );
};
