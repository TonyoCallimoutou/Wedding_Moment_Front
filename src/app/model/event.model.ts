interface EventModel {
  eventId: number,
  userId: string,
  name: string,
  pictureUrl: string,
  presentationText: string,
  presentationTextSize: number,
  presentationTextAlign: string,
  eventDate: Date,
  isActivate: boolean,
}

interface EventModelPresentation {
  presentationText: string,
  presentationTextSize: number,
  presentationTextAlign: string,
}

