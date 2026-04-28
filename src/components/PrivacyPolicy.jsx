import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  // To scroll to the top as soon as the page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen pt-8 flex flex-col">
      <article className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl shadow-sm border border-gray-100 mb-12 flex-grow">

        <header className="border-b border-gray-50 pb-8 mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            निजता नीति (Privacy Policy)
          </h1>
          <div className="mt-4 inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            अंतिम अपडेट: 28 अप्रैल 2026
          </div>
        </header>

        <section className="prose max-w-none text-gray-700 leading-relaxed space-y-10 font-medium">
          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            Public Asia में आपका स्वागत है। आपकी निजता (Privacy) हमारे लिए सर्वोपरि है। यह नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं, तो हम आपका डेटा कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
          </p>

          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
              जानकारी जो हम एकत्र करते हैं
            </h2>
            <p className="mb-4">हम दो प्रकार की जानकारी एकत्र करते हैं:</p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-red-600 font-black">•</span>
                <span><strong>व्यक्तिगत जानकारी:</strong> जब आप न्यूज़लेटर सब्सक्राइब करते हैं, अकाउंट बनाते हैं या कमेंट करते हैं, तब हम आपका नाम, ईमेल और फोन नंबर एकत्र कर सकते हैं।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-black">•</span>
                <span><strong>गैर-व्यक्तिगत जानकारी:</strong> इसमें आपका IP एड्रेस, ब्राउज़र का प्रकार, डिवाइस की जानकारी और हमारी साइट पर बिताया गया समय शामिल है, जो एनालिटिक्स के लिए उपयोग किया जाता है।</span>
              </li>
            </ul>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
              कुकीज़ (Cookies) और ट्रैकिंग
            </h2>
            <p>
              हम यूज़र एक्सपीरियंस को बेहतर बनाने और प्रासंगिक विज्ञापन (Relevant Ads) दिखाने के लिए कुकीज़ का उपयोग करते हैं। आप अपनी ब्राउज़र सेटिंग से कुकीज़ को डिसेबल कर सकते हैं, लेकिन इससे वेबसाइट के कुछ फीचर्स काम करना बंद कर सकते हैं।
            </p>
          </div>

          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
              थर्ड-पार्टी लिंक्स और विज्ञापन
            </h2>
            <p>
              हमारी वेबसाइट पर Google AdSense या अन्य थर्ड-पार्टी विज्ञापनदाताओं के लिंक हो सकते हैं। ये नेटवर्क आपके ब्राउज़िंग पैटर्न के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग कर सकते हैं। हम इन थर्ड-पार्टी वेबसाइटों की प्राइवेसी पॉलिसी के लिए ज़िम्मेदार नहीं हैं।
            </p>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm">4</span>
              डेटा सुरक्षा और गोपनीयता
            </h2>
            <p>
              हम आपके डेटा को सुरक्षित रखने के लिए इंडस्ट्री-स्टैंडर्ड एन्क्रिप्शन (SSL) का उपयोग करते हैं। हम कानूनी दायित्वों (Legal obligations) को छोड़कर, आपकी सहमति के बिना कभी भी आपका डेटा किसी तीसरे पक्ष को बेचते या साझा नहीं करते हैं।
            </p>
          </div>

          <div className="bg-gray-900 text-white p-8 md:p-10 rounded-3xl mt-12 shadow-2xl">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">संपर्क करें</h2>
            <p className="text-gray-400 mb-6 font-bold">यदि इस निजता नीति के संबंध में आपके कोई प्रश्न या सुझाव हैं, तो कृपया हमसे संपर्क करें:</p>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                 <span className="font-black text-sm">@</span>
              </div>
              <a href="mailto:privacy@publicasia.in" className="text-white font-bold hover:text-red-500 transition-colors">privacy@publicasia.in</a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default PrivacyPolicy;