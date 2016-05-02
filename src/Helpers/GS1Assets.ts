// Class with static methods and constants for GS1-related code operations

export default class GS1Assets {
    
    // GS1 table of pre-defined elements and their length
    // As defined in http://www.gs1.org/docs/barcodes/GS1_General_Specifications.pdf
    // The length INCLUDES the identifier
    // Example identifier 01 has a data length of 14 => 16 total length
    // Chapter 5.10.1
    public static FIXED_LENGTH_IDENTIFIERS: any[] = [{
        ai: '00',
        length: 20
    }, {
        ai: '01',
        length: 16
    }, {
        ai: '02',
        length: 16
    }, {
        ai: '03',
        length: 16
    }, {
        ai: '04',
        length: 18
    }, {
        ai: '11',
        length: 8
    }, {
        ai: '12',
        length: 8
    }, {
        ai: '13',
        length: 8
    }, {
        ai: '14',
        length: 8
    }, {
        ai: '15',
        length: 8
    }, {
        ai: '16',
        length: 8
    }, {
        ai: '17',
        length: 8
    }, {
        ai: '18',
        length: 8
    }, {
        ai: '19',
        length: 8
    }, {
        ai: '20',
        length: 4
    }, {
        ai: '31',
        length: 10
    }, {
        ai: '32',
        length: 10
    }, {
        ai: '33',
        length: 10
    }, {
        ai: '34',
        length: 10
    }, {
        ai: '35',
        length: 10
    }, {
        ai: '36',
        length: 10
    }, {
        ai: '41',
        length: 16
    }    ];
    
    public static getFixedLengthIdentifier = function(ai:string) {
        
    for( var i=0, l=this.FIXED_LENGTH_IDENTIFIERS.length; i<l; i++ ) {
        if (this.FIXED_LENGTH_IDENTIFIERS[i].ai === ai) {
            return this.FIXED_LENGTH_IDENTIFIERS[i];
        }
    }      
    
    // If the identifier does not exists return null
    return null;  
        
    }
}