export const Response = (data, statusCode, message, success) => {
  return {
    data: data,
    message: message,
    status: statusCode,
    success: success,
  };
};

export const tripPackageObject = (image, trip) => {
  console.log(trip);
  return {
    title: trip.title,
    image: {
      data: image,
      contentType: "image/png+jpg+jpeg",
    },
    duration: trip.duration,
    activities: trip.activities,
    tripCategory: trip.tripCategory,
    placeNumber: trip.placeNumber,
    maximumGuests: trip.maximumGuests,
    highlightTitle: trip.highlightTitle,
    tripHighlights: trip.tripHighlights,
    price: trip.price,
    discountedPrice: trip.discountedPrice,
    occasions: trip.occasions,
    travelType: trip.travelType,
    amenities: trip.amenities,
    briefDescription: trip.briefDescription,
    faq: trip.faq,
    status: trip.status,
  };
};
