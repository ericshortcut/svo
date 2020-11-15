const assert = require('assert');
const SVO = require('../index');

describe('Action Tests', ()=>{

    it('should allow subject(administrator) with profile "system_adm" to call "register books" action', ()=>{
        const facts = [{
                fact: {
                    action: 'register_books',
                    label: 'Register books',
                    rules: [
                        "[subject.profile === 'system_adm']"
                    ]
                }
            }
        ];

        const factsBuilt = SVO.buildFacts(facts);
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

    });

    it('should throw Error when action does not exist', ()=>{
        const facts = [{
                fact: {
                    action: 'register_books',
                    label: 'Register books',
                    rules: [
                        "[subject.profile === 'system_adm']"
                    ]
                }
            }
        ];

        const factsBuilt = SVO.buildFacts(facts);
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
        
        assert.throws(()=> factsBuilt.setAction('delete_books'), Error, "Action (delete_books) not found");

    });

});


