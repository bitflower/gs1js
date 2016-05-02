import * as helpers from './helpers';
import * as gs1helpers from './gs1-helpers';
import ApplicationIdentifier from './ApplicationIdentifier';

export class GS1Reader {
    
    private code: string;
    private bytes: any[];
    
    private hasidentifiers: boolean;
    private identifierPositions: number[];
    
    private identifiers: ApplicationIdentifier[];
    
    constructor(code: string, bytes: any[] = []) {
        this.code = code;
        this.bytes = bytes;
               
        // Extract bytes of not present
        this.checkBytes();
        
        // Read identifier positions if present
        this.identifierPositions = gs1helpers.getGroupSeparators(this.bytes);
        this.hasidentifiers = (this.identifierPositions.length > 0);
        
        this.extractIdentifiers();
         
    }
    
    private checkBytes() {
        
        // Is the bytes array filled?
        if (!this.bytes || this.bytes.length === 0) {
            // If not, convert text into byte array
            this.bytes = helpers.getASCIIArray(this.code);
        }
        
    }
    
    private extractIdentifiers() {
        
        if (this.hasidentifiers) {
            this.identifiers = gs1helpers.extractGSIds(this.bytes, this.identifierPositions);
        } else {
            this.identifiers = gs1helpers.extractFixIds(this.code);
        }
        
    }
    
    public getApplicationIdentifiers(): ApplicationIdentifier[] {
        
        return this.identifiers;
        
    }
    
}