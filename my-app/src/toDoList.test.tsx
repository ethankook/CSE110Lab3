import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import exp from "constants";
import { dummyGroceryList } from "./constant";

describe("To Do List", () => {
    test("each item in list is shown on screen", () => {
        render(<ToDoList />);
        
        dummyGroceryList.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    test("number of checked items the same as shown in title", () => {
        render(<ToDoList />);
        let count = 0;
        dummyGroceryList.forEach(item => {
            if(item.isPurchased){
                count++;
            }
        });

        expect(screen.getByText(`Items bought: ${count}`)).toBeInTheDocument();
    });
});