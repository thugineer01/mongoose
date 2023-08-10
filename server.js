// Import required modules
const mongoose = require('mongoose');

// MongoDB Atlas URI
const mongoURL = "mongodb+srv://<username>:<password>x@cluster0.009axmm.mongodb.net/";

// Connect to the database
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a model for the Person schema
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createPerson = async () => {
  console.log("Creating a new person...");
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  try {
    const data = await person.save();
    console.log("Person saved:", data);
  } catch (err) {
    console.error(err);
  }
};

// Create Many Records with model.create()
const createManyPeople = async (arrayOfPeople) => {
  console.log("Creating multiple people...");
  try {
    const data = await Person.create(arrayOfPeople);
    console.log("People saved:", data);
  } catch (err) {
    console.error(err);
  }
};

// Use model.find() to Search Your Database
const findPeopleByName = async (personName) => {
  try {
    const data = await Person.find({ name: personName });
    console.log("People found:", data);
  } catch (err) {
    console.error(err);
  }
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log("Person found:", data);
  } catch (err) {
    console.error(err);
  }
};

// Use model.findById() to Search Your Database By _id
const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId);
    console.log("Person found:", data);
  } catch (err) {
    console.error(err);
  }
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log("Person not found");
      return;
    }

    person.favoriteFoods.push('Hamburger');
    const data = await person.save();
    console.log("Person updated:", data);
  } catch (err) {
    console.error(err);
  }
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async (personName) => {
  try {
    const data = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Person updated:", data);
  } catch (err) {
    console.error(err);
  }
};

// ... Define other functions ...

// Run the functions
createPerson();
createManyPeople([
  { name: 'Alice', age: 30, favoriteFoods: ['Sushi', 'Salad'] },
  { name: 'Bob', age: 28, favoriteFoods: ['Pasta', 'Ice Cream'] }
]);
findPeopleByName('John Doe');
findOnePerson('Pizza');
findPersonById('64cb7ca27c67fd17d5e10249');
findEditThenSave('your_person_id');
findAndUpdate('John Doe');

// ... Run other functions ...

// Export the functions
module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOnePerson,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  // ... Export other functions ...
};