import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
//will need to import components to display search results
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../utils/queries";
import RandomSearch from "../components/RandomSearch";
import TagSearch from "../components/TagSearch";

//make button with capability to load some number of random collections or one random collection, similar to "i'm feelin lucky"
const Search = () => {
  // useQuery hook to fetch collections
  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  const collections = data?.collections || [];

  useEffect(() => {
    console.log("collections:", collections);
    console.log("collection 2:", collections[1]);
    // console.log("collection 2 tag", collections[1].tag);
  }, [collections]);

  //i think i will have handleTagFormSubmit, handleSearchFormSubmit and handleRandomFormSubmit
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!searchInput) {
  //     return false;
  //   }
  // };

  return (
    <>
      <div>
        <Container>
          <h1>Search for Collections!</h1>
          <RandomSearch />
          <TagSearch />
          <Form>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  // value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a collection"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <div>
        {/* Render your search results here */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {collections.length > 0 && (
          <div>
            <h2>All Collections</h2>
            {collections.map((collection) => (
              <div key={collection._id}>
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <p>{collection.tag}</p>
                {/* Display other collection details... */}
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Search;