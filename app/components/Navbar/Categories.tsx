"use client"
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {FaSkiing} from "react-icons/fa"
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { useSearchParams, usePathname } from "next/navigation";
import {BsSnow} from "react-icons/bs";
import CategoryBox from "../Categorybox";
import { IconType } from "react-icons";
import {IoDiamond} from "react-icons/io5";
interface ICategories {
    label:string;
    icon:IconType;
    description:string;
}

export const categories:ICategories[] = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is the countryside",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
    
  },
   {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activites",
  },
  {
    label:"Castle",
    icon:GiCastle,
    description:"This property is in a castle"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activites",

  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic",
    
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is a cave",
    
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This propery is in a barn",
    
  },
  {
    label: "Luxurious",
    icon: IoDiamond,
    description: "This propery is luxurious",
    
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
