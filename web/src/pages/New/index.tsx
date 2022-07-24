import React, { useState } from "react";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import Input from "../../components/Input";
import {
  Container,
  FormTitle,
  Form,
  Button,
  ButtonContainer,
  CategoryBox,
  CategoryContainer,
  CategoryImage,
  MapContainer,
  Section,
} from "./styles";
import { Marker, TileLayer } from "react-leaflet";
import { categories } from "./categories";
import useGetLocation from "../../hooks/useGetLocation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function New() {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: [0, 0],
  });

  const { coords } = useGetLocation();

  async function onSubmit() {
    const request = await fetch("http://localhost:3000/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formValues,
        latitude: formValues.coords[0],
        longitude: formValues.coords[1],
      }),
    });

    if (request.ok) {
      toast("Estabelecimento gravado com sucesso!", {
        type: "success",
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    }
  }

  if (!coords) {
    return <h1>Obtendo localização</h1>;
  }

  return (
    <Container>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSubmit();
        }}
      >
        <FormTitle>Cadastro do comercio local</FormTitle>

        <Section>Dados</Section>

        <Input
          label="Nome do local"
          name="name"
          value={formValues.name}
          onChange={setFormValues}
        />
        <Input
          label="Descrição"
          name="description"
          value={formValues.description}
          onChange={setFormValues}
        />
        <Input
          label="Contato"
          name="contact"
          value={formValues.contact}
          onChange={setFormValues}
        />

        <Section>Endereço</Section>

        <MapContainer
          center={[coords[0], coords[1]]}
          zoom={15}
          ref={(map) => {
            map?.addEventListener("click", (e: LeafletMouseEvent) => {
              setFormValues((previousValues) => ({
                ...previousValues,
                coords: [e.latlng.lat, e.latlng.lng],
              }));
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={
              [formValues.coords[0], formValues.coords[1]] as LatLngExpression
            }
            draggable={true}
          />
        </MapContainer>

        <Section>Categoria</Section>
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryBox
              key={category.key}
              onClick={() => {
                setFormValues((prev) => ({ ...prev, category: category.key }));
              }}
              isActive={formValues.category === category.key}
            >
              <CategoryImage src={category.url} />
              {category.label}
            </CategoryBox>
          ))}
        </CategoryContainer>

        <ButtonContainer>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default New;
