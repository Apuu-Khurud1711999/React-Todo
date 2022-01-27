import React, { Component } from "react";

import styled from "styled-components";
import Typography from '@mui/material/Typography';

const FooterContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100% !important;
  height: 100px !important ;
  background: #880e4f;
`;

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <Typography variant="title" style={{color:"white"}}> © 2021 TODO APP</Typography>
      </FooterContainer>
    );
  }
}

export default Footer;
