// frontend/src/pages/Contact.jsx
import Footer from '../components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">Have a question about our platform, enterprise pricing, or need technical support? We're here to help.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                <p className="text-gray-600 text-sm">support@learnsphere.com</p>
                <p className="text-gray-600 text-sm">sales@learnsphere.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Headquarters</h4>
                <p className="text-gray-600 text-sm">123 Tech Boulevard<br/>Suite 400<br/>San Francisco, CA 94105</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567<br/>Mon-Fri, 9am - 5pm PST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-primary-500 bg-gray-50" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-primary-500 bg-gray-50" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-primary-500 bg-gray-50" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows="5" className="w-full border border-gray-300 p-3 rounded-xl focus:outline-primary-500 bg-gray-50" placeholder="How can we help you?"></textarea>
              </div>
              <button className="bg-primary-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-600 transition shadow-md shadow-primary-500/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}