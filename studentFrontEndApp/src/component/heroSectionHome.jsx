import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { addData } from './contextProvider';
import Loginhero from "./loginhero";

export default function HeroSectionHome() {
  const { key, setKey } = useContext(addData);


  return (
    <>
    
        <Card className="w-100" style={{ maxWidth: "90rem", marginTop: "50px" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Button
                variant="primary"
                size="xxl"
                style={{ width: "100%", height: "60px" }}
              >
                <Link to="/AddCourse" style={{ textDecoration: "none", color: "white" }}>Add Course Result</Link>
              </Button>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                variant="primary"
                size="xxl"
                style={{ width: "100%", height: "60px" }}
              >
                <Link to="/result" style={{ textDecoration: "none", color: "white" }}>See Your Result</Link>
              </Button>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                variant="primary"
                size="xxl"
                style={{ width: "100%", height: "60px" }}
              >
                <Link to="/UpdateProfile" style={{ textDecoration: "none", color: "white" }}>Update Profile</Link>
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
    
    </>
  );
}
