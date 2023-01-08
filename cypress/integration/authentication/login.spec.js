describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign In");

    cy.get("input[name=email]")
      .should("have.attr", "placeholder", "Email Address")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

      cy.get("input[name=password]")
      .should("have.attr", "placeholder", "Password")
      .should("have.attr", "type", "password")
      .type("password")
      .should("have.value", "password");

      cy.get("button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd").click()

      cy.get("input[name=password]")
      .should("have.attr", "type", "text")


      cy.get("button").contains('Sign In').click()
      
      cy.get("div.MuiSnackbarContent-message").should("be.visible");

      cy.contains('Home Page').click()
  });
});
