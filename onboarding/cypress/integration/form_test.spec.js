describe("Form App", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        });
    it("sanity check", () => {
        expect(1 + 1).to.equal(2);
      });

    //Creating Helpers to centralize CSS selectors / DOM grabbing
    const nameInput = () => cy.get('input[name=first_name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]'); 


    describe('Filling out the inputs', () => {
       
        it('can type in inputs', () => {
            nameInput()
                .should('have.value', '')
                .type('Jared')
                .should('have.value', 'Jared' )

            emailInput()
                .should('have.value', '')
                .type('Jared@gmail.com')
                .should('have.value', 'Jared@gmail.com' )
            
            passwordInput()
                .should('have.value', '')
                .type('password')
                .should('have.value', 'password' )
        })
        
    })
      
})
