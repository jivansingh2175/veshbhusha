import React from "react";

const testimonials = [
  {
    name: "Rohan Kapoor",
    quote: "“The craftsmanship is impeccable. These outfits make me feel confident and unstoppable.”",
  },
  {
    name: "Aman Sethi",
    quote: "“Elegant designs and top-tier fabrics. Every detail reflects pure class.”",
  },
  {
    name: "Varun Deshmukh",
    quote: "“Finally found a brand that blends comfort with sophistication. Highly recommended!”",
  },
  {
    name: "Ishaan Malhotra",
    quote: "“The best shopping experience I’ve had in years. Timeless pieces worth every penny.”",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 tracking-wide">
          What Gentlemen Say
        </h2>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{testimonial.quote}</p>
              <div className="text-right mt-auto">
                <p className="text-gray-900 font-semibold text-xl">{testimonial.name}</p>
                <div className="w-12 h-1 bg-black mt-2 ml-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
