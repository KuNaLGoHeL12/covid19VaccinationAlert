import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small mt-5">
      <MDBContainer fluid className="text-center">
        <MDBRow>
          <MDBCol md="12">
            <h5 className="title">Credits</h5>
            <p>
              Designed, Developed and Maintained by <a href="www.linkedin.com/in/kunal-gohel-85958a116">Kunal Gohel</a> & Dhaval Padaya.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          For any issue / suggestion, please feel free to write @ <a href="mailto:kkg176@gmail.com">our official mail id</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;