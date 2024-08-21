describe('twoday task', () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.window().then((win) => {
        win.sessionStorage.clear()
        })
      })

    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/');
        cy.get('.logo > img').should('be.visible').and('have.attr', 'src', 'https://magento.softwaretestingboard.com/pub/static/version1695896754/frontend/Magento/luma/en_US/images/logo.svg');
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });

    it('Scenario One', () => {
        // Step 1
        cy.get('#ui-id-5').trigger('mouseover');
        cy.get('#ui-id-17').trigger('mouseover');
        cy.get('#ui-id-20').click();
        cy.get('.base').should('contain.text', 'Hoodies & Sweatshirts');

        // Step 2
        cy.get(':nth-child(3) > #toolbar-amount > :nth-child(2)').invoke('text').then((text) => {
            const expectedHoodieItemPerPageCount = parseInt(text, 10);
        cy.get('.product-item-info .product-image-photo').should('have.length', expectedHoodieItemPerPageCount);
        });

        // Step 3
        cy.contains('.product-item-info .name .product-item-link', 'Frankie Sweatshirt').click();
        cy.get('.base').should('contain.text', "Frankie Sweatshirt");
    
        // Step 4
        cy.get('#option-label-size-143-item-169').click();
        cy.get('#option-label-color-93-item-60').click();
    
        let itemSelectQuantitySweatshirt = 3;
        cy.get('#qty').clear().type(itemSelectQuantitySweatshirt);
    
        // Step 5
        cy.get('#product-addtocart-button > span').click();
        cy.get('.counter-number').should('not.be.empty');
        cy.get('.counter-number').invoke('text').then((text) => {
            const shoppingCartQuantitySweatshirt = parseInt(text, 10);
        expect(shoppingCartQuantitySweatshirt).to.equal(itemSelectQuantitySweatshirt);
        })

        // Step 6
        let selectedItemNameSweatshirt;
        cy.get('.base').invoke('text').then((text => {
            selectedItemNameSweatshirt = text.replace(/\s+/g, ' ').trim();
        }))
        cy.get('.showcart').click();
        cy.get('#mini-cart > .item > :nth-child(1) > .product-item-details > .product-item-name > a').invoke('text').then((text) => {
            const shoppingCartItemNameSweatshirt = text.replace(/\s+/g, ' ').trim();
        expect(shoppingCartItemNameSweatshirt).to.equal(selectedItemNameSweatshirt);
        })
    
        // Step 7
        cy.get('#top-cart-btn-checkout').click();

        // step 8
        cy.get('#shipping > .step-title').should('include.text', 'Shipping Address');
        cy.get('#customer-email-fieldset > .required > .control > #customer-email').type('jane.doe@email.com');
        cy.get('[name="shippingAddress.firstname"]').type('Jane');
        cy.get('[name="shippingAddress.lastname"]').type('Doe');
        cy.get('[name="shippingAddress.street.0"]').type('Example street');
        cy.get('[name="shippingAddress.city"]').type('Exampleville');
        cy.get('[name="shippingAddress.postcode"]').type('12345');
        cy.get('[name="country_id"]').select('Cuba').should('have.value', 'CU');
        cy.get('[name="shippingAddress.telephone"]').type('12345678');
        cy.get('.checkout-shipping-method > .step-title').click().wait(2000);
        cy.get('.button').should('not.be.disabled').click();

        cy.get('.payment-group > .step-title').should('include.text', 'Payment Method');
        cy.get('.payment-method-content > :nth-child(4) > div.primary > .action > span').click();
        cy.get('.base').should('include.text', 'Thank you for your purchase!');

    })


    it('Scenario Two', () => {
        // Step 1
        cy.get('#ui-id-4').trigger('mouseover');
        cy.get('#ui-id-10').trigger('mouseover');
        cy.get('#ui-id-15').click();
        cy.get('.base').should('contain.text', 'Pants');

        // Step2
        cy.get(':nth-child(3) > .toolbar-sorter > #sorter').select('Price');

        let pantPrice1, pantPrice2
        cy.get(':nth-child(1) > .product-item-info > .details > .price-box > .normal-price > .price-container').invoke('text').then((priceText) => {
            pantPrice1 = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            })
        .then(() => {
        return cy.get(':nth-child(2) > .product-item-info > .details > .price-box > .normal-price > .price-container').invoke('text').then((priceText) => {
            pantPrice2 = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            }) 
        })
        .then(() => {
        expect(pantPrice1).to.be.a('number');
        expect(pantPrice2).to.be.a('number');
        expect(pantPrice1).to.be.lessThan(pantPrice2);
        })

        // Step 3
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
        cy.get('.base').should('contain.text', 'Karmen Yoga Pant');
        cy.get('#option-label-size-143-item-171').click();
        cy.get('#option-label-color-93-item-49').click();
        cy.get('#product-addtocart-button').click();

        cy.get('.counter-number').should('not.be.empty');
        cy.get('.counter-number').invoke('text').then((text) => {
            const firstShoppingCartQuantity = parseInt(text, 10);
        expect(firstShoppingCartQuantity).to.equal(1);
        })

        // Step 4
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
        cy.get('#option-label-size-143-item-171').click();
        cy.get('#option-label-color-93-item-57').click();
        cy.get('#product-addtocart-button').click();

        cy.get('.counter-number').should(($counter) => {
            const secondShoppingCartQuantity = parseInt($counter.text(), 10);
        expect(secondShoppingCartQuantity).to.equal(2);
        })

        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
        cy.get('#option-label-size-143-item-172').click();
        cy.get('#option-label-color-93-item-49').click();
        cy.get('#product-addtocart-button').click();

        cy.get('.counter-number').should(($counter) => {
            const thirdShoppingCartQuantity = parseInt($counter.text(), 10);
        expect(thirdShoppingCartQuantity).to.equal(3);
        })

        // Step 5
        cy.get('.showcart').click();
        cy.get('.count').invoke('text').then((text) => {
            const shoppingCartQuantityBeforeDeletion = parseInt(text, 10);
        expect(shoppingCartQuantityBeforeDeletion).to.equal(3);
        })

        cy.get(':nth-child(1) > :nth-child(1) > .product-item-details > .actions > .secondary > .action').click();
        cy.get('.action-primary > span').click();

        cy.get('.count').should(($cartCount) => {
            const shoppingCartQuantityAfterDeletion = parseInt($cartCount.text(), 10);
        expect(shoppingCartQuantityAfterDeletion).to.equal(2);
        })

        // Step 6
        cy.get(':nth-child(7) > .secondary > .action > span').click();

        // Step 7
        let suggestedItemName;
        cy.get(':nth-child(4) > .product-item-info > .details > .name > .product-item-link').invoke('text').then((text) => {
            suggestedItemName = text.replace(/\s+/g, ' ').trim();
        cy.get(':nth-child(4) > .product-item-info > .details > .actions > .actions-primary > form > .action > span').click();
        })
        cy.get(':nth-child(5) > .item-info > .item > .product-item-details > .product-item-name > a').invoke('text').then((text) => {
            const suggestedItemNameAfterAdd = text.replace(/\s+/g, ' ').trim();
        expect(suggestedItemNameAfterAdd).to.equal(suggestedItemName)
        })

        // Step 8
        cy.get('.checkout-methods-items > :nth-child(1) > .action > span').click();
        cy.get('#shipping > .step-title').should('include.text', 'Shipping Address');
        cy.get('#customer-email-fieldset > .required > .control > #customer-email').type('jane.doe@email.com');
        cy.get('[name="shippingAddress.firstname"]').type('Jane');
        cy.get('[name="shippingAddress.lastname"]').type('Doe');
        cy.get('[name="shippingAddress.street.0"]').type('Example street');
        cy.get('[name="shippingAddress.city"]').type('Exampleville');
        cy.get('[name="shippingAddress.postcode"]').type('12345');
        cy.get('[name="country_id"]').select('Cuba').should('have.value', 'CU');
        cy.get('[name="shippingAddress.telephone"]').type('12345678');
        cy.get('.checkout-shipping-method > .step-title').click().wait(2000);
        cy.get('.button').should('not.be.disabled').click();

        cy.get('.payment-group > .step-title').should('include.text', 'Payment Method');
        cy.get('.payment-method-content > :nth-child(4) > div.primary > .action > span').click();
        cy.get('.base').should('include.text', 'Thank you for your purchase!');
    
    })
})

