import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, Image, Tag } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { Rnd } from "react-rnd";

const Index = () => {
  const [image, setImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  const addLabel = () => {
    setLabels([...labels, { text: newLabel, x: 50, y: 50 }]);
    setNewLabel("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Upload Floor Plan</Text>
        <Box {...getRootProps()} border="2px dashed #ccc" padding="20px" width="100%" textAlign="center">
          <input {...getInputProps()} />
          <Text>Drag 'n' drop an image here, or click to select one</Text>
        </Box>
        {image && (
          <Box position="relative" width="100%" border="1px solid #ccc" padding="10px">
            <Image src={image} alt="Floor Plan" width="100%" />
            {labels.map((label, index) => (
              <Rnd
                key={index}
                default={{
                  x: label.x,
                  y: label.y,
                  width: 100,
                  height: 50,
                }}
                bounds="parent"
                onDragStop={(e, d) => {
                  const newLabels = [...labels];
                  newLabels[index] = { ...newLabels[index], x: d.x, y: d.y };
                  setLabels(newLabels);
                }}
              >
                <Tag size="lg" colorScheme="blackAlpha">
                  {label.text}
                </Tag>
              </Rnd>
            ))}
          </Box>
        )}
        <Input
          placeholder="Enter label text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <Button onClick={addLabel} colorScheme="blue">
          Add Label
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;