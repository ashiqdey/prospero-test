const Students = require('../models/student');
const { checkNan } = require('../utils/formatNumber');



exports.getStudents = async function (req, res) {
  let { search, sort_name, sort_id, page = 1, page_size = 3 } = req.query;

  try {
    // validate numbers
    page_size = checkNan(page_size, 'page_size');
    page = checkNan(page, 'page');
    sort_name = checkNan(sort_name, 'sort_name', [1, -1]);
    sort_id = checkNan(sort_id, 'sort_id', [1, -1]);




    // construct query
    const query = {};
    if (search) {

      // convert 'search' to number
      let searchInt = parseInt(search, 10);

      // 1 if 'search' is number then searh for id
      if (!Number.isNaN(searchInt)) {
        query.id = searchInt;
      }


      // 2 if string length > 0 then searh
      else if (search.length > 0) {
        search = search.toLowerCase();

        // 2.1 if incluses @ the search only email
        if (search.includes('@')) {
          query.email = { $regex: search }

          // query['$or'] = [
          //   { email: { $regex: search, '$options': 'i' } }
          // ];

        }

        // 2.2 'search' contains space, then only name
        else if (search.includes(' ')) {

          // break words into multiple query
          const names = search.split(' ');

          query['$or'] = names.map(name => ({ name: { $regex: name, '$options': 'i' } }))

          // query['$or'] = [
          //   { name: { $regex: search, '$options': 'i' } },
          // ];

        }

        // 2.3 for single word, search both name and email
        else {
          query['$or'] = [
            { name: { $regex: search } },
            { email: { $regex: search } }
          ];
        }
      }
    }


    // construct sort
    const sort = {};
    if (sort_name) {
      sort.name = sort_name;
    }
    if (sort_id) {
      sort.id = sort_id;
    }

    // pagination
    const skip = (page - 1) * page_size;

    console.log({ query: JSON.stringify(query), sort, page_size, skip });

    // find 
    const data = await Students.find(query)
      .sort(sort)
      .limit(page_size)
      .skip(skip);


    // get total rows count
    const totalRows = await Students.find(query).count();


    return res
      .status(200)
      .json({
        status: 200,
        total_page: Math.ceil(totalRows / page_size),
        page_size,
        page,
        data
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};



exports.addStudent = async function (req, res) {
  const { id, name, email, subjects } = req.body;

  try {
    if (!Array.isArray(subjects)) {
      throw new Error('subjects should be an array');
    }

    console.log({ l: 61, id, name, email, subjects });



    const isExists = await Students.findOne({ id });
    if (isExists) {
      throw new Error('ID already exists');
    }

    const student = new Students({ id, name, email: email.toLowerCase(), subjects })
    const data = await student.save()

    return res
      .status(200)
      .json({ status: 200, data });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 400, message: e.message });
  }
};


// ? Controller is responsible to send and receive data from/to the model.