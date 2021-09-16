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
    const tosInput = () => cy.get('input[name=tos]'); //input is the tagname

    const submitBtn = () => cy.get('button[id=submit]'); //button is the tagName


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

    describe('Checking the Terms of Service Input', () => {

        it('can check the TOS box', () => {
            tosInput().click();
            tosInput().should('have.checked', 'true')
        })
    })

    describe('Checking to see if submit works after form completion', () => {

        it('can type in inputs and submits button', () => {
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

            tosInput().click();
            tosInput().should('have.checked', 'true')
            submitBtn().click()
        })

    })

    describe('Form validation if input is left empty', () => {

        it('can type in inputs with password missing', () => {
            nameInput()
                .should('have.value', '')
                .type('Jared')
                .should('have.value', 'Jared' )

            emailInput()
                .should('have.value', '')
                .type('Jared@gmail.com')
                .should('have.value', 'Jared@gmail.com' )

            tosInput().click();
            tosInput().should('have.checked', 'true')
        })

        it('Check to see if button is disabled', () => {
            submitBtn().should('be.disabled')
        })
    })
      
})
