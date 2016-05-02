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

// Remove faulty first GS (ASCII 29) from code
// Some scanner deliver the Code 232 as GS / ASCII 29
export function cleanStart(bytes) {
    
    if (bytes && bytes.length > 0 && bytes[0] == 29) {
        bytes.shift();
    }
    
    return bytes;
    
}

export function extractIds(code:string):ApplicationIdentifier[] {
    
    // Minimum length is 2
    if (code.length <= 1) {
        return [];
    }
    
    // Clone code content to work with
    var codeWorking = code;
    
    // Array to hold the found AIs
    var ids: ApplicationIdentifier[] = [];
    
    // Loop through code - char by char
    // Parts of the code are borrowed from BarkJS
    // https://github.com/Sleavely/Bark-JS/blob/master/lib/bark.js
    var gap:number = 1;
    var startPos:number = 0;   
    
    // debugger;
    while(startPos < codeWorking.length) {
        
        
        // Notbremse
        if (gap > 300) {
            break;
        }
                      
        var guessAI:string = codeWorking.substr(startPos, gap);

        // At the end of an AI value: check if there is a GS / ASCII 29 char
        // which indicates the beginning of a dynamic length AI
        var binArray = helpers.getASCIIArray(guessAI);
        var isGS:boolean = binArray[binArray.length - 1] == 29;
        
        if (!isGS) {
            
            // Check if there exists an fixed-length AI for this guess
            var fixedLengthAI = GS1Assets.getFixedLengthIdentifier(guessAI);
            
            // Every time we cant guess the next AI we make the gap just a little bigger.
            // Otherwise jump.        
            if(!fixedLengthAI) {
                
                // End reached / last AI
                if (startPos + gap >= codeWorking.length) {
                    
                    // Read dynamic length AI
                    var dynamicAI:string = codeWorking.substr(startPos, gap);
                    
                    // Extraxt ID
                    var id:string = dynamicAI.substr(0, 2);
                    var value:string = dynamicAI.substr(2);
                    
                    // Push new AI to array            
                    ids.push(new ApplicationIdentifier(id, value));
                    
                    break;
                }
                
                // I.e. if we just tried to find a method for "0" in the string "015730033004934115160817", try "01" next time
                gap++;

            }
            else {
                
                var lenId:number = fixedLengthAI.ai.length;
                
                // Extract value
                var idValue:string = codeWorking.substr(startPos + lenId, fixedLengthAI.length - lenId)
                
                // Push new AI to array            
                ids.push(new ApplicationIdentifier(fixedLengthAI.ai, idValue));
                
                // The AI parser will return the end position of its data
                startPos += fixedLengthAI.length;
                gap = 1;
            }
        }
        else {
                        
            // Read dynamic length AI
            var dynamicAI:string = codeWorking.substr(startPos, gap);
            
            // Extraxt ID
            var id:string = dynamicAI.substr(0, 2);
            var value:string = dynamicAI.substr(2);
            
            // Push new AI to array            
            ids.push(new ApplicationIdentifier(id, value));
            
            // Jump to spot after 
            startPos += gap;
            
            gap = 1;
            
        }


    }
    
    // Return the found AIs
    return ids;
        
}