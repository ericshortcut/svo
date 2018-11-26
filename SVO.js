const PermissionEngine = require('./PermissionEngine');
const foldEngine = require('./foldEngine');

module.exports.buildFacts = (facts)=>{
    const indexActions = facts.reduce((base,item)=>{
        base[item.fact.action] = {
    
            setSubjectAndObject: (subject,object)=>{
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
                throw `Action (${action}) not found`;
            }
        }
    }
};