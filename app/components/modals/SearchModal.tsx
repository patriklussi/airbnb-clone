"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useParams();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    dateRange,
    step,
    location,
    router,
    bathRoomCount,
    guestCount,
    onNext,
    params,
    roomCount,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Where do you want to go"
        subTitle="Find the perfect location for you "
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latLng} />
    </div>
  );
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="When do you plan to go"
          subTitle="Make sure everyone is free "
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if(step === STEPS.INFO){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="More information"
            subTitle="Find your perfect place"
            />
            <Counter 
            title="Guests"
            subTitle="How many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
            />
             <Counter 
            title="Rooms"
            subTitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
            />
             <Counter 
            title="Bathrooms"
            subTitle="How many bathrooms do you need?"
            value={bathRoomCount}
            onChange={(value) => setBathRoomCount(value)}
            />
        </div>  
    )
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
