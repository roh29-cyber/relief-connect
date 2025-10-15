import React, { createContext, useContext, useState, useMemo } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

const translations = {
  en: {
    header: { title: 'Disaster Response Hub', tagline: 'Emergency Support & Community Aid', signIn: 'Sign In', logout: 'Logout' },
    home: {
      heroTitle: 'India Disaster Response',
      heroSubtitle: 'Help and updates tailored for your region',
      getHelp: 'Get Emergency Help Now',
      reportIncident: 'Report Incident',
      advisoryTitle: 'Active Advisory',
      advisoryBody: 'Stay updated via Live Updates. For emergencies in India, call 112 (national), 100 (police), 108 (ambulance), 101 (fire).',
      recentUpdates: 'Recent Updates'
    },
    live: {
      title: 'Live Updates',
      desc: 'Real-time disaster alerts and emergency information',
      lastUpdated: 'Last updated',
      refresh: 'Refresh',
      filterLabel: 'Filter by severity:',
      noAlertsAll: 'There are currently no active alerts in your area.',
      noAlertsSeverity: (sev) => `No ${sev} severity alerts at this time.`,
      source: 'Source:',
    },
    emergency: {
      modalTitle: 'Emergency Contacts',
      important: 'Important:',
      importantBody: 'In life-threatening emergencies, call 112 immediately. This app provides support resources but is not a substitute for emergency services.'
    },
    emergencyContacts: 'Emergency Contacts',
    national: 'Emergency Services (National)',
    police: 'Police',
    ambulance: 'Ambulance',
    fire: 'Fire',
    kitTitle: 'Emergency Kit Essentials',
    kitItems: [
      'Water (1 gallon per person per day)',
      'Non-perishable food (3-day supply)',
      'Battery-powered radio',
      'Flashlight and extra batteries',
      'First aid kit',
      'Medications',
      'Important documents',
      'Cash and credit cards',
      'Emergency contact information',
      'Blankets and clothing'
    ]
  },
  hi: {
    header: { title: 'आपदा सहायता केंद्र', tagline: 'आपातकालीन सहायता और सामुदायिक सहयोग', signIn: 'साइन इन', logout: 'लॉगआउट' },
    home: {
      heroTitle: 'भारत आपदा प्रतिक्रिया',
      heroSubtitle: 'आपके क्षेत्र के अनुसार सहायता और अपडेट',
      getHelp: 'तुरंत मदद प्राप्त करें',
      reportIncident: 'घटना रिपोर्ट करें',
      advisoryTitle: 'महत्वपूर्ण परामर्श',
      advisoryBody: 'लाइव अपडेट देखें। भारत में आपातकाल के लिए 112 (राष्ट्रीय), 100 (पुलिस), 108 (एम्बुलेंस), 101 (अग्निशमन) पर कॉल करें।',
      recentUpdates: 'हालिया अपडेट'
    },
    live: {
      title: 'लाइव अपडेट',
      desc: 'रीयल-टाइम आपदा अलर्ट और आपात जानकारी',
      lastUpdated: 'अंतिम अपडेट',
      refresh: 'रिफ्रेश',
      filterLabel: 'गंभीरता के अनुसार फ़िल्टर:',
      noAlertsAll: 'आपके क्षेत्र में फिलहाल कोई सक्रिय अलर्ट नहीं है।',
      noAlertsSeverity: (sev) => `फिलहाल ${sev} स्तर के अलर्ट नहीं हैं।`,
      source: 'स्रोत:',
    },
    emergency: {
      modalTitle: 'आपातकालीन संपर्क',
      important: 'महत्वपूर्ण:',
      importantBody: 'जानलेवा आपात स्थिति में तुरंत 112 पर कॉल करें। यह ऐप सहायता संसाधन प्रदान करता है, आपात सेवाओं का विकल्प नहीं है।'
    },
    emergencyContacts: 'आपातकालीन संपर्क',
    national: 'आपातकालीन सेवाएं (राष्ट्रीय)',
    police: 'पुलिस',
    ambulance: 'एम्बुलेंस',
    fire: 'अग्निशमन',
    kitTitle: 'आपातकालीन किट आवश्यकताएँ',
    kitItems: [
      'पानी (प्रति व्यक्ति प्रति दिन 1 गैलन)',
      'नाश न होने वाला भोजन (3 दिन की मात्रा)',
      'बैटरी से चलने वाला रेडियो',
      'टॉर्च और अतिरिक्त बैटरियाँ',
      'फर्स्ट एड किट',
      'दवाइयाँ',
      'महत्वपूर्ण दस्तावेज',
      'नकद और कार्ड',
      'आपातकालीन संपर्क जानकारी',
      'कंबल और कपड़े'
    ]
  },
  te: {
    header: { title: 'విపత్తు సహాయ కేంద్రం', tagline: 'అత్యవసర సహాయం & కమ్యూనిటీ సాయం', signIn: 'సైన్ ఇన్', logout: 'లాగ్ అవుట్' },
    home: {
      heroTitle: 'భారత విపత్తు ప్రతిస్పందన',
      heroSubtitle: 'మీ ప్రాంతానికి అనుగుణంగా సహాయం మరియు నవీకరణలు',
      getHelp: 'తక్షణ సహాయం పొందండి',
      reportIncident: 'ఘటనను నివేదించండి',
      advisoryTitle: 'ప్రస్తుత హెచ్చరిక',
      advisoryBody: 'లైవ్ అప్డేట్స్ చూడండి. అత్యవసర పరిస్థితుల్లో: 112 (జాతీయ), 100 (పోలీసు), 108 (ఆంబులెన్స్), 101 (ఫైర్) కాల్ చేయండి.',
      recentUpdates: 'తాజా నవీకరణలు'
    },
    live: {
      title: 'లైవ్ అప్డేట్స్',
      desc: 'రియల్-టైమ్ విపత్తు హెచ్చరికలు మరియు సమాచారం',
      lastUpdated: 'చివరి నవీకరణ',
      refresh: 'రిఫ్రెష్',
      filterLabel: 'తీవ్రత ప్రకారం ఫిల్టర్:',
      noAlertsAll: 'మీ ప్రాంతంలో ప్రస్తుతం హెచ్చరికలు లేవు.',
      noAlertsSeverity: (sev) => `ప్రస్తుతం ${sev} హెచ్చరికలు లేవు.`,
      source: 'మూలం:',
    },
    emergency: {
      modalTitle: 'అత్యవసర సంపర్కాలు',
      important: 'ముఖ్యం:',
      importantBody: 'ప్రాణాపాయం ఉన్నప్పుడు వెంటనే 112 కి కాల్ చేయండి. ఈ యాప్ సూచనలు మాత్రమే ఇస్తుంది, ఇది అత్యవసర సేవలకు ప్రత్యామ్నాయం కాదు.'
    },
    emergencyContacts: 'అత్యవసర సంపర్కాలు',
    national: 'అత్యవసర సేవలు (జాతీయ)',
    police: 'పోలీసు',
    ambulance: 'ఆంబులెన్స్',
    fire: 'అగ్నిమాపక',
    kitTitle: 'ఎమర్జెన్సీ కిట్ అవసరాలు',
    kitItems: [
      'నీరు (ప్రతి వ్యక్తికి రోజుకు 1 గ్యాలన్)',
      'దీర్ఘకాలిక ఆహారం (3 రోజుల సరఫరా)',
      'బ్యాటరీ రేడియో',
      'టార్చ్ మరియు అదనపు బ్యాటరీలు',
      'ఫస్ట్ ఎయిడ్ కిట్',
      'ఔషధాలు',
      'ముఖ్య పత్రాలు',
      'నగదు మరియు కార్డులు',
      'అత్యవసర సంప్రదింపు సమాచారం',
      'బ్లాంకెట్లు మరియు బట్టలు'
    ]
  },
  kn: {
    header: { title: 'ವಿಪತ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಕೇಂದ್ರ', tagline: 'ತುರ್ತು ಬೆಂಬಲ ಮತ್ತು ಸಮುದಾಯ ಸಹಾಯ', signIn: 'ಸೈನ್ ಇನ್', logout: 'ಲಾಗ್ ಔಟ್' },
    home: {
      heroTitle: 'ಭಾರತ ವಿಪತ್ತು ಪ್ರತಿಕ್ರಿಯೆ',
      heroSubtitle: 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಹೊಂದುವ ಸಹಾಯ ಮತ್ತು ನವೀಕರಣಗಳು',
      getHelp: 'ತತ್ಕ್ಷಣ ಸಹಾಯ',
      reportIncident: ' ಘಟನೆ ವರದಿ ',
      advisoryTitle: 'ಸಕ್ರಿಯ ಸಲಹೆ',
      advisoryBody: 'ಲೈವ್ ನವೀಕರಣಗಳನ್ನು ನೋಡಿ. ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ 112 (ರಾಷ್ಟ್ರೀಯ), 100 (ಪೊಲೀಸ್), 108 (ಆಂಬ್ಯುಲೆನ್ಸ್), 101 (ಅಗ್ನಿಶಾಮಕ) ಕರೆ ಮಾಡಿ.',
      recentUpdates: 'ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು'
    },
    live: {
      title: 'ಲೈವ್ ನವೀಕರಣಗಳು',
      desc: 'ರಿಯಲ್-ಟೈಮ್ ವಿಪತ್ತು ಎಚ್ಚರಿಕೆಗಳು',
      lastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
      refresh: 'ರಿಫ್ರೆಶ್',
      filterLabel: 'ತೀವ್ರತೆ ಆಧಾರಿತ ಫಿಲ್ಟರ್:',
      noAlertsAll: 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಪ್ರಸ್ತುತ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ.',
      noAlertsSeverity: (sev) => `ಪ್ರಸ್ತುತ ${sev} ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ.`,
      source: 'ಮೂಲ:',
    },
    emergency: {
      modalTitle: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
      important: 'ಮುಖ್ಯ:',
      importantBody: 'ಪ್ರಾಣಾಪಾಯದ ಸಂದರ್ಭಗಳಲ್ಲಿ ತಕ್ಷಣ 112 ಕರೆ ಮಾಡಿ. ಈ ಅಪ್ಲಿಕೇಶನ್ ಮಾಹಿತಿ ಮಾತ್ರ ಒದಗಿಸುತ್ತದೆ.'
    },
    emergencyContacts: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    national: 'ತುರ್ತು ಸೇವೆಗಳು (ರಾಷ್ಟ್ರೀಯ)',
    police: 'ಪೊಲೀಸ್',
    ambulance: 'ಆಂಬ್ಯುಲೆನ್ಸ್',
    fire: 'ಅಗ್ನಿಶಾಮಕ',
    kitTitle: 'ತುರ್ತು ಕಿಟ್ ಅವಶ್ಯಕತೆಗಳು',
    kitItems: [
      'ನೀರು (ಒಬ್ಬರಿಗೆ ದಿನಕ್ಕೆ 1 ಗ್ಯಾಲನ್)',
      'ನಾಶವಾಗದ ಆಹಾರ (3 ದಿನಗಳ ಪೂರೈಕೆ)',
      'ಬ್ಯಾಟರಿ ರೇಡಿಯೋ',
      'ಟಾರ್ಚ್ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಬ್ಯಾಟರಿಗಳು',
      'ಫಸ್ಟ್ ಎಯ್ಡ್ ಕಿಟ್',
      'ಔಷಧಿಗಳು',
      'ಮುಖ್ಯ ದಾಖಲೆಗಳು',
      'ನಗದು ಮತ್ತು ಕಾರ್ಡ್‌ಗಳು',
      'ತುರ್ತು ಸಂಪರ್ಕ ಮಾಹಿತಿ',
      'ಬ್ಲ್ಯಾಂಕೆಟ್‌ಗಳು ಮತ್ತು ಬಟ್ಟೆಗಳು'
    ]
  },
  bn: {
    header: { title: 'দুর্যোগ সহায়তা কেন্দ্র', tagline: 'জরুরি সহায়তা ও কমিউনিটি সাপোর্ট', signIn: 'সাইন ইন', logout: 'লগ আউট' },
    home: {
      heroTitle: 'ভারত দুর্যোগ প্রতিক্রিয়া',
      heroSubtitle: 'আপনার অঞ্চলের জন্য সহায়তা ও আপডেট',
      getHelp: 'তৎক্ষণাৎ সাহায্য নিন',
      reportIncident: 'ঘটনা রিপোর্ট করুন',
      advisoryTitle: 'সক্রিয় পরামর্শ',
      advisoryBody: 'লাইভ আপডেট দেখুন। জরুরিতে 112 (জাতীয়), 100 (পুলিশ), 108 (অ্যাম্বুলেন্স), 101 (দমকল) কল করুন।',
      recentUpdates: 'সাম্প্রতিক আপডেট'
    },
    live: {
      title: 'লাইভ আপডেট',
      desc: 'রিয়েল-টাইম দুর্যোগ সতর্কতা',
      lastUpdated: 'সর্বশেষ আপডেট',
      refresh: 'রিফ্রেশ',
      filterLabel: 'তীব্রতা অনুযায়ী ফিল্টার:',
      noAlertsAll: 'আপনার এলাকায় বর্তমানে কোনো সতর্কতা নেই।',
      noAlertsSeverity: (sev) => `বর্তমানে ${sev} সতর্কতা নেই।`,
      source: 'উৎস:',
    },
    emergency: {
      modalTitle: 'জরুরি যোগাযোগ',
      important: 'গুরুত্বপূর্ণ:',
      importantBody: 'জরুরি অবস্থায় অবিলম্বে 112 ডায়াল করুন। এই অ্যাপ কেবল সহায়ক তথ্য দেয়।'
    },
    emergencyContacts: 'জরুরি যোগাযোগ',
    national: 'জরুরি পরিষেবা (জাতীয়)',
    police: 'পুলিশ',
    ambulance: 'অ্যাম্বুলেন্স',
    fire: 'দমকল',
    kitTitle: 'জরুরি কিটের প্রয়োজনীয় সামগ্রী',
    kitItems: [
      'পানি (প্রতি ব্যক্তি দৈনিক ১ গ্যালন)',
      'নষ্ট না হওয়া খাদ্য (৩ দিনের সরবরাহ)',
      'ব্যাটারিচালিত রেডিও',
      'টর্চ ও অতিরিক্ত ব্যাটারি',
      'ফার্স্ট এইড কিট',
      'ওষুধপত্র',
      'গুরুত্বপূর্ণ নথি',
      'নগদ ও কার্ড',
      'জরুরি যোগাযোগের তথ্য',
      'কম্বল ও পোশাক'
    ]
  },
  ta: {
    header: { title: 'அபாய உதவி மையம்', tagline: 'அவசர உதவி & சமூக ஆதரவு', signIn: 'சைன் இன்', logout: 'லாக்அவுட்' },
    home: {
      heroTitle: 'இந்தியா பேரிடர் உதவி',
      heroSubtitle: 'உங்கள் மண்டலத்திற்கான உதவி மற்றும் புதுப்பிப்புகள்',
      getHelp: 'உடனடி உதவி பெற',
      reportIncident: 'நிகழ்வை அறிவிக்க',
      advisoryTitle: 'செயலில் அறிவிப்பு',
      advisoryBody: 'லைவ் அப்டேட்ஸை பார்க்கவும். அவசரத்தில் 112 (தேசிய), 100 (போலீஸ்), 108 (ஆம்புலன்ஸ்), 101 (தீயணைப்பு) அழைக்கவும்.',
      recentUpdates: 'சமீபத்திய புதுப்பிப்புகள்'
    },
    live: {
      title: 'நேரடி புதுப்பிப்புகள்',
      desc: 'நேரடி பேரிடர் எச்சரிக்கைகள்',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
      refresh: 'ரீஃப்ரெஷ்',
      filterLabel: 'தீவிரம் படி வடிகட்டி:',
      noAlertsAll: 'உங்கள் பகுதியில் தற்போதைக்கு எச்சரிக்கைகள் இல்லை.',
      noAlertsSeverity: (sev) => `தற்போது ${sev} எச்சரிக்கை இல்லை.`,
      source: 'மூலம்:',
    },
    emergency: {
      modalTitle: 'அவசர தொடர்புகள்',
      important: 'முக்கியம்:',
      importantBody: 'அவசர நிலைகளில் உடனே 112 அழைக்கவும். இந்த பயன்பாடு தகவல் மட்டுமே வழங்குகிறது.'
    },
    emergencyContacts: 'அவசர தொடர்புகள்',
    national: 'அவசர சேவைகள் (தேசிய)',
    police: 'காவல் துறை',
    ambulance: 'மருத்துவ அவசர வண்டி',
    fire: 'தீ அணைப்பு',
    kitTitle: 'அவசரக் கிட் அத்தியாவசியங்கள்',
    kitItems: [
      'தண்ணீர் (ஒருவர் ஒரு நாளுக்கு 1 காலன்)',
      'நீண்டநாள் கெடாத உணவு (3 நாள் அளவு)',
      'பேட்டரி ரேடியோ',
      'டார்ச் மற்றும் கூடுதல் பேட்டரிகள்',
      'முதல் உதவி பெட்டி',
      'மருந்துகள்',
      'முக்கிய ஆவணங்கள்',
      'பணம் மற்றும் கார்டுகள்',
      'அவசர தொடர்பு தகவல்',
      'பிளாங்கெட்டுகள் மற்றும் உடைகள்'
    ]
  }
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en')
  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}


