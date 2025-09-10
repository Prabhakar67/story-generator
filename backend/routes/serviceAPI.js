import express from 'express';
import ServiceEntry from '../models/ServiceSchema.js';

const router = express.Router();


// Search service entries by customer name
router.get('/search', async (req, res) => {
  try {
    const { customerName } = req.query;
    if (!customerName) {
      return res.status(400).json({ message: 'customerName query is required' });
    }
    const entries = await ServiceEntry.find({ customerName }).sort({ serviceDate: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create a new bike service entry
router.post('/saveServiceEntry', async (req, res) => {
  try {
    const { customerName, bikeModel, bikeNumber, serviceDate } = req.body;

    const serviceEntry = new ServiceEntry({
      customerName,
      bikeModel,
      bikeNumber,
      serviceDate
    });

    const newServiceEntry = await serviceEntry.save();
    res.status(201).json(newServiceEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all service entries
router.get('/getAllServiceEntries', async (req, res) => {
  try {
    const serviceEntries = await ServiceEntry.find().sort({ serviceDate: -1 });
    res.json(serviceEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single service entry
router.get('/:id', async (req, res) => {
  try {
    const serviceEntry = await ServiceEntry.findById(req.params.id);
    if (!serviceEntry) {
      return res.status(404).json({ message: 'Service entry not found' });
    }
    res.json(serviceEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a service entry
router.put('/:id', async (req, res) => {
  try {
    const { customerName, bikeModel, bikeNumber, serviceDate } = req.body;
    const updatedEntry = await ServiceEntry.findByIdAndUpdate(
      req.params.id,
      { customerName, bikeModel, bikeNumber, serviceDate, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Service entry not found' });
    }
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service entry
router.delete('/deleteServiceEntry/:id', async (req, res) => {
  try {
    const serviceEntry = await ServiceEntry.findById(req.params.id);
    if (!serviceEntry) {
      return res.status(404).json({ message: 'Service entry not found' });
    }
    await ServiceEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
