import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please log in" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({userId: currentUser.id});

    if(reservations?.length === 0){
        return (
            <ClientOnly>
                <EmptyState title="No trips found" subtitle="Book a new trip maybe?" />
            </ClientOnly>
        )
    }
  return (
    <div>
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser}/>
        </ClientOnly>
    </div>
  )
}

export default TripsPage;