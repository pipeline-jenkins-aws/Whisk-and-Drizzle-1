import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">About Whisk and Drizzle</h1>

      <div className="text-white text-lg space-y-6">
        <p>
          Welcome to <strong>Whisk and Drizzle</strong>, your go-to destination for the finest handcrafted desserts.
          Whether you're craving rich chocolate cakes, delicate pastries, or mouth-watering cookies, we have something
          sweet for everyone. Our team of dessert enthusiasts is dedicated to making sure that every bite is an
          indulgent experience.
        </p>

        <p>
          Our journey began with a shared passion for baking and a dream to deliver happiness through desserts.
          Today, we’re a growing team of 10 talented bakers, developers, and creative minds, working together to bring
          you a seamless online dessert-shopping experience. Every member of our team plays a vital role in creating
          and delivering deliciousness right to your doorstep.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-400 mt-8">Our Mission</h2>
        <p>
          At Whisk and Drizzle, our mission is simple: to spread joy through desserts. We believe that a good dessert
          can brighten your day and make any occasion special. That’s why we use only the highest quality ingredients,
          combined with expert craftsmanship, to create treats that are not only beautiful but also irresistibly tasty.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-400 mt-8">Our Team</h2>
        <p>
          We are proud of our diverse and talented team, made up of bakers, customer service specialists, and tech
          wizards who ensure that your experience on our site is as smooth as the frosting on our cakes. Behind every
          perfect dessert and seamless checkout process is the effort of our dedicated crew of 10 people, working
          tirelessly to provide you with the best.
        </p>

        <h2 className="text-2xl font-semibold text-emerald-400 mt-8">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Delicious, handcrafted desserts made with love.</li>
          <li>Fast and reliable delivery right to your door.</li>
          <li>A user-friendly online shopping experience.</li>
          <li>Exclusive seasonal offerings and custom desserts for special occasions.</li>
          <li>A passionate and dedicated team that puts customers first.</li>
        </ul>

        <p>
          Thank you for choosing <strong>Whisk and Drizzle</strong>. We’re thrilled to be part of your sweetest moments!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
