import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import api from "../services/api"; 

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  'Why am I high risk?',
  'Why is colonoscopy recommended?',
  'What screenings are due?',
  'How can I reduce my risk score?',
  'What vaccines should I get?',
  'Explain my family history impact',
];

// const aiResponses: Record<string, string> = {
//   'why am i high risk': `Based on my analysis of your health profile, you're classified as **High Risk** due to several factors:

// **Primary Risk Factors:**
// 1. **Age**: At 58 years old, you're in a higher risk category for many conditions
// 2. **Smoking History**: 25 pack-years places you at elevated risk for lung cancer and cardiovascular disease
// 3. **Chronic Conditions**: Type 2 Diabetes and Hypertension significantly increase your risk profile
// 4. **Family History**: First-degree relatives with colon and breast cancer elevate your genetic risk

// **Secondary Factors:**
// - BMI of 28.0 (overweight)
// - Sedentary lifestyle (8+ hours/day)
// - Previous cardiovascular disease

// Your overall risk score of 82/100 reflects these combined factors. I recommend focusing on the actionable items in your preventive care plan to help reduce this score over time.`,

//   'why is colonoscopy recommended': `A colonoscopy is strongly recommended for you based on the following clinical indicators:

// **Screening Indications:**
// 1. **Age**: Standard screening begins at age 45-50 for average-risk individuals
// 2. **Family History**: Your father had colon cancer, which increases your risk 2-3x
// 3. **Overdue Status**: Your last colonoscopy was in 2019; 10-year follow-up was due in June 2025

// **Risk Assessment:**
// The combination of your age, family history, and the fact that your screening is overdue by approximately 9 months makes this a **high priority** recommendation.

// **Recommendation:**
// - Schedule within the next 2 weeks
// - Consider genetic counseling for hereditary cancer syndromes
// - Discuss with your gastroenterologist about any symptoms you may have experienced

// Would you like me to provide information on how to prepare for a colonoscopy?`,

//   'what screenings are due': `Based on your current health profile, here are your due and overdue screenings:

// **Overdue Screenings (Immediate Action Required):**
// - **Colonoscopy** - Due: June 2025 (overdue by 9 months)
// - **Lung Cancer Screening (LDCT)** - Indicated for former smokers aged 50-80

// **Due Screenings (Schedule Soon):**
// - **Cholesterol Panel** - Due: June 2025
// - **Shingles Vaccination** - Due: January 2025
// - **RSV Vaccination** - Due: April 2025

// **Scheduled:**
// - **Annual Physical** - March 20, 2025 at 9:00 AM

// **Completed Recently:**
// - PSA Test - January 2025
// - Blood Pressure Screening - March 2025
// - HbA1c Test - February 2025

// I recommend prioritizing the overdue screenings first. Would you like help understanding what each screening involves?`,

//   'how can i reduce my risk score': `Here's a personalized plan to help reduce your risk score from 82 to a healthier range:

// **Immediate Actions (High Impact):**
// 1. **Complete Overdue Screenings**
//    - Colonoscopy (eliminates major cancer risk gap)
//    - Lung cancer screening (critical for former smokers)

// 2. **Vaccination Updates**
//    - Influenza vaccine (reduces complication risk)
//    - Shingles vaccine (prevents painful condition)

// **Lifestyle Modifications:**
// 1. **Physical Activity**
//    - Current: 90 min/week
//    - Target: 150+ min/week
//    - Impact: Could reduce score by 5-8 points

// 2. **Weight Management**
//    - Current BMI: 28.0
//    - Target BMI: <25
//    - Impact: Could reduce score by 8-12 points

// 3. **Smoking Cessation Support**
//    - You're a former smoker (great progress!)
//    - Continued cessation support reduces cardiovascular risk over time

// **Medical Management:**
// - Optimize diabetes control (HbA1c target: <7%)
// - Blood pressure management (target: <130/80)
// - Regular cardiovascular assessments

// **Potential Risk Score Reduction:**
// Following this plan could reduce your score to 55-65 within 12 months.

// Would you like me to create a detailed timeline for these interventions?`,

//   'what vaccines should i get': `Based on your age, medical history, and current vaccination status, here are your vaccine recommendations:

// **Overdue Vaccines:**
// - **Influenza** - Last: October 2023, Due: October 2024
//   - Critical for diabetics to prevent complications

// **Due Soon:**
// - **Shingles (Shingrix)** - 2-dose series recommended for adults 50+
//   - Very important given your age and diabetes

