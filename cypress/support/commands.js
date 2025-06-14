// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('changeInputValue', (selector, value) => {
    cy.get(selector).then(($input) => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call($input[0], value);
        $input[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
});

Cypress.Commands.add("reactComponent", {
    prevSubject: "element"
}, ($el) => {
    if ($el.length !== 1) {
        throw new Error(`cy.component() requires element of length 1 but got ${$el.length}`);
    }
    // Query for key starting with __reactInternalInstance$ for React v16.x
    const key = Object.keys($el.get(0)).find((key) => key.startsWith("__reactFiber$"));
    const domFiber = $el.prop(key);
    Cypress.log({
        name: "component",
        consoleProps() {
            return {
                component: domFiber,
            };
        },
    });
    return domFiber.return;
});
