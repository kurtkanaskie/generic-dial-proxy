 function getDialValue (dialWeight ) {
    // Set to false, use non-legacy 
    if( dialWeight === null || dialWeight > 99 ) { return false; }
    
    // Set to true, use legacy
    if( dialWeight < 2 ) { return true; }
    
    // Legacy is lower, non-legacy is higher
    var r = Math.floor(Math.random() * 100);
    context.setVariable( "random", r);
    return ( r > dialWeight );
 }
    
var dialPercent = context.getVariable("dialPercent");
if(dialPercent !== null) {
    context.setVariable("useLegacy", ""+getDialValue(dialPercent));
} else {
    context.setVariable("useLegacy", true);
}