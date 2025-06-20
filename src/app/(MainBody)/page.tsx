"use client";
import { useEffect, useState } from "react";
import Layouts from "@/views/layouts/layout1";
import SliderBanner from "@/views/layouts/layout1/slider";
import DealBanner from "@/views/layouts/widgets/dealBanner";
import Category from "@/views/layouts/widgets/roundedCategory";
import DiscountCoupon from "@/views/layouts/widgets/discountCoupon";
import RatioSquare from "@/views/layouts/widgets/ratio-square";
import CollectionBannerThree from "@/views/layouts/layout1/collection-banner-three";
import HotDeal from "@/views/layouts/layout1/hot-deal";
import Testimonial from "@/views/layouts/widgets/testimonial";
import SpecialProduct from "@/views/layouts/widgets/title-section";
import InstagramSection from "@/views/layouts/widgets/instagram/instagram1";
import ContactBanner from "@/views/layouts/widgets/contact-us";
import DiscountBanner from "@/views/layouts/widgets/discount-banner";
import TabProduct from "@/views/layouts/widgets/Tab-Product/TabProduct";

import { centralDataCollector } from "@/app/services/central_data_control";
import { Category as ICategory } from "@/app/globalProvider";

const centralDataCollectorObj = centralDataCollector;

const Home = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    // Subscribe to categories
    const unsubscribe = centralDataCollectorObj.categoryStream.subscribe((data) => {
      console.log("Categories from stream:", data);
      setCategories(data);
    });

    // Fetch initial and schedule data
    centralDataCollectorObj.getData();
    centralDataCollectorObj.scheduleGetData();

    return () => {
      unsubscribe(); // Unsubscribe from category stream
    };
  }, []);

  return (
    <Layouts>
      <div className="bg-light">
        <SliderBanner />
        <DiscountBanner />
        <TabProduct effect="icon-inline" />

        {/* Inject category-based rendering */}
        <section className="rounded-category">
          <Category/>
        </section>

        <section className="deal-banner">
          <DealBanner />
        </section>

        <section className="box-category section-py-space">
          <DiscountCoupon />
        </section>

        <RatioSquare />
        <CollectionBannerThree />
        <HotDeal />

        <section className="testimonial testimonial-inverse">
          <Testimonial />
        </section>

        <SpecialProduct hoverEffect="icon-inline" />

        <section className="instagram">
          <InstagramSection />
        </section>

        <ContactBanner />
      </div>
    </Layouts>
  );
};

export default Home;
