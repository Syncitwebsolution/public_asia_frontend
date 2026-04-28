import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Bulletproof scroll-to-top logic (instant scroll after DOM loads)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-8 flex flex-col">
      <section className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-2xl shadow-sm border border-gray-100 mb-12 flex-grow">

        <header className="text-center border-b pb-8 mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">हमसे संपर्क करें</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Public Asia की टीम हमेशा आपकी बात सुनने के लिए तैयार है। खबर की टिप देनी हो या विज्ञापन देना हो, बेझिझक संपर्क करें।
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">

          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-8 border-l-4 border-red-600 pl-4 uppercase tracking-tight">मुख्य कार्यालय</h2>
              <div className="space-y-8">
                <div className="flex gap-5 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">पता</p>
                    <p className="text-gray-900 font-bold leading-relaxed">Public Asia हेडक्वार्टर<br />नई दिल्ली, भारत</p>
                  </div>
                </div>

                <div className="flex gap-5 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-200">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">फ़ोन नंबर</p>
                    <p className="text-gray-900 font-bold">+91 1234567890</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Department Emails - For a professional News vibe */}
            <div>
              <h3 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-tight">विभागीय ईमेल</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-red-200 transition-all shadow-sm hover:shadow-md">
                  <Mail size={24} className="text-red-600 mb-3" />
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">संपादकीय</p>
                  <a href="mailto:editor@publicasia.in" className="text-gray-900 font-bold hover:text-red-600 transition-colors">editor@publicasia.in</a>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-red-200 transition-all shadow-sm hover:shadow-md">
                  <Mail size={24} className="text-red-600 mb-3" />
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">विज्ञापन</p>
                  <a href="mailto:ads@publicasia.in" className="text-gray-900 font-bold hover:text-red-600 transition-colors">ads@publicasia.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/98 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">संदेश भेज दिया गया!</h3>
                <p className="text-gray-500 font-medium">हम जल्द ही आपसे संपर्क करेंगे। Public Asia से जुड़ने के लिए धन्यवाद।</p>
              </div>
            )}

            <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tight">हमें संदेश भेजें</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-black text-gray-400 uppercase tracking-widest">पूरा नाम</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:border-red-500 transition-all font-medium" placeholder="आपका नाम" required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest">ईमेल</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:border-red-500 transition-all font-medium" placeholder="आपका ईमेल" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-black text-gray-400 uppercase tracking-widest">विषय</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:border-red-500 transition-all font-medium" placeholder="विषय चुनें..." required />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-black text-gray-400 uppercase tracking-widest">संदेश</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white focus:border-red-500 transition-all resize-none font-medium" placeholder="अपना संदेश लिखें..." required></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-3 font-black py-5 rounded-2xl transition-all shadow-xl text-sm uppercase tracking-widest ${isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200 active:scale-[0.98]'}`}
              >
                {isSubmitting ? 'भेजा जा रहा है...' : (
                  <>संदेश भेजें <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;