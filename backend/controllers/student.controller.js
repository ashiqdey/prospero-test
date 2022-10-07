const Students = require('../models/student');
const { checkNan } = require('../utils/formatNumber');







exports.getStudents = async function (req, res) {
  let { search, sort_name, sort_id, sort_email, page = 1, page_size = 3 } = req.query;

  try {
    // validate numbers
    page_size = checkNan(page_size, 'page_size');
    page = checkNan(page, 'page');
    sort_name = checkNan(sort_name, 'sort_name', [1, -1]);
    sort_id = checkNan(sort_id, 'sort_id', [1, -1]);
    sort_email = checkNan(sort_email, 'sort_email', [1, -1]);



    // construct query
    const query = {};
    if (search) {

      // if string length > 0 then searh
      if (search.length > 0) {
        search = search.toLowerCase();
        /*
          // 2.1 if incluses @ the search only email
          if (search.includes('@')) {
            query.email = { $regex: search }
          }
  
          // 2.2 'search' contains space, then only name
          else if (search.includes(' ')) {
  
            // break words into multiple query
            const names = search.split(' ');
  
            query['$or'] = names.map(name => ({ name: { $regex: name, '$options': 'i' } }))
          }
  
          // 2.3 for single word, search both name and email
          else {
            
          }
        */

        query['$or'] = [
          { name: { $regex: search, '$options': 'i' } },
          { name: { $regex: search, '$options': 'i' } },
          { email: { $regex: search } },
          { subjects: { $regex: search, '$options': 'i' } }
        ];

        // convert 'search' to number
        //  if 'search' is number then searh for id
        let searchInt = parseInt(search, 10);
        if (!Number.isNaN(searchInt)) {
          query['$or'].push({ _id: searchInt });
        }
      }
    }


    // construct sort
    const sort = {};
    if (sort_name) {
      sort.name = sort_name;
    }
    if (sort_id) {
      sort._id = sort_id;
    }
    if (sort_email) {
      sort.email = sort_email;
    }

    // pagination
    const skip = (Math.max(page - 1, 0)) * page_size;

    console.log({ query: JSON.stringify(query), sort, page, page_size, skip });

    // find 
    const data = await Students.find(query)
      .sort(sort)
      .limit(page_size)
      .skip(skip);


    // get total rows count
    const totalRows = await Students.find(query).count();
    const totalPages = Math.ceil(totalRows / page_size);

    return res
      .status(200)
      .json({
        status: 200,
        total_page: totalPages,
        page_size,
        page: page > totalPages ? totalPages : page,
        data
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};



exports.addStudent = async function (req, res) {
  const { name, email, subjects } = req.body;

  try {
    if (!Array.isArray(subjects)) {
      throw new Error('subjects should be an array');
    }

    const student = new Students({ name, email: email.toLowerCase(), subjects })
    const data = await student.save()

    return res
      .status(200)
      .json({ status: 200, data });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, message: e.message });
  }
};



exports.addStudent = async function (req, res) {
  const { name, email, subjects } = req.body;

  try {
    if (!Array.isArray(subjects)) {
      throw new Error('subjects should be an array');
    }

    const student = new Students({ name, email: email.toLowerCase(), subjects })
    const data = await student.save()

    return res
      .status(200)
      .json({ status: 200, data });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, message: e.message });
  }
};






function getSubjects() {
  const allsubjects = [
    'Science',
    'Mathematics',
    'English',
    'Environmental sceience',
    'Computer',
    'Hindi',
    'Social science',
    'Music'
  ];

  const subjects = [];

  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * 10);
    if (allsubjects[index]) {
      subjects.push(allsubjects[index]);
    }
  }

  return subjects;
}


exports.addDummyStudent = async function (req, res) {
  try {
    const name = ["Ashiq", "Mike", "Jhon", "Kevin", "Alex", "Daisy", "Mou", "Shayam"];

    for (let i = 0; i < name.length; i++) {

      const student = new Students({
        name: `${name[i]} ${4}`,
        email: `${name[i].toLowerCase()}.${4}@email.com`,
        subjects: getSubjects()
      })
      await student.save()
    }

    return res
      .status(200)
      .json({ status: 200 });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, message: e.message });
  }
};

