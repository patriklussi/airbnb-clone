import {  } from "next/font/google"
import ClientOnly from "./components/ClientOnly"
import Container from "./components/Container"
import EmptyState from "./components/EmptyState";
import getListings, { IlistingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeListing } from "./types";

interface HomeProps {
  searchParams: IlistingsParams;
}

const Home = async ({searchParams}:HomeProps) =>  {
  const currentUser = await getCurrentUser();
  const listings  = await getListings(searchParams);
 
  console.log(listings);
  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
   
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {listings.map((listing:SafeListing) => (
            <ListingCard currentUser={currentUser} data={listing} key={listing.id}/>
          ))}
        </div>
      </Container>
    </ClientOnly>
    
  )
} 

export default Home;