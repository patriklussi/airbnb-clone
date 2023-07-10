"use client"
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings:SafeListing[];
    currentUser?: SafeUser | null;

}

const PropertiesClient = ({listings,currentUser}: PropertiesClientProps) => {
    const router = useRouter();
    const [deletingId,setDeletingId] = useState("");

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Listing deleted");
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.error);
        }).finally(() => {
            setDeletingId("");
        })
    },[router]);


  return (
    <Container>
        <Heading title="Properties" subTitle="List of your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings?.map((item) =>(
                <ListingCard key={item.id} data={item} actionId={item.id} onAction={onCancel} disabled={deletingId === item.id} actionLabel="Delete Property" currentUser={currentUser}  />
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient;