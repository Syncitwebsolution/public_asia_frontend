import React, { useEffect } from 'react';

const TermsCondition = () => {
  // Using useEffect to scroll the page to the top when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // This provides a smooth scrolling effect
    });
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen pt-8 flex flex-col">
      <article className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl shadow-sm border border-gray-100 mb-12 flex-grow">

        <header className="border-b border-gray-50 pb-8 mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            नियम और शर्तें (Terms & Conditions)
          </h1>
          <div className="mt-4 inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            अंतिम अपडेट: 28 अप्रैल 2026
          </div>
        </header>

        <section className="prose max-w-none text-gray-700 leading-relaxed space-y-10 font-medium">
          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            Public Asia वेबसाइट तक पहुँचने और उसका उपयोग करने के लिए आपका स्वागत है। हमारी वेबसाइट का उपयोग करके, आप निम्नलिखित नियमों और शर्तों को स्वीकार करने और उनका पालन करने के लिए सहमत होते हैं।
          </p>

          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              सामग्री का उपयोग
            </h2>
            <p>
              इस वेबसाइट पर प्रकाशित सभी सामग्री (समाचार, लेख, चित्र, वीडियो) <strong>Public Asia</strong> की संपत्ति है। आप इस सामग्री का उपयोग केवल व्यक्तिगत और गैर-व्यावसायिक उद्देश्यों के लिए कर सकते हैं। बिना पूर्व लिखित अनुमति के किसी भी सामग्री का पुनरुत्पादन या वितरण सख्त वर्जित है।
            </p>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
              उपयोगकर्ता आचरण
            </h2>
            <p>
              आप हमारी वेबसाइट का उपयोग किसी भी गैरकानूनी, अपमानजनक, या हानिकारक गतिविधि के लिए नहीं करने के लिए सहमत हैं। टिप्पणियों (Comments) में गाली-गलौज, नफरत फैलाने वाले भाषण या स्पैम की अनुमति नहीं है। हम ऐसे किसी भी उपयोगकर्ता को ब्लॉक करने का अधिकार सुरक्षित रखते हैं।
            </p>
          </div>

          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
              बाहरी लिंक
            </h2>
            <p>
              हमारी वेबसाइट में अन्य तृतीय-पक्ष (Third-party) वेबसाइटों के लिंक हो सकते हैं। हम उन वेबसाइटों की सामग्री या गोपनीयता नीतियों के लिए ज़िम्मेदार नहीं हैं। उन साइटों का उपयोग आपके अपने जोखिम पर है।
            </p>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">4</span>
              नियम और शर्तों में परिवर्तन
            </h2>
            <p>
              हम किसी भी समय इन नियमों और शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। परिवर्तन पोस्ट किए जाने के बाद आपका निरंतर उपयोग उन परिवर्तनों की स्वीकृति माना जाएगा।
            </p>
          </div>

          <div className="bg-gray-950 text-white p-8 md:p-12 rounded-3xl mt-12 text-center shadow-2xl">
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">धन्यवाद</h3>
            <p className="text-gray-400 font-bold max-w-lg mx-auto">
              Public Asia पर भरोसा करने के लिए धन्यवाद। हम आपको बेहतरीन समाचार अनुभव प्रदान करने के लिए प्रतिबद्ध हैं।
            </p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default TermsCondition;