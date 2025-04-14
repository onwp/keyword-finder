import React from "react";
import KeywordFinder from "./KeywordFinder";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col items-center px-4 py-12 md:py-20 bg-background">
      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Keyword Finder
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Discover powerful related keywords from multiple search engines in
            real-time
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-16"
        >
          <KeywordFinder />
        </motion.div>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              SEO Optimization
            </h3>
            <p className="text-gray-600">
              Discover high-performing keywords that can boost your search
              engine rankings and drive more organic traffic to your website.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Content Creation
            </h3>
            <p className="text-gray-600">
              Find relevant keywords and phrases to enhance your content
              strategy, making your articles more discoverable and engaging.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Market Research
            </h3>
            <p className="text-gray-600">
              Gain valuable insights into what your target audience is searching
              for across multiple platforms to inform your marketing strategy.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Simply enter your search term in the input field above, and our tool
            will instantly fetch related keyword suggestions from Google, Yahoo,
            Bing, and YouTube. Click on any keyword to see search results from
            that platform.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-700">Google</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-gray-700">Yahoo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-700">Bing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-700">YouTube</span>
            </div>
          </div>
        </motion.section>

        <footer className="text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Keyword Finder Tool. All rights
            reserved.
          </p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Home;
