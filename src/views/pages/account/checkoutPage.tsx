"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import { Input, Label, Form, Row, Col, FormGroup } from "reactstrap";
import { CartContext } from "../../../helpers/cart/cart.context";
import Breadcrumb from "../../../views/Containers/Breadcrumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CurrencyContext } from "@/helpers/currency/CurrencyContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

interface formType {
  firstName: string;
  lastName: string;
  phone: any;
  country: any;
  email: string;
  state: string;
  address: string;
  city: string;
  pincode: number;
}

const CheckoutPage: NextPage = () => {
  const { cartItems, cartTotal, emptyCart } = React.useContext(CartContext);
  const { selectedCurr } = React.useContext(CurrencyContext);
  const { symbol, value } = selectedCurr;
  const [payment, setPayment] = useState("stripe");
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" && localStorage.getItem("Login") !== null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>();

  const router = useRouter();

  const checkhandle = (value: any) => {
    setPayment(value);
  };

  const onSuccess = (data: any, actions: any) => {
    return actions.order.capture().then(() => {
      alert("Order success");
      router.push("/pages/order-success");
    });
  };

  const onSubmit = (data: formType) => {
    if (data) {
      alert("You submitted the form and stuff!");
      localStorage.setItem("order-sucess-items", JSON.stringify(cartItems));
      emptyCart();
      router.push("/pages/order-success");
    }
  };

  const onCancel = (data: any) => {
    toast.error("The payment was cancelled!", data);
  };

  const onError = (err: any) => {
    console.error("Error!", err);
  };

  const paypalOptions = {
    clientId:
      "AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
  };

  if (!isLoggedIn) {
    return (
      <section className="section-big-py-space bg-light text-center">
        <div className="custom-container">
          <h2>Please login to proceed to checkout</h2>
          <button
            className="btn btn-primary mt-3"
            onClick={() => router.push("/pages/account/login")}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Breadcrumb title="checkout" parent="home" />
      <section className="section-big-py-space bg-light">
        <div className="custom-container">
          <div className="checkout-page contact-page">
            <div className="checkout-form">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg="6">
                    <div className="checkout-title">
                      <h3>Billing Details</h3>
                    </div>
                    <Row className="check-out theme-form">
                      <FormGroup className="col-md-6">
                        <Label>First Name</Label>
                        <input
                          type="text"
                          {...register("firstName", { required: true })}
                          className={`form-control ${errors.firstName ? "error_border" : ""}`}
                          placeholder="First Name"
                        />
                        {errors.firstName && <small className="text-danger">First name is required</small>}
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Label>Last Name</Label>
                        <input
                          type="text"
                          {...register("lastName", { required: true })}
                          className={`form-control ${errors.lastName ? "error_border" : ""}`}
                          placeholder="Last Name"
                        />
                        {errors.lastName && <small className="text-danger">Last name is required</small>}
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Label>Phone</Label>
                        <input
                          type="text"
                          {...register("phone", { pattern: /\d+/ })}
                          className={`form-control ${errors.phone ? "error_border" : ""}`}
                          placeholder="Phone Number"
                        />
                        {errors.phone && <small className="text-danger">Please enter a valid phone number</small>}
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Label>Email Address</Label>
                        <input
                          type="email"
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                          className={`form-control ${errors.email ? "error_border" : ""}`}
                          placeholder="Email"
                        />
                        {errors.email && <small className="text-danger">Please enter a valid email</small>}
                      </FormGroup>
                      <FormGroup className="col-md-12">
                        <Label>Country</Label>
                        <select {...register("country", { required: true })} className="form-control">
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          <option value="South Africa">South Africa</option>
                          <option value="USA">United States</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </FormGroup>
                      <FormGroup className="col-md-12">
                        <Label>Address</Label>
                        <input
                          type="text"
                          {...register("address", { required: true })}
                          className={`form-control ${errors.address ? "error_border" : ""}`}
                          placeholder="Street Address"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Label>City</Label>
                        <input
                          type="text"
                          {...register("city", { required: true })}
                          className={`form-control ${errors.city ? "error_border" : ""}`}
                          placeholder="City"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-6">
                        <Label>State</Label>
                        <input
                          type="text"
                          {...register("state", { required: true })}
                          className={`form-control ${errors.state ? "error_border" : ""}`}
                          placeholder="State"
                        />
                      </FormGroup>
                      <FormGroup className="col-md-12">
                        <Label>Postal Code</Label>
                        <input
                          type="text"
                          {...register("pincode", { pattern: /\d+/ })}
                          className={`form-control ${errors.pincode ? "error_border" : ""}`}
                          placeholder="Postal Code"
                        />
                      </FormGroup>
                    </Row>
                  </Col>

                  <Col lg="6">
                    <div className="checkout-details theme-form">
                      <div className="order-box">
                        <div className="title-box">
                          <div>Product <span>Total</span></div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item: any, index: number) => (
                            <li key={index}>
                              {item.title} × {item.qty} <span>{symbol}{(item.total * value).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="total">
                          <li>
                            Total <span className="count">{symbol}{(cartTotal * value).toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="payment-box">
                        <div className="payment-options">
                          <div className="radio-option">
                            <input type="radio" name="payment-group" id="payment-1" defaultChecked onClick={() => checkhandle("stripe")} />
                            <label htmlFor="payment-1">Cash on Delivery</label>
                          </div>
                          <div className="radio-option">
                            <input type="radio" name="payment-group" id="payment-3" onClick={() => checkhandle("paypal")} />
                            <label htmlFor="payment-3">PayPal</label>
                          </div>
                        </div>

                        <div className="text-end mt-4">
                          {payment === "paypal" ? (
                            <PayPalScriptProvider options={{ "client-id": paypalOptions.clientId }}>
                              <PayPalButtons forceReRender={[cartTotal]} onInit={onSuccess} onApprove={onSuccess} onCancel={onCancel} onError={onError} />
                            </PayPalScriptProvider>
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              Checkout
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
