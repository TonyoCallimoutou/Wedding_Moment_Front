interface EventModel {
  eventId: number,
  userId: string,
  pictureUrl: string,
  presentationText: string,
  presentationTextSize: number,
  presentationTextAlign: string,
  eventDate: Date,
  eventCode: string,
  isActivate: boolean,
}

interface EventModelPresentation {
  presentationText: string,
  presentationTextSize: number,
  presentationTextAlign: string,
}

