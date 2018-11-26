# SVO - Subject Verb Object (Business Rule Engine)

It's a Business Rule Engine for nodejs projects. You just input facts and run it.
It's based on the **linguistic typology** and can be used in many scenarios - even though it's **very specific* or broadly

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to install nodejs and npm

 - [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installing the lib

To add the lib to your project just use npm

```
npm install --save svo
```
Done, now lets import to the code, write some **facts**

```
//index.js
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
```
Then we write the function `SVO.buildFacts` and pass the subject and object of the action (whichever you want try out ).
Let`s say we have the following scenario:
> Some user (John Doe) wants to register a book. So the request **action** comes from the endpoint and **subject** from request session, or token (E.g. JWT), and  the body is the actual **object**.

```
//index.js
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

    SVO.buildFacts(facts)
        .setAction(requestSimulationScene['action'])
        .setSubjectAndObject(requestSimulationScene.subject, requestSimulationScene.object)
        .then((s, v, o) => {
            console.log(`\n>>> Book "${o.name}" was registered`, s, v, o);
        }
        ).fail((s, v, o) => {
            console.log(`\n>>> User "${s.name}" does not have access. `);
        }
        );
    
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
        );
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
        );
})();
```
and then run it `node index.js` or `npm start`

```
// output

--------1st scenario--------


>>> Book "The big adventures" was registered { profile: 'warehouse_manager',
  name: 'John Doe',
  email: 'john.doe@company.com' } register_books { ISBN: '123-123123', name: 'The big adventures', state: 'NY' }
undefined

--------2nd scenario--------


>>> Book The big adventures was registered { profile: 'system_adm',
  name: 'Mary Doe',
  email: 'mary.doe@company.com' } register_books { ISBN: '123-123123', name: 'The big adventures', state: 'NY' }

--------3rd scenario--------


>>> User: "John Doe" has no access rights to Register: Ramirez Silva
```

## Built With

* [node](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [npm](https://maven.apache.org/) - Dependency Management

## Contributing (future)

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning (future)

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Eric Andrade** - 

### Contributors (future)
See also the list of [contributors](https://github.com/ericshortcut/svo/contributors) who participated in this project.

## License (future)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspiration : linguistic typology


