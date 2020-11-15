const yaml = require('js-yaml');
const YAML = require('yaml')
const fs = require('fs')
const facts = {
    facts: [{
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
    }]
};

// facts.facts.map()
const file = fs.readFileSync('./facts.yml', 'utf8')
// console.log(YAML.stringifyDowNPM (facts));;
// console.log(JSON.stringify(YAML.parse(file),null,2));
console.log(JSON.stringify(yaml.safeLoad(file),null,2));