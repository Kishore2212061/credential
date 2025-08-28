import Template from "../models/Template.js";

export const createOrUpdateTemplate = async (req, res) => {
  try {
    if (req.user.role !== "organization") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, description, title, program, html, css } = req.body;
    const organization = req.user.id; // Get organization ID from JWT

    const template = await Template.findOneAndUpdate(
      { name, organization }, // Match by name and organization
      { 
        $set: { 
          description, 
          title,       // new
          program,     // new
          html, 
          css, 
          organization 
        } 
      },
      { upsert: true, new: true }
    );

    res.json(template);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getTemplate = async (req, res) => {
  try {
    if (req.user.role !== "organization") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const template = await Template.findOne({
      _id: req.params.id,
      organization: req.user.id // Ensure template belongs to the organization
    });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const listTemplates = async (req, res) => {
  try {
    if (req.user.role !== "organization") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const templates = await Template.find({ organization: req.user.id });
    res.json(templates);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};