// - **RSV** - Recommended for adults 60+ with chronic conditions
//   - Your diabetes and age make you eligible

// **Up to Date:**
// - COVID-19 (boosters current)
// - Pneumococcal (completed)
// - Hepatitis A & B (completed)

// **Recommended Schedule:**
// 1. Influenza: Within 3 days (urgent due to diabetic status)
// 2. Shingrix Dose 1: Within 2 weeks
// 3. Shingrix Dose 2: 2-6 months after Dose 1
// 4. RSV: Can be given with other vaccines

// Would you like details on potential side effects or contraindications?`,

//   'explain my family history impact': `Your family history significantly impacts your preventive care recommendations:

// **First-Degree Relative Cancer History:**

// **Father - Colon Cancer**
// - Increases your lifetime risk from ~4% to ~12-15%
// - Screening recommendation: Colonoscopy starting at age 40 or 10 years before father's diagnosis
// - Your overdue colonoscopy is concerning given this history

// **Mother - Breast Cancer**
// - Elevated risk for breast and ovarian cancer
// - May warrant genetic testing for BRCA mutations
// - Current mammogram schedule is appropriate

// **Other Relevant Family History:**
// - Cardiovascular disease in father affects heart health monitoring
// - Diabetes in mother and brother increases your metabolic risk

// **Genetic Counseling Recommendation:**
// Given your strong family history of cancer, I recommend:
// 1. Genetic counseling consultation
// 2. Consider multi-gene panel testing
// 3. Enhanced screening protocols if genetic mutations found
// 4. Family cascade testing if any mutations identified

// **Impact Summary:**
// Your family history alone contributes approximately 15-20 points to your risk score. However, with appropriate enhanced screening, many hereditary cancer risks can be effectively managed.

// Would you like information on genetic testing options?`,
// }; 

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Preventive Care Assistant. I can help you understand your health risks, screenings, vaccinations, and preventive care recommendations. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  const handleSend = async () => {
  if (!inputValue.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: inputValue,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);

  const question = inputValue;

  setInputValue("");
  setIsTyping(true);

  try {

    // const response = await api.post("/ai-assistant", {
    //   patient_id: 1,
    //   question: question,
    // });

    const response = await api.post("/ai-assistant", {
  patient_id: 5,
  question: question,
}); 
    console.log(response.data);
    console.log("response field =", response.data.response);
console.log("error field =", response.data.error); 

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.data.response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

  } catch (error) {

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Unable to get AI response.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }

  setIsTyping(false);
}; 

  // const handleSend = () => {
  //   if (!inputValue.trim()) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     role: 'user',
  //     content: inputValue,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputValue('');
  //   setIsTyping(true);

  //   setTimeout(() => {
  //     const lowerInput = inputValue.toLowerCase();
  //     let responseContent = `I understand you're asking about "${inputValue}". Let me analyze your health profile to provide personalized guidance.\n\nBased on your current health data, I can provide specific recommendations. For the most accurate analysis, please ensure your health records are up to date.\n\nWould you like me to focus on any specific area such as:\n- Screenings and preventive tests\n- Vaccinations\n- Lifestyle modifications\n- Risk factor analysis`;

  //     for (const [key, response] of Object.entries(aiResponses)) {
  //       if (lowerInput.includes(key)) {
  //         responseContent = response;
  //         break;
  //       }
  //     }

  //     const assistantMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       role: 'assistant',
  //       content: responseContent,
  //       timestamp: new Date(),
  //     };

  //     setMessages((prev) => [...prev, assistantMessage]);
  //     setIsTyping(false);
  //   }, 1500);
  // };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-cyan-500" />
          AI Assistant
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ask questions about your health risks, screenings, and preventive care
        </p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className="hidden lg:block w-72 flex-shrink-0 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-500" />
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
              >
                {question}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-cyan-400 to-cyan-600'
                      : 'bg-slate-200'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    message.role === 'assistant'
                      ? 'bg-slate-100 text-slate-900'
                      : 'bg-cyan-500 text-white'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {(message.content || "").split('**').map((part, i) => {
                      if (i % 2 === 1) {
                        return <strong key={i} className="font-semibold">{part}</strong>;
                      }
                      return part;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' } as React.CSSProperties} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' } as React.CSSProperties} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' } as React.CSSProperties} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t border-slate-100 p-4">
            <div className="lg:hidden mb-3 flex gap-2 overflow-x-auto pb-2">
              {suggestedQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about your health, screenings, or recommendations..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping} className="bg-cyan-500 hover:bg-cyan-600">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
