import prisma from "@/app/libs/prismaDb"
import getCurrentUser from "./getCurrentUser"

export async function getFavoriteListings(){
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where:{
                 id:{
                    in: [...(currentUser.favoriteIds) || []]
                 }
            }
        });
        

        const safeFavorites = favorites.map((item) =>(
            {
                ...item,
                createdAt: item.createdAt.toISOString(),
            }
        ));
        return safeFavorites;
    }  catch(error:any){
        throw new Error("Something went wrong")
    }
    
}