"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryInput from "../inputs/Categoryinput"

enum STEPS {
  CATEGOREY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  
  const [step, setStep] = useState(STEPS.CATEGOREY);
  const [isLoading,setIsLoading] = useState(false);
  console.log(step);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount:1,
      bathroomCount: 1,
      imageSrc: 1,
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc  = watch("imageSrc");
  const Map = useMemo(()=> dynamic(() => import ("../Map"),{ssr:false}),[location])
  const setCostumValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onSubmit: SubmitHandler<FieldValues>  = (data) => {
    if(step !== STEPS.PRICE){
      return onNext();
    }
    setIsLoading(true);
    axios.post("/api/listings",data).then(() => {
      toast.success("Listing created");
      router.refresh()
      reset();
      setStep(STEPS.CATEGOREY);
      rentModal.onClose();
    }).catch(() => {
      toast.error("Something went wrong! Please try again!")
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  console.log(getValues());
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGOREY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <section className="flex flex-col gap-8">
      <Heading
      center
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCostumValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading
        center
          title="Where is your place located?"
          subTitle="Help guests find you?"
        />
        <CountrySelect 
        value={location}
          onChange={(value) => setCostumValue("location", value)}
        />
        <Map
        center={location?.latLng}
        />
      </section>
    );
  }

  if(step === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basic info about your place" subTitle="What amenities do you have?"/>
        <Counter
        title="Guests"
        subTitle="How many guests do you allow to stay?"
          value={guestCount}
          onChange={(value) => setCostumValue("guestCount", value)}
        />
        <hr />
         <Counter
        title="Rooms"
        subTitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCostumValue("roomCount", value)}
        />
        <hr />
         <Counter
        title="Bathrooms"
          subTitle="How many bathrooms do you allow to stay?"
          value={bathroomCount}
          onChange={(value) => setCostumValue("bathroomCount", value)}
        />
      </div>
    )
  }

  if(step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like"
          />
          <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCostumValue("imageSrc",value)}
          />
      </div>
    )
  }
  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="How would you describe your place" subTitle="Short and sweet works best"/>
        <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
        
        />
        <hr />
        <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        required
        errors={errors}
        
        />
      </section>
    )
  }

  if(step === STEPS.PRICE){
    bodyContent = (
      <section>
        <Heading title="Now set your price" subTitle="How much do you charge per night"/>
         <Input
          id="price"
          formatPrice={true}
          label="Price"
          type="number"
          required
          disabled={isLoading}
          errors={errors}
          register={register}
        />
      </section>
      
      
    )
  }
  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGOREY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
