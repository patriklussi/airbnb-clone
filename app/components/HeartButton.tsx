import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {

  const {hasFavorited,toggleFavorite} = useFavorites({listingId,currentUser});


  return (
    <button
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
  <AiFillHeart size={24} className={`${hasFavorited ? `fill-rose-500` : "fill-neutral-500/70"}`}/>
    </button>
  );
};

export default HeartButton;
