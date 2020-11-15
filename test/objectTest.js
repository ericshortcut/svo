const assert = require('assert');
const SVO = require('../index');

describe('Object Tests', ()=>{
    const facts = [{
            fact: {
                action: 'register_books',
                label: 'Register books',
                rules: [
                    "[subject.profile === 'system_adm']",
                    "[object.state === 'NY', subject.profile === 'warehouse_manager']"
                ]
            }
        }
    ];

    const factsBuilt = SVO.buildFacts(facts);

    it('should allow object(book) to register be registered by "system_adm"', ()=>{

        const warehouseManager = {
            profile: 'system_adm',
            name: 'Jane Doe',
            email: 'jane.doe@company.com'
        };

        const bookFromNY = {
            ISBN: '123-123123',
            name: 'The big adventures',
            state: 'NY'
        };

        const bookFromLA = {
            ISBN: '123-123124',
            name: 'The big adventures V2',
            state: 'LA'
        };
        
        factsBuilt.setAction('register_books')
                  .setSubjectAndObject(warehouseManager,bookFromNY)
                  .then((s,v,o)=>{
                    assert.ok(true);
                  })
                  .fail((s, v, o) => {
                    assert.ok(false);
                  })

        factsBuilt.setAction('register_books')
                  .setSubjectAndObject(warehouseManager,bookFromLA)
                  .then((s,v,o)=>{
                    assert.ok(true);
                  })
                  .fail((s, v, o) => {
                    assert.ok(false);
                  })
    });

    it('should allow object(book) to register be registered by "warehouse_manager" only if the book\'s state is equal to NY', ()=>{

        const warehouseManager = {
            profile: 'warehouse_manager',
            name: 'John Doe',
            email: 'john.doe@company.com'
        };

        const bookFromNY = {
            ISBN: '123-123123',
            name: 'The big adventures',
            state: 'NY'
        };

        const bookFromLA = {
            ISBN: '123-123124',
            name: 'The big adventures V2',
            state: 'LA'
        };
        
        factsBuilt.setAction('register_books')
                  .setSubjectAndObject(warehouseManager,bookFromNY)
                  .then((s,v,o)=>{
                    assert.ok(true);
                  })
                  .fail((s, v, o) => {
                    assert.ok(false);
                  })

        factsBuilt.setAction('register_books')
                  .setSubjectAndObject(warehouseManager,bookFromLA)
                  .then((s,v,o)=>{
                    assert.ok(false);
                  })
                  .fail((s, v, o) => {
                    assert.ok(true);
                  })
    });
});


