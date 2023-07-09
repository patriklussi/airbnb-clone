"use client"
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}
const ReservationsClient = ({currentUser,reservations}:ReservationsClientProps) => {
    const router = useRouter();

    const [deletingId,setDeletingId] = useState("");

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation canceled");
            router.refresh();
        }).catch(() => {
            throw new Error("Something went wrong");
        }).finally(() => {
            setDeletingId("");
        })


    },[router])
  return (
    <Container>
        <Heading title="Reservations" subTitle="Bookings on your properties"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((item) => (
                <ListingCard 
                data={item.listing}
                key={item.id}
                reservation={item}
                actionId={item.id}
                onAction={onCancel}
                disabled={deletingId === item.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient