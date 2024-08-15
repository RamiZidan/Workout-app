import { Image } from "antd";

export const testColumns : any[] = [
      {
        title:'name',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'email',
        dataIndex:'email',
        key:'email'
      }
];
export const coursesColumns :any[] = [
    {
        title:'Name',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'Left days',
        dataIndex:'left_days',
        key:'left_days'
    },
    {
        title:'Duration',
        dataIndex:'duration',
        key:'duration'
    },
];

export const DayExercises :any[] = [
    {
      title:'Name',
      render: item => item.exercise.name
    },
    {
      title:'Count',
      render: item => item.exercise.set_count
    },
    {
      title:'Times',
      render: item => item.exercise.times
    },
    {
      title:'level',
      render: item => item.exercise.level
    }
];
