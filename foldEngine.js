module.exports = function foldEngine(rules,engine){
    if (rules.length) {
        let rule = rules.pop();
        engine.when((sub,action,obj)=>rule);
        return foldEngine(rules, engine);
    }
    return engine;
}