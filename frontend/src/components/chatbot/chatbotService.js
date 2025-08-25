// AI Chatbot Service - Using Google Gemini API to search web from Sunnah websites
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBIOFxTLd_ZqjwxWuRaAaSv5wGbppB1Wts';
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Sunnah websites for authentic Islamic information
const SUNNAH_WEBSITES = [
  'sunnah.com',
  'quran.com',
  'hadithcollection.com',
  'islamweb.net',
  'islamqa.info',
  'islamhouse.com',
  'islamicfinder.org',
  'muslim.or.id',
  'rumahislam.com',
  'muslimah.or.id'
];

// Enhanced response function that searches web from Sunnah sites
export const sendMessage = async (message) => {
  try {
    // First check if it's a simple greeting/thanks that doesn't need web search
    const quickResponse = getQuickResponse(message);
    if (quickResponse) {
      return quickResponse;
    }

    // Check if it's a question that needs web search
    if (shouldSearchWeb(message)) {
      // Try to get web search response from Sunnah websites
      const webResponse = await searchWebFromSunnahSites(message);
      if (webResponse) {
        return webResponse;
      }
    }

    // Fallback response if web search fails or not needed
    return getFallbackResponse(message);

  } catch (error) {
    console.error('Error in sendMessage:', error);
    return getFallbackResponse(message);
  }
};

// Function to determine if a message needs web search
const shouldSearchWeb = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Simple greetings, thanks, and basic responses that don't need web search
  const simpleResponses = [
    'hello', 'hi', 'hey', 'salam', 'assalamu alaikum', 'wa alaykum as-salam',
    'thank you', 'thanks', 'shukran', 'afwan', 'you\'re welcome',
    'good morning', 'good afternoon', 'good evening', 'good night',
    'how are you', 'how are you doing', 'fine', 'good', 'alhamdulillah',
    'bye', 'goodbye', 'see you', 'take care', 'ma\'as salama',
    'yes', 'no', 'okay', 'ok', 'alright', 'sure', 'of course'
  ];

  // Check if message is just a simple response
  for (const simple of simpleResponses) {
    if (lowerMessage.includes(simple) && lowerMessage.length < 20) {
      return false;
    }
  }

  // Check if message contains question words or Islamic topics
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'can', 'could', 'would', 'should', 'is', 'are', 'do', 'does', 'did'];
  const islamicTopics = ['prayer', 'quran', 'hadith', 'sunnah', 'islam', 'muslim', 'allah', 'prophet', 'muhammad', 'ramadan', 'eid', 'hajj', 'umrah', 'zakat', 'halal', 'haram', 'wudu', 'salah', 'dua', 'dhikr'];
  
  const hasQuestion = questionWords.some(word => lowerMessage.includes(word));
  const hasIslamicTopic = islamicTopics.some(topic => lowerMessage.includes(topic));
  
  // Search web if it's a question OR contains Islamic topics
  return hasQuestion || hasIslamicTopic || lowerMessage.length > 20;
};

