import {Listing, User} from "@prisma/client"




export type SafeUser = Omit<
User,"createdAt" | "updatedAt" | "emailVerified" 
> & {
    createdAt:string;
    updatedAt:string;
    emailVerified:string | null
}

export type SafeListing = Omit<Listing, "createdAt"> & {   // Create new safe type by using Omit and passing in the original type and the key that we want to change
    createdAt:string // THen add & sign and object and the key that we want to change
}
