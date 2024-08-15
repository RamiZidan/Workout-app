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

export const dayExercisesColumns :any[] = [
    {
      title:'Name',
      render: item => item?.name
    },
    {
      title:'Count',
      render: item => item?.set_count
    },
    {
      title:'Times',
      render: item => item?.times
    },
    {
      title:'level',
      render: item => item?.level
    }
];
