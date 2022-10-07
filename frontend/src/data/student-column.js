const data = [
  {
    field: '_id',
    title: 'Student ID',
    sort: true,
    sx: {
      width: 120,
    }
  },
  {
    field: 'email',
    title: 'Email',
    sort: true,
  },
  {
    field: 'name',
    title: 'Name',
    sort: true,
    sx: {
      minWidth: 150,
      maxWidth: 200,
    }
  },
  {
    field: 'subjects',
    title: 'Subjects',
    render: (value) => value.join(', '),
  },
];
export default data;