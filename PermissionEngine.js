
module.exports = class PermissionEngine {
    constructor(fact) {
        const valid = [];
        const ruleScheme = {

            when: (callback)=>{
                valid.push(this.validateAll(callback(fact.subject, fact.action, fact.object)));
                return ruleScheme;
            }
            ,
            then: (callback)=>{
                if (this.validateOr(valid)) {
                    callback(fact.subject, fact.action, fact.object);
                }
                return ruleScheme;
            }
            ,
            fail: (callback)=>{
                if (!this.validateOr(valid)) {
                    callback(fact.subject, fact.action, fact.object);
                }
            }
        };
        return ruleScheme;
    }

    validateAll(toBeValidated) {
        return toBeValidated.reduce((acc,v,index)=>{
            return (index === 0 ? v : acc && v)
        }
        , false);
    }
    validateOr(toBeValidated) {
        return toBeValidated.reduce((acc,v,index)=>{
            return acc || v;
        }
        , false);
    }

}