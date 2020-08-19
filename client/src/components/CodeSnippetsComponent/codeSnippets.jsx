import React, { useState,useEffect } from "react";
import { handleSaveToPC } from "../../utils/common";
import { Modal, Button, Tab, Nav, Col, Row } from "react-bootstrap";
import "./codesnippets.scss";
import { filterLanguagesList } from "../../utils/constants";
import PropTypes from "prop-types";
import { RiFileCopyLine } from "react-icons/ri";
import SearchComponent from "../SearchComponent/searchComponent";
import Prism from "prismjs";
import "./prism.css";



export default function CodeSnippets({ data }) {

    useEffect(() => {
        Prism.highlightAll();
    }, [])


  console.log(data);
  const {
    url = "",
    params = {},
    protocol = "",
    headers = {},
    body = {},
  } = data;

  // console.log(url)

  return (
    <>
      <Modal.Header closeButton className="generate-code-modal-header code-modal">
        <Modal.Title>GENERATE CODE SNIPPETS</Modal.Title>
      </Modal.Header>
      <Modal.Body className="save-modal-body">
        <Tab.Container id="code-generate-tabs" defaultActiveKey="NodeJS-Axios">
          <Row noGutters>
            <Col sm={3}>
              <div className="choose-filter-language">
                <div className="action-dashboard">
                  <Nav.Item>
                    <SearchComponent />
                  </Nav.Item>
                </div>
                <div className="language-list">
                  <Nav variant="pills" className="flex-column">
                    {(filterLanguagesList || []).map((item) => {
                      return (
                        <Nav.Item key={item.id}>
                          <Nav.Link eventKey={item.id}>{item.title}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </div>
              </div>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {(filterLanguagesList || []).map((item) => {
                  return (
                    <Tab.Pane eventKey={item.id} key={item.id}>
                      <div className="code-box">
                        <div className="code-header">
                          <span className="code-title">
                            Generated Code for {item.title}{" "}
                          </span>
                          <span className="pull-right">
                            <RiFileCopyLine size={20} />
                          </span>
                        </div>
                        <div className="code-panel">
                         
                            <pre>
                              <code className="language-javascript">
                                {item.value(url, protocol, headers, body)}
                              </code>
                            </pre>
                         
                        </div>
                      </div>
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </>
  );
}

CodeSnippets.defaultProps = {};

CodeSnippets.propTypes = {};
