import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import exp from "constants";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("all created notes are displayed on the page", () => {
    render(<StickyNotes />);
    const notes = [
        {title: "Note 1", content: "Note 1 content"},
        {title: "Note 2", content: "Note 2 content"},
        {title: "Note 3", content: "Note 3 content"},
    ]
    notes.forEach(note=>{
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: note.title } });
        fireEvent.change(createNoteContentTextarea, { target: { value: note.content } });
        fireEvent.click(createNoteButton);

        const noteTitle = screen.getByText(note.title);
        const noteContent = screen.getByText(note.content);

        expect(noteTitle).toBeInTheDocument();
        expect(noteContent).toBeInTheDocument();
    })

});
test("updates a note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    //create a note
    fireEvent.change(createNoteTitleInput, { target: { value: "Note to update" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note to update content" } });
    fireEvent.click(createNoteButton);

    //verify note is created and displayed
    const newNoteTitle = screen.getByText("Note to update");
    const newNoteContent = screen.getByText("Note to update content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    //update the note
    fireEvent.click(newNoteTitle);
    newNoteTitle.textContent = "Updated Note";
    fireEvent.blur(newNoteTitle);

    fireEvent.click(newNoteContent);
    newNoteContent.textContent = "Updated Note content";
    fireEvent.blur(newNoteContent);

    const updatedNoteTitle = screen.getByText("Updated Note");
    const updatedNoteContent = screen.getByText("Updated Note content");

    expect(updatedNoteTitle).toBeInTheDocument();
    expect(updatedNoteContent).toBeInTheDocument();

});

test("deletes a note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    //create a note
    fireEvent.change(createNoteTitleInput, { target: { value: "Note to delete" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note to delete content" } });
    fireEvent.click(createNoteButton);

    //verify note is created and displayed
    const newNoteTitle = screen.getByText("Note to delete");
    const newNoteContent = screen.getByText("Note to delete content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    //delete the note
    const deleteButton = screen.getAllByText("x")[0];
    fireEvent.click(deleteButton);

    //verify
    const deletedNoteTitle = screen.queryByText("Note to delete");
    const deletedNoteContent = screen.queryByText("Note to delete content");

    expect(deletedNoteTitle).not.toBeInTheDocument();
    expect(deletedNoteContent).not.toBeInTheDocument();
    
});




});