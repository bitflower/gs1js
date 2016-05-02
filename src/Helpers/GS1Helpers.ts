import * as helpers from './Helpers';
import GS1Assets from './GS1Assets';
import ApplicationIdentifier from '../ApplicationIdentifier';

// Helper: Reads positions of group separator symbols (ascii 29)
export function getGroupSeparators(ascii) {
    var grp = [];
    for (var i = 0; i < ascii.length; i++) {
        if (ascii[i] === 29) {
            grp.push(i);
        }
    }
    return grp;
}

// Split array at group separators
export function splitBinAtGS(bytes, gs) {
    var parts = [];
    var start = 0;
    for (var i = 0; i <= gs.length; i++) {
        if (i < gs.length) {
            parts.push(bytes.slice(start, gs[i]));
            start = gs[i] + 1;
        } else {
            parts.push(bytes.slice(start));
        }
    }
    return parts;
}
// Extract IDs of group separators
export function extractGSIds(bytes:any[], gs:number[]):ApplicationIdentifier[] {
    
    var parts = splitBinAtGS(bytes, gs);
    var ids: ApplicationIdentifier[] = [];

    // Get first identifier on position 1
    //ids[0] = helpers.bin2String(parts[0]);
    //ids.push(new ApplicationIdentifier(id.toString(), helpers.bin2String(part.slice(2))));

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var id = parseInt(String.fromCharCode(part[0]) + String.fromCharCode(part[1]));
        //ids[id] = helpers.bin2String(part.slice(2));
        
        ids.push(new ApplicationIdentifier(id.toString(), helpers.bin2String(part.slice(2))));
        
    }

    return ids;

}

export function extractFixIds(code:string):ApplicationIdentifier[] {
    
    // Minimum length is 2
    if (code.length <= 1) {
        return [];
    }
    
    var ids: ApplicationIdentifier[] = [];
    
    // Loop over all available, predefined, fixed length identifiers
    for( var i=0, l=GS1Assets.FIXED_LENGTH_IDENTIFIERS.length; i<l; i++ ) {
        
        if (code.length <= 1) {
            break;
        }
        
        // Check if the first 2 chars match one of the predefined identifiers
        if (code.substr(0, 2) === GS1Assets.FIXED_LENGTH_IDENTIFIERS[i].ai) {
    
            // Cut off the 2 digits of the identifier from the code
            code = code.substring(2);
            
            // Extract length of idenditifer from code
            ids.push(new ApplicationIdentifier(GS1Assets.FIXED_LENGTH_IDENTIFIERS[i].ai, code.substring(GS1Assets.FIXED_LENGTH_IDENTIFIERS[i].length)));
            
            // Cut off code length from code snippet
            code = code.substring(GS1Assets.FIXED_LENGTH_IDENTIFIERS[i].length);
            
        }
        
    }
    
    return ids;
    
}