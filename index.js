const SVO = require('./SVO');

const facts = [{
    fact: {
        action: 'register_books',
        label: 'Register books',
        rules: [
            "[subject.profile === 'system_adm']",
            "[object.state === 'NY', subject.profile === 'warehouse_manager']"
        ]
    }
}, {
    fact: {
        action: 'register_users',
        label: 'Register Users',
        rules: ["[subject.profile === 'system_adm']"]
    }
}];

(function testRegisterUserByWareHouseManager() {

    var requestSimulationScene = {
        subject: {
            profile: 'warehouse_manager',
            name: 'John Doe',
            email: 'john.doe@company.com'
        },
        action: 'register_books',
        object: {
            ISBN: '123-123123',
            name: 'The big adventures',
            state: 'NY'
        }
    };
    SVO.buildFacts(facts)
    [requestSimulationScene['action']]
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`>>> Book ${o.name} was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`>>> User "${s.name}" does not have access. `);
        }
        )
})();

(function testRegisterUserBySystemAdm() {

    var requestSimulationScene = {
        subject: {
            profile: 'system_adm',
            name: 'Mary Doe',
            email: 'mary.doe@company.com'
        },
        action: 'register_books',
        object: {
            ISBN: '123-123123',
            name: 'The big adventures',
            state: 'NY'
        }
    };
    SVO.buildFacts(facts)
    [requestSimulationScene['action']]
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`>>> Book ${o.name} was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`>>> User "${s.name}" does not have access. `);
        }
        )
})();


(function testRegisterUserByWareHouseManager() {

    var requestSimulationScene = {
        subject: {
            profile: 'warehouse_manager',
            name: 'John Doe',
            email: 'john.doe@company.com'
        },
        action: 'register_users',
        object: {
            profile: 'warehouse_manager',
            name: 'Ramirez Silva',
            email: 'ramirez.silva@company.com'
        }
    };
    SVO.buildFacts(facts)
    [requestSimulationScene['action']]
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`>>> User: ${o.name} was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`>>> User: "${s.name}" does not have access to Register: ${o.name} `);
        }
        )
})();