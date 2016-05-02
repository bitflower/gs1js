export default class ApplicationIdentifier {

    public identifier: string;
    public value: string;
    public length: number;

    constructor(identifier:string, value: string) {
        this.identifier = identifier;
        this.value = value;
        this.length = value.length;
    }

}