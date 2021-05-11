export class PersonModule  // exporting makes the class public, its private by default
{
    constructor( name )
    {
        this.name = name;
    }

    talk() { console.log("hello") };
}