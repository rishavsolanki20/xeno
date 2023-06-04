const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contact_list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('contacts', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.get('/contacts', async (req, res) => {
  try{
    const data = await Contact.find();
    res.send(data);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

app.post('/contacts', async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = new Contact({ name, email, phone });
  
  try{
    const dataToSave = await newContact.save(); 
    res.status(200).json(dataToSave);
  }
  catch(error){
    res.status(400).json({message: error.message});
  }
});

app.put('/contacts/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = {new : true};

    const result = await Contact.findByIdAndUpdate(
      id, updatedData, options
    )
    res.send(result)
  }
  catch(error){
    res.status(400).json({message: error.nessage});
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Contact.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
