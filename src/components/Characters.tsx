import React, { useState, useEffect, useRef } from "react";
import { List, Card, Avatar, Spin, Select, Modal, Input } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../App.css";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  showDetails: boolean;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const { Option } = Select;

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(
    "https://rickandmortyapi.com/api/character"
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState<string | null>("all");
  const loader = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPage) {
          fetchCharacters();
        }
      },
      { threshold: 0.1 }
    );
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [nextPage]);

  const fetchCharacters = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(nextPage);
      const characterMap = new Map(characters.map((char) => [char.id, char]));

      response.data.results.forEach((char) => {
        characterMap.set(char.id, {
          ...char,
          showDetails: false,
        });
      });

      setCharacters(Array.from(characterMap.values()));
      setNextPage(response.data.info.next);
    } catch (err: any) {
      setError(`Failed to fetch characters: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value: string | null) => {
    setFilterOption(value);

    const searchParams = new URLSearchParams(location.search);
    if (value === "all") {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", value || "");
    }
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  };

  const showModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchMoreCharacters = () => {
    if (nextPage && !loading) {
      fetchCharacters();
    }
  };

  const [lastElementRef] = useInfiniteScroll(fetchMoreCharacters);

  if (loading && !characters.length) return <Spin size="large" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Select
        defaultValue="all"
        style={{ width: 200, marginBottom: 20 }}
        onChange={(value) => handleFilter(value)}
      >
        <Option value="all">All</Option>
        <Option value="dead">Dead</Option>
        <Option value="alive">Alive</Option>
      </Select>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20, width: 200 }}
      />
      <List
        grid={{ gutter: 5, column: 6 }}
        dataSource={characters
          .filter((char) =>
            char.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .filter((char) =>
            filterOption === "all"
              ? true
              : filterOption === "dead"
                ? char.status.toLowerCase() === "dead"
                : char.status.toLowerCase() === "alive"
          )}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            ref={index === characters.length - 1 ? lastElementRef : null}
            onClick={() => showModal(item)}
          >
            <Card
              title={item.name}
              cover={
                <Avatar
                  src={item.image}
                  alt={item.name}
                  shape="square"
                  size={228}
                />
              }
            >
              <p>Status: {item.status}</p>
              <p>Species: {item.species}</p>
            </Card>
          </List.Item>
        )}
      />
      <div ref={loader} style={{ height: "100px", margin: "10px" }} />
      {isModalVisible && selectedCharacter && (
        <Modal
          title={selectedCharacter.name}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Avatar
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            shape="square"
            size={328}
          />
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          <p>Type: {selectedCharacter.type || "Unknown"}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <p>Origin: {selectedCharacter.origin.name}</p>
          <p>Location: {selectedCharacter.location.name}</p>
        </Modal>
      )}
    </>
  );
};

export default Characters;
