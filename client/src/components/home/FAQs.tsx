import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through our website or mobile app by selecting your preferred doctor, date, and time. You'll receive a confirmation email with all the details."
    },
    {
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare. Please contact our billing department for specific coverage questions."
    },
    {
      question: "Can I access my medical records online?",
      answer: "Yes, our patient portal allows you to securely access your medical records, test results, and treatment plans anytime from any device."
    },
    {
      question: "What safety measures are in place for COVID-19?",
      answer: "We follow all CDC guidelines including mandatory masks, enhanced cleaning protocols, social distancing in waiting areas, and telehealth options when appropriate."
    },
    {
      question: "How do I get prescription refills?",
      answer: "Prescription refills can be requested through your patient portal or by calling our office. Please allow 48 hours for processing."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gray-700/10 text-gray-700 px-4 py-2 rounded-full mb-4">
            <FaQuestionCircle className="mr-2 text-blue-600" />
            <span className="text-sm font-medium">FAQs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common Questions <span className="text-blue-600">Answered</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get quick answers to the questions we hear most often from our patients.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center p-6 rounded-lg transition-all duration-300 text-left ${
                  activeIndex === index 
                    ? 'bg-gray-700 text-white shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900 shadow-md'
                }`}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className={`transition-colors ${
                    activeIndex === index ? 'text-white' : 'text-gray-500'
                  }`} />
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className={`px-6 ${
                  activeIndex === index 
                    ? 'bg-gray-50 border border-gray-200' 
                    : 'bg-transparent'
                } rounded-b-lg`}
              >
                <p className="py-4 text-gray-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-md">
            Contact Our Support Team
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;