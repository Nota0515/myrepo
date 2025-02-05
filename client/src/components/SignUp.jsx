import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      setLoading(false);
      setButtonDisabled(false);
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
        try {
            const res = await UserSignUp({ name, email, password });

            console.log("Full Response:", res); // Log the entire response object

            if (res && res.data) { // Check if res AND res.data are defined
                dispatch(loginSuccess(res.data));
                alert("Account Created Success");
            } else {
                console.error("Invalid API Response:", res); // Log the full response for debugging
                alert("Signup failed. Invalid response from server.");
            }

        } catch (err) {
            console.error("API Error:", err);  // Log the full error object

            // More specific error handling (if possible)
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message); // Display server error message
            } else if (err.message) {
                alert(err.message); // Display a general error message
            } else {
                alert("Signup failed. Please try again later."); // Generic message
            }

        } finally { // This will ALWAYS run, even if there's an error
            setLoading(false);
            setButtonDisabled(false);
        }
    } else {
        setLoading(false);
        setButtonDisabled(false);
    }
};
  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignUp"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
