import prisma from "@/app/libs/prismaDb";

export interface IlistingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathRoomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IlistingsParams) {
  try {
    const {
      userId,
      bathRoomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (bathRoomCount) {
      query.roomCount = {
        gte: +bathRoomCount,
      };
    }
    if (guestCount) {
      query.roomCount = {
        gte: +guestCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => {
      return {
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      };
    });
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
