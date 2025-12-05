import Note from "../models/Note.js";

export const getAllNotes = async (_req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in getAllNotes controller", error);
    }
};

export const getNoteByID = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found!!" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in getNoteByID controller", error);
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in createNote controller", error);
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
            },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found!!" });
        }
        res.status(200).json(updateNote);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in updateNote controller", error);
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found!!" });
        }
        res.status(200).json({ message: "Note deleted successfully!!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error in deletedNote controller", error);
    }
};
