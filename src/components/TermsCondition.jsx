import React, { useEffect } from 'react';

const TermsCondition = () => {
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
            नियम और शर्तें (Terms & Conditions)
          </h1>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Public Asia News Portal - Terms of Service & Legal Disclaimer
          </p>
          <div className="mt-4 inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-red-100">
            अंतिम अपडेट (Last Updated): {new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric', day: 'numeric' })}
          </div>
        </header>

        <section className="prose max-w-none text-gray-700 leading-relaxed space-y-10 font-medium">

          {/* Introduction */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <p className="text-lg font-bold text-gray-800 leading-relaxed m-0">
              <strong>Public Asia</strong> (https://publicasia.in) का उपयोग करने में आपकी रुचि के लिए धन्यवाद। हमारी वेबसाइट पर पहुँचने या इसका उपयोग करके, आप निम्नलिखित नियमों और शर्तों (Terms & Conditions) का पालन करने के लिए कानूनी रूप से बाध्य होने की सहमति व्यक्त करते हैं। यदि आप इनमें से किसी भी शर्त से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।
            </p>
          </div>

          {/* 1. Acceptance of Terms */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">1</span>
              नियमों की स्वीकृति (Acceptance of Terms)
            </h2>
            <p className="m-0">
              यह शर्तें Public Asia और आपके (उपयोगकर्ता) के बीच एक कानूनी रूप से बाध्यकारी समझौता बनाती हैं। Public Asia का उपयोग करके आप पुष्टि करते हैं कि आपकी आयु कम से कम 18 वर्ष है, या आप माता-पिता/अभिभावक की देखरेख में इस साइट का उपयोग कर रहे हैं।
            </p>
          </div>

          {/* 2. Intellectual Property & Content Usage */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">2</span>
              सामग्री का उपयोग एवं बौद्धिक संपदा (Intellectual Property & Copyright)
            </h2>
            <div className="space-y-3">
              <p>
                Public Asia पर प्रकाशित सभी पाठ, समाचार रिपोर्ट, फोटो, ग्राफिक्स, लोगो, ऑडियो, वीडियो और सॉफ्टवेयर की सामग्री <strong>Public Asia</strong> या इसके सामग्री आपूर्तिकर्ताओं की बौद्धिक संपदा (Intellectual Property) है और कॉपीराइट कानूनों द्वारा संरक्षित है।
              </p>
              <ul className="space-y-2 list-disc list-inside text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-200">
                <li>आप केवल व्यक्तिगत और गैर-व्यावसायिक उपयोग के लिए समाचार पढ़ और साझा (Share) कर सकते हैं।</li>
                <li>बिना पूर्व लिखित अनुमति के किसी भी समाचार, सामग्री या मीडिया का व्यावसायिक पुनरुत्पादन, संशोधन या पुनर्वितरण सख्त वर्जित है।</li>
              </ul>
            </div>
          </div>

          {/* 3. DMCA & Copyright Infringement Policy (CRITICAL FOR NEWS ADSENSE) */}
          <div className="bg-red-50/70 p-6 md:p-8 rounded-2xl border border-red-100">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">3</span>
              DMCA एवं कॉपीराइट शिकायत नीति (DMCA & Copyright Takedown Policy)
            </h2>
            <p className="mb-3">
              Public Asia दूसरों के बौद्धिक संपदा अधिकारों का सम्मान करता है। यदि आपको लगता है कि आपकी कॉपीराइट की गई सामग्री हमारी वेबसाइट पर बिना अनुमति के प्रकाशित की गई है, तो आप हमारी DMCA टीम को टेकडाउन नोटिस भेज सकते हैं:
            </p>
            <div className="bg-white p-4 rounded-xl border border-red-200 text-sm text-gray-800 space-y-2">
              <p><strong>नोटिस में निम्नलिखित शामिल होना चाहिए:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>कॉपीराइट कार्य का विवरण।</li>
                <li>हमारी साइट पर उल्लंघनकारी सामग्री का सटीक URL या लिंक।</li>
                <li>आपका नाम, पता, फ़ोन नंबर और ईमेल पता।</li>
              </ol>
              <p className="pt-2 text-xs font-bold text-red-700">
                कॉपीराइट शिकायत दर्ज करने के लिए संपर्क करें: <a href="mailto:editor@publicasia.in" className="underline font-extrabold">editor@publicasia.in</a>
              </p>
            </div>
          </div>

          {/* 4. Journalistic Disclaimer & Accuracy of News */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">4</span>
              पत्रकारिता एवं समाचार अस्वीकरण (Journalistic & Editorial Disclaimer)
            </h2>
            <p className="mb-3">
              Public Asia सटीक, निष्पक्ष और समय पर समाचार प्रदान करने का प्रयास करता है। हालाँकि:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>समाचार लेख, विश्लेषण, और कॉलम विभिन्न स्रोतों, संवाददाताओं और प्रेस विज्ञप्तियों पर आधारित होते हैं।</li>
              <li>लेखकों और विचारकों द्वारा व्यक्त किए गए विचार उनके अपने हैं और वे अनिवार्य रूप से Public Asia के संपादकीय रुख का प्रतिनिधित्व नहीं करते हैं।</li>
              <li>हम साइट पर मौजूद जानकारी की पूर्ण सटीकता, पूर्णता या विश्वसनीयता की गारंटी नहीं देते हैं।</li>
            </ul>
          </div>

          {/* 5. Google AdSense & Third-Party Ads Disclaimer (CRITICAL FOR ADSENSE) */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">5</span>
              विज्ञापन एवं थर्ड-पार्टी लिंक अस्वीकरण (Google AdSense & Third-Party Ads Disclaimer)
            </h2>
            <p className="mb-3">
              Public Asia पर <strong>Google AdSense</strong> तथा अन्य तीसरे पक्ष के विज्ञापन नेटवर्क द्वारा प्रायोजित विज्ञापन (Sponsored Ads) और लिंक प्रदर्शित किए जा सकते हैं:
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 text-sm">
              <p>• Public Asia किसी भी तीसरे पक्ष के विज्ञापनों में प्रचारित उत्पादों, सेवाओं या दावों की पुष्टि, समर्थन या गारंटी नहीं करता है।</p>
              <p>• विज्ञापनों पर क्लिक करके बाहरी साइटों पर जाना पूरी तरह से उपयोगकर्ता के अपने जोखिम पर निर्भर है।</p>
              <p>• बाहरी वेबसाइटों पर किए गए किसी भी लेनदेन या नुकसान के लिए Public Asia उत्तरदायी नहीं होगा।</p>
            </div>
          </div>

          {/* 6. User Conduct & Moderation of Comments */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">6</span>
              उपयोगकर्ता आचरण एवं टिप्पणियां (User Conduct & Comment Rules)
            </h2>
            <p className="mb-3">
              हमारी वेबसाइट पर टिप्पणियां (Comments) पोस्ट करते समय, उपयोगकर्ता निम्नलिखित नियमों का पालन करने के लिए सहमत हैं:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>आप गाली-गलौज, नफरत फैलाने वाले भाषण (Hate Speech), मानहानिकारक या गैर-कानूनी सामग्री पोस्ट नहीं करेंगे।</li>
              <li>स्पैम, विज्ञापन या अनधिकृत लिंक पोस्ट करना सख्त मना है।</li>
              <li>Public Asia को बिना किसी पूर्व सूचना के नियमों का उल्लंघन करने वाली टिप्पणियों को हटाने और उपयोगकर्ता खातों को निलंबित/ब्लॉक करने का अधिकार है।</li>
            </ul>
          </div>

          {/* 7. Limitation of Liability */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">7</span>
              दायित्व की सीमा (Limitation of Liability)
            </h2>
            <p className="m-0 text-sm md:text-base">
              कानून द्वारा अनुमत अधिकतम सीमा तक, Public Asia, इसके निदेशक, कर्मचारी या सहयोगी किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए उत्तरदायी नहीं होंगे जो आपकी इस वेबसाइट के उपयोग या उपयोग करने में असमर्थता से उत्पन्न होता है।
            </p>
          </div>

          {/* 8. Governing Law & Jurisdiction */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">8</span>
              लागू कानून और क्षेत्राधिकार (Governing Law & Jurisdiction)
            </h2>
            <p className="m-0 text-sm md:text-base">
              ये नियम और शर्तें भारत गणराज्य के कानूनों (जैसे सूचना प्रौद्योगिकी अधिनियम, 2000) के अनुसार शासित और व्याख्यायित की जाएंगी। इन शर्तों से उत्पन्न होने वाला कोई भी कानूनी विवाद नई दिल्ली, भारत में स्थित अदालतों के अनन्य क्षेत्राधिकार के अधीन होगा।
            </p>
          </div>

          {/* 9. Modifications to Terms */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-100 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">9</span>
              शर्तों में संशोधन (Modifications to Terms)
            </h2>
            <p className="m-0 text-sm md:text-base">
              हम किसी भी समय इन नियमों और शर्तों को संशोधित करने या बदलने का अधिकार सुरक्षित रखते हैं। किसी भी बदलाव के बाद वेबसाइट का निरंतर उपयोग आपकी संशोधित शर्तों की स्वीकृति माना जाएगा।
            </p>
          </div>

          {/* Contact & Legal Notices */}
          <div className="bg-gray-950 text-white p-8 md:p-10 rounded-3xl mt-12 shadow-2xl">
            <h2 className="text-2xl font-black mb-3 uppercase tracking-tight text-white">
              संपादकीय एवं कानूनी संपर्क (Legal & Editorial Contact)
            </h2>
            <p className="text-gray-400 mb-6 font-medium">
              यदि आपके पास इन नियमों और शर्तों या कॉपीराइट मुद्दों के बारे में कोई प्रश्न हैं, तो कृपया हमारी कानूनी / संपादकीय टीम से संपर्क करें:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0">
                  @
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Editorial & DMCA Email</p>
                  <a href="mailto:editor@publicasia.in" className="text-white font-bold hover:text-red-400 transition-colors text-sm">editor@publicasia.in</a>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0">
                  @
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Legal Contact</p>
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

export default TermsCondition;