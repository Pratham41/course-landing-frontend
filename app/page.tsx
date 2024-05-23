"use client";

import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import courseImage from "../public/assets/c5.jpg";
import { useEffect, useState } from "react";
import SignupModal from "./SignupModal";

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const endDate = new Date("2024-06-31T23:59:59");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate.valueOf() - now.valueOf();

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white bg-opacity-10 min-h-screen flex flex-col">
        <header className="bg-transparent py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-800">{"Pratham's Academy"}</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#features"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-blue-800">
              <h2 className="text-4xl font-bold">
                Learn New Skills with Our Course
              </h2>
              <p className="mt-4 text-blue-600">
                Our comprehensive course offers you the opportunity to enhance
                your skills and knowledge in a structured and supportive
                environment.
              </p>
              <button
                onClick={handleOpenModal}
                className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Register Now
              </button>

              <SignupModal isOpen={isModalOpen} onClose={handleCloseModal} />


              <div className="bg-blue-50 flex flex-col justify-center items-center mt-8 py-4 px-3 rounded-md">
                <h2 className="text-3xl font-bold mb-4">Offer valid till</h2>
                <div className="flex justify-center items-center space-x-4 text-4xl text-blue-700">
                  <div className="countdown-item flex flex-col items-center">
                    <span className="font-bold text-2xl sm:text-3xl">
                      {countdown.days}
                    </span>
                    <span className="text-xs uppercase">days</span>
                  </div>
                  <span className="text-4xl sm:text-5xl">:</span>
                  <div className="countdown-item flex flex-col items-center">
                    <span className="font-bold text-2xl sm:text-3xl">
                      {countdown.hours}
                    </span>
                    <span className="text-xs uppercase">hours</span>
                  </div>
                  <span className="text-4xl sm:text-5xl">:</span>
                  <div className="countdown-item flex flex-col items-center">
                    <span className="font-bold text-2xl sm:text-3xl">
                      {countdown.minutes}
                    </span>
                    <span className="text-xs uppercase">minutes</span>
                  </div>
                  <span className="text-4xl sm:text-5xl">:</span>
                  <div className="countdown-item flex flex-col items-center">
                    <span className="font-bold text-2xl sm:text-3xl">
                      {countdown.seconds}
                    </span>
                    <span className="text-xs uppercase">seconds</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src={courseImage}
                alt="Course"
                className="rounded-lg shadow-md"

              />
            </div>
          </section>

          <section id="features" className="bg-white bg-opacity-90 py-12">
            <div className="container mx-auto px-6 text-center text-blue-800">
              <h2 className="text-3xl font-bold">Course Features</h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">
                    Interactive Lessons
                  </h3>
                  <p className="mt-2 text-blue-600">
                    Engage with our interactive lessons designed to provide a
                    hands-on learning experience.
                  </p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">Expert Instructors</h3>
                  <p className="mt-2 text-blue-600">
                    Learn from industry experts who bring real-world experience
                    to the classroom.
                  </p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">Certification</h3>
                  <p className="mt-2 text-blue-600">
                    Receive a certification upon completion to showcase your new
                    skills.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="bg-blue-50 py-12">
            <div className="container mx-auto px-6 text-center text-blue-800">
              <h2 className="text-3xl font-bold">About the Course</h2>
              <p className="mt-4 text-blue-600">
                This course is designed for individuals looking to expand their
                knowledge and skills in a specific field. Our curriculum is
                crafted to provide a comprehensive learning experience, covering
                all essential topics and practices.
              </p>
            </div>
          </section>

          <section id="reviews" className="bg-white bg-opacity-90 py-12">
            <div className="container mx-auto px-6 text-center text-blue-800">
              <h2 className="text-3xl font-bold">Student Reviews</h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <p className="text-blue-600">
                    This course exceeded my expectations. The lessons were
                    engaging and the instructors were very knowledgeable.
                  </p>
                  <p className="mt-2 font-semibold">- Jane Doe</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <p className="text-blue-600">
                    I highly recommend this course to anyone looking to advance
                    their skills. The content was thorough and well-organized.
                  </p>
                  <p className="mt-2 font-semibold">- John Smith</p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="bg-blue-50 py-12">
            <div className="container mx-auto px-6 text-center text-blue-800">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-4 text-blue-600">
                Have questions? Feel free to reach out to us for more
                information about the course.
              </p>
              <a
                href="mailto:info@course.com"
                className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Email Us
              </a>
            </div>
          </section>
        </main>

        <footer className="bg-blue-900 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 {"Pratham's Academy"}. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
