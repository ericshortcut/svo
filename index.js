const PermissionEngine = require('./PermissionEngine');
const foldEngine = require('./foldEngine');

module.exports.buildFacts = (facts)=>{
    const indexActions = facts.reduce((base,item)=>{
        base[item.fact.action] = {
    
            setSubjectAndObject: (subject,object)=>{
                if(subject === null){
                    throw new Error("(Subject (S)) should not be null");
                }
                if(object === null){
                    throw new Error("(Object (O)) should not be null");
                }
                const permissionEng = new PermissionEngine({
                    subject: subject,
                    action: item.fact.action,
                    object: object
                })
                return foldEngine(item.fact.rules.map(i=>eval(i)), permissionEng);
            }
        }
        return base;
    }
    , {});

    return {
        setAction: (action)=>{
            if (indexActions[action]){
                return indexActions[action];
            }else{
                throw new Error(`Action (${action}) not found`);
            }
        }
    }
};