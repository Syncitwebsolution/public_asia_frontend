import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
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

        {/* Header Section */}
        <header className="border-b border-gray-100 pb-8 mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            निजता नीति (Privacy Policy)
          </h1>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Public Asia News Portal - Google AdSense & Legal Policy Disclosure
          </p>
          <div className="mt-4 inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-red-100">
            अंतिम अपडेट (Last Updated): {new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric', day: 'numeric' })}
          </div>
        </header>

        <section className="prose max-w-none text-gray-700 leading-relaxed space-y-10 font-medium">
          {/* Introduction */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <p className="text-lg font-bold text-gray-800 leading-relaxed m-0">
              <strong>Public Asia</strong> (https://publicasia.in) में आपका स्वागत है। आपकी निजता (Privacy) हमारे लिए अत्यंत महत्वपूर्ण है। यह निजता नीति (Privacy Policy) दस्तावेज ब्योरा देता है कि जब आप हमारी समाचार वेबसाइट का उपयोग करते हैं, तो हम किस प्रकार की जानकारी एकत्र करते हैं, उसे कैसे संसाधित करते हैं, और Google AdSense जैसे विज्ञापनों के संदर्भ में आपके अधिकारों की सुरक्षा कैसे की जाती है।
            </p>
          </div>

          {/* 1. Information Collection */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</span>
              जानकारी जो हम एकत्र करते हैं (Information We Collect)
            </h2>
            <p className="mb-4">हम अपने उपयोगकर्ताओं से निम्नलिखित प्रकार की जानकारी एकत्र कर सकते हैं:</p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-black">•</span>
                <span><strong>व्यक्तिगत पहचान योग्य जानकारी (Personal Data):</strong> जब आप हमारे न्यूज़लेटर की सदस्यता लेते हैं, टिप्पणी (Comment) करते हैं, या संपर्क फ़ॉर्म भरते हैं, तो हम आपका नाम, ईमेल पता (Email Address) तथा फ़ोन नंबर एकत्र कर सकते हैं।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-black">•</span>
                <span><strong>गैर-व्यक्तिगत एवं तकनीकी डेटा (Non-Personal Technical Data):</strong> इसमें आपका इंटरनेट प्रोटोकॉल (IP) पता, ब्राउज़र प्रकार, डिवाइस का प्रकार, ऑपरेटिंग सिस्टम, रेफ़रिंग/एग्जिट पेज और समय की मुहर (Timestamps) शामिल हैं।</span>
              </li>
            </ul>
          </div>

          {/* 2. Log Files & Analytics */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</span>
              लॉग फ़ाइलें और विश्लेषिकी (Log Files & Analytics)
            </h2>
            <p className="m-0">
              Public Asia मानक लॉग फ़ाइलों (Log Files) का उपयोग करने की एक मानक प्रक्रिया का पालन करता है। ये फ़ाइलें वेबसाइट पर आने वाले आगंतुकों को लॉग करती हैं। जब उपयोगकर्ता हमारी वेबसाइट पर आते हैं तो सभी होस्टिंग कंपनियां ऐसा करती हैं और यह वेब होस्टिंग सेवाओं के विश्लेषण (Analytics) का एक हिस्सा है। लॉग फ़ाइलों द्वारा एकत्र की गई जानकारी का उपयोग रुझानों का विश्लेषण करने, साइट का प्रबंधन करने, और जनसांख्यिकीय जानकारी एकत्र करने के लिए किया जाता है।
            </p>
          </div>

          {/* 3. Cookies, AdSense & DART Cookies (CRITICAL FOR ADSENSE) */}
          <div className="bg-red-50/70 p-6 md:p-8 rounded-2xl border border-red-100">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</span>
              कुकीज़, गूगल एडसेंस एवं डार्ट कुकी (Cookies, Google AdSense & DART Cookies)
            </h2>
            <div className="space-y-4 text-gray-800">
              <p>
                किसी भी अन्य वेबसाइट की तरह, Public Asia 'कुकीज़' (Cookies) का उपयोग करता है। इन कुकीज़ का उपयोग आगंतुकों की प्राथमिकताओं और वेबसाइट के उन पृष्ठों सहित जानकारी को संग्रहीत करने के लिए किया जाता है जिन पर आगंतुक ने एक्सेस किया या दौरा किया।
              </p>
              <div className="bg-white p-5 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-700 text-lg mb-2">गूगल एडसेंस नीतियां (Google AdSense Policy Disclosures):</h3>
                <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-gray-700">
                  <li><strong>तृतीय-पक्ष विक्रेता (Third-Party Vendors):</strong> गूगल (Google) सहित तृतीय-पक्ष विक्रेता हमारी वेबसाइट पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करते हैं।</li>
                  <li><strong>डार्ट कुकी (Google DART Cookie):</strong> गूगल द्वारा DART कुकी का उपयोग इसे और इसके भागीदारों को हमारे उपयोगकर्ताओं को हमारी साइट और/या इंटरनेट पर अन्य साइटों के उनके दौरे के आधार पर विज्ञापन परोसने में सक्षम बनाता है।</li>
                  <li><strong>रुचि आधारित विज्ञापन (Interest-Based Advertising):</strong> विज्ञापन आपकी पिछली ब्राउज़िंग गतिविधियों के आधार पर अधिक प्रासंगिक समाचार और उत्पाद प्रदर्शित करने के लिए लक्षित हो सकते हैं।</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Ad Personalization & Opt-Out */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">4</span>
              विज्ञापन पर्सनलाइज़ेशन और ऑप्ट-आउट (Ad Personalization Opt-Out Options)
            </h2>
            <p className="mb-4">
              उपयोगकर्ता DART कुकी के उपयोग को रद्द (Opt-out) कर सकते हैं और व्यक्तिगत विज्ञापनों को नियंत्रित कर सकते हैं:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-900 mb-1">Google विज्ञापन सेटिंग्स के माध्यम से:</p>
                <p className="text-sm text-gray-600 mb-2">आप गूगल की विज्ञापन गोपनीयता नीति पर जाकर व्यक्तिगत विज्ञापनों से बाहर निकल सकते हैं:</p>
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-600 hover:text-red-800 font-bold underline text-sm inline-flex items-center gap-1"
                >
                  https://www.google.com/settings/ads &rarr;
                </a>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-900 mb-1">नेटवर्क विज्ञापन पहल (Network Advertising Initiative):</p>
                <p className="text-sm text-gray-600 mb-2">आप तृ़तीय-पक्ष विज्ञापन विक्रेताओं के कुकीज़ के उपयोग को रोकने के लिए नीचे दिए गए लिंक पर जा सकते हैं:</p>
                <a 
                  href="http://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-600 hover:text-red-800 font-bold underline text-sm inline-flex items-center gap-1"
                >
                  http://www.aboutads.info/choices/ &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* 5. Third-Party Privacy Policies */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">5</span>
              तृतीय-पक्ष विज्ञापन नेटवर्क (Third-Party Ad Servers & Networks)
            </h2>
            <p>
              Public Asia की निजता नीति अन्य विज्ञापनदाताओं या वेबसाइटों पर लागू नहीं होती है। इस प्रकार, हम आपको सलाह देते हैं कि अधिक विस्तृत जानकारी के लिए इन तृतीय-पक्ष विज्ञापन सर्वरों की संबंधित गोपनीयता नीतियों से परामर्श करें। इसमें कुछ विकल्पों को ऑप्ट-आउट करने के तरीकों के बारे में उनके अभ्यास और निर्देश शामिल हो सकते हैं।
            </p>
          </div>

          {/* 6. User Rights (GDPR, CCPA & Indian DPDP Act) */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">6</span>
              डेटा सुरक्षा अधिकार (GDPR, CCPA/CPRA & DPDP Rights)
            </h2>
            <p className="mb-4">हम यह सुनिश्चित करना चाहते हैं कि आप अपने सभी डेटा सुरक्षा अधिकारों से पूरी तरह अवगत हैं:</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">GDPR (यूरोपीय संघ डेटा अधिकार):</h3>
                <p className="text-gray-600">आपको अपने व्यक्तिगत डेटा तक पहुँचने, उसे सुधारने, मिटाने (Right to Erasure), और उसके प्रसंस्करण को प्रतिबंधित करने का अधिकार प्राप्त है।</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">CCPA / CPRA (कैलिफ़ोर्निया निजता अधिकार):</h3>
                <p className="text-gray-600">कैलिफ़ोर्निया के उपभोक्ताओं को यह अनुरोध करने का अधिकार है कि हम उनके एकत्र किए गए व्यक्तिगत डेटा को बेचे नहीं (Do Not Sell My Personal Information)।</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act) के तहत, आपको अपने व्यक्तिगत डेटा के संबंध में सहमति वापस लेने और शिकायत निवारण का पूर्ण अधिकार है।
            </p>
          </div>

          {/* 7. Children's Privacy */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">7</span>
              बच्चों की निजता का संरक्षण (Children's Online Privacy - COPPA)
            </h2>
            <p className="m-0">
              हमारी प्राथमिकता का एक अन्य भाग इंटरनेट का उपयोग करते समय बच्चों के लिए सुरक्षा जोड़ना है। हम माता-पिता और अभिभावकों को उनकी ऑनलाइन गतिविधि का निरीक्षण करने, उसमें भाग लेने और/या निगरानी करने और मार्गदर्शन करने के लिए प्रोत्साहित करते हैं। Public Asia 13 वर्ष से कम उम्र के बच्चों से जानबूझकर कोई व्यक्तिगत पहचान योग्य जानकारी एकत्र नहीं करता है।
            </p>
          </div>

          {/* 8. Data Security */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">8</span>
              डेटा सुरक्षा (Data Security)
            </h2>
            <p className="m-0">
              हम आपके व्यक्तिगत डेटा को अनधिकृत पहुंच, परिवर्तन, प्रकटीकरण या विनाश से बचाने के लिए उचित डेटा संग्रह, भंडारण और प्रसंस्करण प्रथाओं और सुरक्षा उपायों (जैसे SSL एन्क्रिप्शन) को अपनाते हैं।
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-950 text-white p-8 md:p-10 rounded-3xl mt-12 shadow-2xl">
            <h2 className="text-2xl font-black mb-3 uppercase tracking-tight text-white">
              निजता अधिकारी एवं संपर्क (Data Protection & Privacy Officer)
            </h2>
            <p className="text-gray-400 mb-6 font-medium">
              यदि इस निजता नीति या आपके डेटा अधिकारों के संबंध में आपके कोई प्रश्न, सुझाव या चिंताएँ हैं, तो कृपया हमारे नोडल अधिकारी से संपर्क करें:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0">
                  @
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Privacy Email</p>
                  <a href="mailto:privacy@publicasia.in" className="text-white font-bold hover:text-red-400 transition-colors text-sm">privacy@publicasia.in</a>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0">
                  @
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">General Inquiry</p>
                  <a href="mailto:contact@publicasia.in" className="text-white font-bold hover:text-red-400 transition-colors text-sm">contact@publicasia.in</a>
                </div>
              </div>
            </div>
          </div>

        </section>
      </article>
    </main>
  );
};

export default PrivacyPolicy;