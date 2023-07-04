"use client"
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";
interface CategoryBoxProps {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
}

const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if(params?.get("category") === label){
       updatedQuery.category = ""
       delete updatedQuery.category
    }
    console.log(params)
    const url = queryString.stringifyUrl({
        url:"/",
        query:updatedQuery,
    },{
        skipNull:true
    })
    router.push(url);
  }, [params, label,router]);
  return (
    <article 
    onClick={handleClick}
      className={`flex flex-col items-center justify-center p-3  gap-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? `border-b-neutral-800` : `border-transparent`
      } ${selected ? `text-neutral-800` : `text-neutral-500`}  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </article>
  );
};

export default CategoryBox;
