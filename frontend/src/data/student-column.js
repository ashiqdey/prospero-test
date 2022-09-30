const data = [
  {
    field: 'id',
    title: 'Student ID',
    sort: true,
  },
  {
    field: 'email',
    title: 'Email',
  },
  {
    field: 'name',
    title: 'Name',
    sort: true,
  },
  {
    field: 'subjects',
    title: 'Subjects',
    render: (value) => value.join(','),
  },
];
export default data;