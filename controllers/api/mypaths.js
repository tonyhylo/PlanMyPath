// const items = require('../../models/item');
const Mypath = require("../../models/mypath");

module.exports = {
  index,
  show,
  create,
  edit,
  delete: deletePath,
};

async function index(req, res) {
  // const mypaths = await Mypath.find({}).sort('name').populate('category').exec();
  const mypaths = await Mypath.find({}).exec();
  // re-sort based upon the sortOrder of the categories
  // items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(mypaths);
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}

async function create(req, res) {
  console.log("entered create");
  const mypath = new Mypath(req.body);
  console.log("req.body: ", req.body);
  // Assign the logged in user's id
  // book.user = req.user._id;
  mypath.save(function (err, doc) {
    console.log("saved");
    console.log(err);
    // if (err) return render(mypath);
    if (err) return res.json({error: "error"});
    // Probably want to go to newly added book's show view
    {
      /* res.json(`/books/${book._id}`); */
    }
    console.log("successful save");
    res.json(doc);
  });
}

async function edit(req, res) {
  // Book.findById(req.params.id, function(err, book) {
  // Mypath.findById(req.params.id, function (err, path) {
    Mypath.findByIdAndUpdate(req.params.id, req.body, function(err, doc) {
      if (err) { 
        console.log(err) ;
      }
      res.json(doc);
    });
    // Verify book is "owned" by logged in user
    // if (!path.user.equals(req.user._id)) return res.redirect("/");
    // res.render("paths/edit", { path });
    // if (!path.user.equals(req.user._id)) return res.redirect("/");
    // res.render("paths/edit", { path });
  // });
}

async function deletePath(req, res) {
  console.log(`req.params: ${req.params}`)
  Mypath.findById(req.params.id, function (err, path) {
    console.log(`req.params.id: ${req.params.id}`);
    console.log(`path: ${path}`);
    // console.log(`err: ${err}`);
    path.remove(req.params.id);
    res.json({message: "ok"});
  });
};