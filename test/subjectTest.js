const assert = require('assert');
const SVO = require('../index');

describe('Subject Tests', ()=>{
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

    it('should allow subject(administrator) with profile "system_adm" to register books from everywhere', ()=>{

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

    it('should allow subject(manager) with profile "warehouse_manager" to register books from NY only', ()=>{

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

    it('should not Allow subject(employee) with profile "warehouse_auxiliar" to register books', ()=>{

        const employee = {
            profile: 'warehouse_auxiliar',
            name: 'Mike Doe',
            email: 'mike.doe@company.com'
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
                  .setSubjectAndObject(employee,bookFromNY)
                  .then((s,v,o)=>{
                    assert.ok(false);
                  })
                  .fail((s, v, o) => {
                    assert.ok(true);
                  })

        factsBuilt.setAction('register_books')
                  .setSubjectAndObject(employee,bookFromLA)
                  .then((s,v,o)=>{
                    assert.ok(false);
                  })
                  .fail((s, v, o) => {
                    assert.ok(true);
                  })
    });

    it('should throw an Error when subject is null', ()=>{

        const subject = null;

        const bookFromNY = {
            ISBN: '123-123123',
            name: 'The big adventures',
            state: 'NY'
        };
        
        const throwError = () => {
          factsBuilt.setAction('register_books')
                  .setSubjectAndObject(subject,bookFromNY)
                  .then((s,v,o)=>{
                    assert.ok(false);
                  })
                  .fail((s, v, o) => {
                    assert.ok(true);
                  })
        };
        assert.throws(throwError, Error, "(Subject (S)) should not be null");
    });
});


