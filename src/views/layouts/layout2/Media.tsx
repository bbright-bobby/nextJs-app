import { CurrencyContext } from "@/helpers/currency/CurrencyContext";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useContext, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";

const GET_COLLECTION = gql`
  query getCollection($collection: String) {
    collection(collec: $collection) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        image_id
        id
        alt
        src
      }
    }
  }
`;

const MediaSection: NextPage = () => {
  const [nav1, setNav1] = useState<Slider | null>();
  const [nav2, setNav2] = useState<Slider | null>();

  const currencyContext = useContext(CurrencyContext);
  const { selectedCurr } = currencyContext;

  var { loading, data: dataR } = useQuery(GET_COLLECTION, {
    variables: {
      collection: "hotdeal",
    },
  });


  var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    fade: true,
    infinite: true,
    dots: false,
  };

  var setting1 = {
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          vertical: false,
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section className=" b-g-white section-big-pt-space">
      <Container>
        <Row className="hot-1">
          <Col lg="3" sm="6" xs="12">
            <Slider className="slide-1 no-arrow">
              <div>
                <div className="media-banner">
                  <div className="media-banner-box">
                    <div className="media-heading">
                      <h5>on sale</h5>
                    </div>
                  </div>
                  <div className="media-banner-box">
                    <div className="media">
                      <Media src="/images/layout-1/media-banner/1.jpg" className="img-fluid  " alt="banner" />
                      <div className="media-body">
                        <div className="media-contant">
                          <div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <p>Generator on Internet.</p>
                            <h6>$153.00</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="media-banner-box">
                    <div className="media">
                      <Media src="/images/layout-1/media-banner/2.jpg" className="img-fluid  " alt="banner" />
                      <div className="media-body">
                        <div className="media-contant">
                          <div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <p>Generator on Internet.</p>
                            <h6>$153.00</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="media-banner">
                  <div className="media-banner-box">
                    <div className="media-heading">
                      <h5>on sale</h5>
                    </div>
                  </div>
                  <div className="media-banner-box">
                    <div className="media">
                      <Media src="/images/layout-1/media-banner/3.jpg" className="img-fluid  " alt="banner" />
                      <div className="media-body">
                        <div className="media-contant">
                          <div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <p>Generator on Internet.</p>
                            <h6>$153.00</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="media-banner-box">
                    <div className="media">
                      <Media src="/images/layout-1/media-banner/4.jpg" className="img-fluid  " alt="banner" />
                      <div className="media-body">
                        <div className="media-contant">
                          <div>
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <p>Generator on Internet.</p>
                            <h6>$153.00</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </Col>
          <Col lg="2" sm="6" xs="12">
            <div className="Jewellery-banner">
              <a>save 30% off</a>
              <h6>Jewellery</h6>
            </div>
          </Col>
          <Col lg="7" sm="12" xs="12">
            <div className="hot-deal">
              <div className="hot-deal-box">
                <div className="slide-1">
                  <div>
                    <div className="hot-deal-contain1 hot-deal-banner-1">
                      <div className="hot-deal-heading">
                        <h5>today’s hot deal</h5>
                      </div>
                      <Row className="hot-deal-subcontain">
                        <Col lg="4" sm="4" xs="12">
                          <Slider asNavFor={nav2!} ref={(slider1) => setNav1(slider1)} {...settings}>
                            {dataR &&
                              dataR.collection[0].images.map((img: any, i: any) => {
                                return (
                                  <div key={i}>
                                    <Media src={`/images/${img.src}`} alt="hot-deal" className="img-fluid  " />
                                  </div>
                                );
                              })}
                          </Slider>
                        </Col>
                        <Col lg="6" sm="6">
                          <div className="hot-deal-center">
                            <div>
                              <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                              <div>
                                <h5>simply dummy text of the printing</h5>
                              </div>
                              <div>
                                <p>it is a long established fact that a reader.</p>
                                {dataR && !loading ? (
                                  <div className="price">
                                    <span>
                                      {selectedCurr.symbol}
                                      {(dataR && dataR.collection[0].price * selectedCurr.value).toFixed(2)}
                                    </span>
                                    <span>
                                      {selectedCurr.symbol}
                                      {((dataR && dataR.collection[0].price - (dataR && dataR.collection[0].price * (dataR && dataR.collection[0].discount / 100))) * selectedCurr.value).toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg="2" sm="2" md="0">
                          <Slider {...setting1}asNavFor={nav1!} ref={(slider1) => setNav2(slider1)} vertical={true} slidesToShow={2} swipeToSlide={true} focusOnSelect={true} verticalSwiping={true}>
                            {dataR &&
                              dataR.collection[0].images.map((img: any, i: any) => {
                                return (
                                  <div key={i}>
                                    <Media src={`/images/${img.src}`} alt="hot-deal" className="img-fluid" />
                                  </div>
                                );
                              })}
                          </Slider>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MediaSection;
