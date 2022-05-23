import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./styles.css";
const { Configuration, OpenAIApi } = require("openai");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: [],
      response: []
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    // OPENAI

    const configuration = new Configuration({
      apiKey: "SECRET_APIKEY"
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion("text-curie-001", {
        prompt: `Based on ${formDataObj.dessertName}, provide a dessert recipe.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
      .then((response) => {
        this.setState({
          keyword: `${formDataObj.dessertName}`,
          response: `${response.data.choices[0].text}`
        });
      });
  };

  render() {
    return (
      <div>
        <Container>
          <header className="sweet">
            What's your <span className="cursive">sweet tooth </span> craving?
          </header>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail" size="sm">
              <Form.Control
                name="dessertName"
                type="text"
                placeholder="Type an ingredient here"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button
              variant="outline-secondary"
              className="btn btn-outline-light"
              type="submit"
              onClick={this.state.keyword.addWord}
            >
              Find a Recipe!
            </Button>
          </Form>
          <br />
          <Card className="card cb-1">
            <Card.Body>
              <Card.Title>Ingredient: {this.state.keyword}</Card.Title>
              <Card.Text>
                Recipe:
                {this.state.response}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Home;

