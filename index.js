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

(function testBookRegisteringByWareHouseManager() {
    console.log("\n--------1st scenario--------\n")
    const requestSimulationScene = {
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
    console.log(
    SVO.buildFacts(facts)
        .setAction(requestSimulationScene['action'])
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`\n>>> Book "${o.name}" was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`\n>>> User "${s.name}" does not have access. `);
        }
        )
    )
})();

(function testBookRegisteringBySystemAdm() {
    console.log("\n--------2nd scenario--------\n")
    const requestSimulationScene = {
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
        .setAction(requestSimulationScene['action'])
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`\n>>> Book ${o.name} was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`\n>>> User "${s.name}" does not have access. `);
        }
        )
})();


(function testRegisterUserByWareHouseManager() {
    console.log("\n--------3rd scenario--------\n")
    const requestSimulationScene = {
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
        .setAction(requestSimulationScene['action'])
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`\n>>> User: ${o.name} was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`\n>>> User: "${s.name}" has no access rights to Register: ${o.name} `);
        }
        )
})();