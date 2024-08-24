import EventInterface from "../../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOcorrued: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOcorrued = new Date();
        this.eventData = eventData;
    }
   

    
}