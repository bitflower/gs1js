import * as helpers from './Helpers/Helpers';
import * as gs1helpers from './Helpers/GS1Helpers';
import ApplicationIdentifier from './ApplicationIdentifier';

export class GS1Reader {
    
    private code: string;
    private bytes: any[];
    
    private hasidentifiers: boolean;
    private lookup: any;
    
    private identifiers: ApplicationIdentifier[];
    
    constructor(code: string, bytes: any[] = []) {
        this.code = code;
        this.bytes = bytes;
               
        // Extract bytes of not present
        this.checkBytes();
        
        // Read identifier positions if present
        this.hasidentifiers = false;
        this.lookup = {};
        
        // Extract application identifiers
        this.extractIdentifiers();
         
    }
    
    private checkBytes() {
        
        // Is the bytes array filled?
        if (!this.bytes || this.bytes.length === 0) {
            // If not, convert text into byte array
            this.bytes = helpers.getASCIIArray(this.code);
        }
        
        // Clean up byte array
        this.bytes = gs1helpers.cleanStart(this.bytes);
        
        // Recreate code from cleaned byte array
        this.code = helpers.bin2String(this.bytes);
        
    }
    
    private extractIdentifiers() {
        
        this.identifiers = gs1helpers.extractIds(this.code);
        
        // Set flag
        this.hasidentifiers = this.identifiers.length > 0;
        
        // Fill lookup object
        for (var i = 0, len = this.identifiers.length; i < len; i++) {
            this.lookup[this.identifiers[i].identifier] = this.identifiers[i];
        }        
    }
    
    public getApplicationIdentifiers(): ApplicationIdentifier[] {
        return this.identifiers;
    }
    
    public getApplicationIdentifierById(id:string): ApplicationIdentifier {
        
        return this.lookup[id];

    }    
    
}