import { NextPage } from "next";
import { Col, Row } from "reactstrap";
import Breadcrumb from "../Containers/Breadcrumb";
import MediaPage from "./common/mediaPage";

const NoSidebarPage: NextPage = () => {
  return (
    <div className="bg-light">
      <Breadcrumb title="blog" parent="home" />
      {/* <!-- section start --> */}
      <section className="section-big-py-space blog-page ratio2_3">
        <div className="custom-container">
          <Row>
            {/* <!--Blog List start--> */}
            <Col xs="12">
              <MediaPage />
            </Col>
            {/* <!--Blog List start--> */}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default NoSidebarPage;
