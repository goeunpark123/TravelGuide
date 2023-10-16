import React from "react";
import { useHistory } from "react-router-dom";

import "./NewPlace.css";
import "./PlaceForm.css";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/validator";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Button from "../../shared/components/FormElements/Button";

const NewPlace = () => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);

      for (let value of formData.values()) {
        console.log(value);
      }

      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        //"Content-Type": "multipart/form-data",
        Accept: "application/json",
      });
      // await sendRequest(
      //   "http://localhost:5000/api/places",
      //   "POST",
      //   {
      //     "Content-Type": "application/json",
      //   },
      //   JSON.stringify({
      //     title: formState.inputs.title.value,
      //     description: formState.inputs.description.value,
      //     address: formState.inputs.address.value,
      //   })
      // );

      history.push("/places");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}

        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Invalid input."
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Invalid input (at least 5 characters)."
          onInput={inputHandler}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Invalid input."
          onInput={inputHandler}
        />

        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