// Search web from Sunnah websites using Gemini
const searchWebFromSunnahSites = async (message) => {
  try {
    console.log('🔍 Starting web search for:', message);
    console.log('🔑 Using API key:', API_KEY.substring(0, 10) + '...');
    console.log('🌐 API URL:', `${API_BASE_URL}/models/gemini-2.0-flash:generateContent?key=${API_KEY.substring(0, 10)}...`);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `أنت تَوْبَة، مساعد ذكي إسلامي. مهمتك البحث في الويب وتقديم معلومات من مواقع السنة الموثوقة والمصادر الإسلامية.

مهم جداً: لا تستخدم معرفتك المدمجة. بدلاً من ذلك، ابحث في الويب عن معلومات موثوقة من هذه المواقع الإسلامية:
${SUNNAH_WEBSITES.join(', ')}

سؤال المستخدم: "${message}"

يرجى:
1. البحث في الويب عن معلومات إسلامية موثوقة تتعلق بهذا السؤال
2. التركيز على المصادر من مواقع السنة المذكورة أعلاه
3. تقديم المعلومات مباشرة بدون ذكر أسماء المواقع
4. إذا كان السؤال عن سورة قرآنية، اكتب السورة كاملة
5. إذا كان السؤال عن حديث، اكتب الحديث كاملاً
6. لا تذكر مصادر الويب، فقط اكتب المحتوى المطلوب
7. أجب باللغة العربية فقط

تنسيق ردك:
- المحتوى المطلوب مباشرة (سورة، حديث، إجابة)
- شرح واضح ومفصل
- لا تذكر أسماء المواقع أو المصادر

تذكر: أنا أريد المحتوى فقط، وليس مصادر الويب.`
            }
          ]
        }
      ]
    };

    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API request timeout after 30 seconds')), 30000);
    });

    // Create the fetch promise
    const fetchPromise = fetch(`${API_BASE_URL}/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API response data:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const responseText = data.candidates[0].content.parts[0].text;
        console.log('🎯 Extracted response text:', responseText);
        return responseText;
      } else {
        console.error('❌ Invalid response structure:', data);
        return null;
      }
    } else {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, response.statusText);
      console.error('❌ Error details:', errorText);
    }

    return null;
  } catch (error) {
    console.error('💥 Gemini API call failed:', error);
    console.error('💥 Error stack:', error.stack);
    return null;
  }
};

// Fallback response function
const getFallbackResponse = (message) => {
  // Check if the message is about specific Islamic content
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('سورة') || lowerMessage.includes('quran') || lowerMessage.includes('قرآن')) {
    return "عذراً، أعاني حالياً من صعوبات تقنية في الوصول إلى خدمة البحث على الويب. للأسف لا أستطيع البحث عن السورة المطلوبة في الوقت الحالي. يرجى المحاولة مرة أخرى بعد قليل، أو يمكنك زيارة المواقع الإسلامية الموثوقة مثل quran.com أو sunnah.com مباشرة للحصول على النص الكامل للسورة.";
  }
  
  if (lowerMessage.includes('حديث') || lowerMessage.includes('hadith')) {
    return "عذراً، أعاني حالياً من صعوبات تقنية في الوصول إلى خدمة البحث على الويب. للأسف لا أستطيع البحث عن الحديث المطلوب في الوقت الحالي. يرجى المحاولة مرة أخرى بعد قليل، أو يمكنك زيارة المواقع الإسلامية الموثوقة مثل sunnah.com أو islamweb.net مباشرة للحصول على الحديث.";
  }
  
  if (lowerMessage.includes('صلاة') || lowerMessage.includes('prayer') || lowerMessage.includes('wudu') || lowerMessage.includes('وضوء')) {
    return "عذراً، أعاني حالياً من صعوبات تقنية في الوصول إلى خدمة البحث على الويب. للأسف لا أستطيع البحث عن المعلومات المطلوبة حول الصلاة أو الوضوء في الوقت الحالي. يرجى المحاولة مرة أخرى بعد قليل، أو يمكنك زيارة المواقع الإسلامية الموثوقة مثل islamqa.info أو islamweb.net مباشرة للحصول على الإرشادات الصحيحة.";
  }

  const fallbackResponses = [
    "السلام عليكم! أنا تَوْبَة، مساعدك الذكي الإسلامي. أعاني حالياً من صعوبات تقنية في خدمة البحث على الويب. أنا مصمم للبحث في مواقع السنة الموثوقة مثل sunnah.com و quran.com والمصادر الإسلامية الموثوقة الأخرى لتقديم معلومات دقيقة لك. يرجى المحاولة مرة أخرى في لحظة، أو يمكنك زيارة هذه المواقع مباشرة للمعرفة الإسلامية الموثوقة.",
    "شكراً لك على سؤالك عن الإسلام. أنا تَوْبَة، ومصمم للبحث على الويب من مواقع السنة الموثوقة لتقديم معلومات موثوقة لك. أعاني حالياً من مشكلة في الوصول إلى خدمة البحث على الويب. يرجى المحاولة مرة أخرى، أو زيارة المواقع الإسلامية الموثوقة مثل sunnah.com للحديث والإرشاد الإسلامي الموثوق.",
    "أقدر اهتمامك بالمعرفة الإسلامية. أنا تَوْبَة، ومُعد للبحث على الويب من مواقع السنة الموثوقة بدلاً من استخدام المعرفة المدمجة. هذا يضمن لك الحصول على أحدث وأدق المعلومات. أعاني حالياً من بعض الصعوبات التقنية - يرجى المحاولة مرة أخرى أو زيارة المواقع الإسلامية الموثوقة مباشرة."
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

// Quick response function for common greetings and simple messages
export const getQuickResponse = (message) => {
  const quickResponses = {
    'salam': 'وعليكم السلام! أنا تَوْبَة، مساعدك الذكي الإسلامي. أبحث على الويب من مواقع السنة الموثوقة لتقديم معلومات إسلامية موثوقة لك. كيف يمكنني مساعدتك اليوم؟',
    'hello': 'السلام عليكم! أنا تَوْبَة، مرحباً بك في مساعدك الإسلامي. أبحث في المواقع الإسلامية الموثوقة لإعطائك معلومات دقيقة.',
    'hi': 'السلام عليكم! أنا تَوْبَة، كيف يمكنني مساعدتك في المعرفة الإسلامية؟ سأبحث في مواقع السنة الموثوقة لإجابات أصيلة.',
    'assalamu alaikum': 'وعليكم السلام! أنا تَوْبَة، كيف يمكنني مساعدتك اليوم؟ أبحث في المواقع الإسلامية الموثوقة لمعلومات موثوقة.',
    'thank you': 'أهلاً وسهلاً! بارك الله فيك.',
    'thanks': 'عفواً! بارك الله فيك على لطفك.',
    'shukran': 'عفواً! بارك الله فيك على لطفك.',
    'good morning': 'صباح الخير! السلام عليكم. كيف يمكنني مساعدتك في المعرفة الإسلامية اليوم؟',
    'good afternoon': 'مساء الخير! السلام عليكم. كيف يمكنني مساعدتك في المعرفة الإسلامية اليوم؟',
    'good evening': 'مساء الخير! السلام عليكم. كيف يمكنني مساعدتك في المعرفة الإسلامية اليوم؟',
    'how are you': 'الحمد لله، أنا بخير! أنا تَوْبَة، مساعدك الذكي الإسلامي. كيف يمكنني مساعدتك في المعرفة الإسلامية اليوم؟',
    'bye': 'مع السلامة! بارك الله فيك وحفظك.',
    'goodbye': 'مع السلامة! بارك الله فيك وحفظك.',
    'see you': 'مع السلامة! بارك الله فيك وحفظك.',
    'take care': 'اعتن بنفسك! بارك الله فيك وفي عائلتك.',
    'yes': 'نعم، كيف يمكنني مساعدتك في المعرفة الإسلامية؟',
    'no': 'لا مشكلة! كيف يمكنني مساعدتك في المعرفة الإسلامية؟',
    'okay': 'ممتاز! كيف يمكنني مساعدتك في المعرفة الإسلامية؟',
    'alright': 'ممتاز! كيف يمكنني مساعدتك في المعرفة الإسلامية؟',
    'help': 'أنا تَوْبَة، مساعدك الذكي الإسلامي. أبحث على الويب من مواقع السنة الموثوقة مثل sunnah.com و quran.com والمصادر الإسلامية الموثوقة الأخرى لتقديم معلومات دقيقة لك. ماذا تريد أن تعرف؟',
    'ramadan mubarak': 'رمضان مبارك لك أيضاً! أتمنى أن يجلب لك هذا الشهر المبارك السلام والبركات والنمو الروحي.',
    'eid mubarak': 'عيد مبارك! تقبل الله عبادتك ومنحك السعادة والازدهار.',
    'tawba': 'التوبة تعني التوبة في العربية. إنها مفهوم جميل في الإسلام يؤكد على رحمة الله وفرصة التجديد الروحي. دعني أبحث في المواقع الإسلامية الموثوقة لتقديم معلومات مفصلة عن التوبة في الإسلام.'
  };

  const lowerMessage = message.toLowerCase();
  for (const [keyword, response] of Object.entries(quickResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  return null;
};
