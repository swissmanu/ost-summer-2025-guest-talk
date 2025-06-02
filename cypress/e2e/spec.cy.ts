describe("spec.cy.ts", () => {
  it("can manage a todo", () => {
    cy.visit("localhost:3001");

    // Create New Todo
    cy.get('[href="/todo"]').click();
    cy.get("#inputTitle").type("Shop for groceries");
    cy.get("#inputImportance").type("2");
    cy.get("input.btn").click();

    // Check if Todo was created
    cy.get(":nth-child(1) > .todo-title > :nth-child(1)").should(
      "contain.text",
      "Shop for groceries"
    );

    // Edit & Complete Todo
    cy.get(":nth-child(1) > .todo-action > .btn").click();
    cy.get("#inputFinished").click();
    cy.get("input.btn").click();
    cy.get(":nth-child(1) > .todo-finished > input").should("be.checked");

    // Filter Completed Todo
    cy.get(".action-container > .flex-spacer").click();
    cy.get(":nth-child(1) > .todo-title > :nth-child(1)").should(
      "not.contain.text",
      "Shop for groceries"
    );
  });
});