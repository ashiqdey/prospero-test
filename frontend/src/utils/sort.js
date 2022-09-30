
const getSort = (value) => {
  switch (value) {
    case 1:
      return {
        icon: 'mdi:sort-ascending',
        next: -1,
        text: 'Sort Descending',
      };
    case -1:
      return {
        icon: 'mdi:sort-descending',
        next: 2,
        text: 'Remove sort',
      };
    default:
      return {
        icon: 'mdi:sort',
        next: 1,
        text: 'Sort Ascending',
      };
  }
};

export default getSort;