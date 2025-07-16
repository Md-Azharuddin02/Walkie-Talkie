import React from "react";
import ChatMessage from "./ChatMessage";

export default function GetResponse({ isLoading }) {
  const botMessage = [
    {
      prompt: "What is the capital of France?",
      response: "The capital of France is Paris."
    },
    {
      prompt: "What is the largest planet in our solar system?",
      response: "The largest planet in our solar system is Jupiter."
    },{
      prompt: "What is the capital of France?",
      response: "The capital of France is Paris."
    },
    {
      prompt: "What is the largest planet in our solar system?",
      response: "The largest planet in our solar system is Jupiter."
    },{
      prompt: "What is the capital of France?",
      response: "The capital of France is Paris."
    },
    {
      prompt: "What is the largest planet in our solar system?",
      response: "The largest planet in our solar system is Jupiter."
    },{
      prompt: "What is the capital of France?",
      response: "The capital of France is Paris."
    },
    {
      prompt: "What is the largest planet in our solar system?",
      response: "The largest planet in our solar system is Jupiter."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 mb-4 scrollbar-hide">
      {/* CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
      
      <div className="space-y-4">
        {botMessage.map((msg, idx) => (
          <div key={idx} className="space-y-4">
            <ChatMessage
              type="prompt"
              message={{ prompt: msg.prompt }}
            />
            <ChatMessage
              type="response"
              message={{ response: msg.response }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


//   const botMessage = [
//   {
//     type: "prompt",
//     prompt: "What is React?",
//   },
//   {
//     type: "response",
//     response:
//       "React is a JavaScript library for building user interfaces. It allows building reusable UI components.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is JSX?",
//   },
//   {
//     type: "response",
//     response:
//       "JSX is a syntax extension for JavaScript that looks like HTML and is used with React to describe UI.",
//   },
//   {
//     type: "prompt",
//     prompt: "What are props in React?",
//   },
//   {
//     type: "response",
//     response:
//       "Props are arguments passed into React components via HTML attributes. They help customize components.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is state in React?",
//   },
//   {
//     type: "response",
//     response:
//       "State is a built-in object used to contain data or information about the component that can change over time.",
//   },
//   {
//     type: "prompt",
//     prompt: "How do you update state in React?",
//   },
//   {
//     type: "response",
//     response:
//       "You update state using the `setState` function in class components or `useState` setter in function components.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is useEffect used for?",
//   },
//   {
//     type: "response",
//     response:
//       "`useEffect` is a React hook used to perform side effects such as data fetching, subscriptions, or manually changing the DOM.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is conditional rendering?",
//   },
//   {
//     type: "response",
//     response:
//       "Conditional rendering allows you to render different UI markup depending on certain conditions in your application.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is React Router?",
//   },
//   {
//     type: "response",
//     response:
//       "React Router is a library that enables dynamic routing in a React application using components.",
//   },
//   {
//     type: "prompt",
//     prompt: "How does the virtual DOM work?",
//   },
//   {
//     type: "response",
//     response:
//       "The virtual DOM is a lightweight copy of the real DOM. React updates the virtual DOM first and then syncs it with the real DOM efficiently.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is a controlled component?",
//   },
//   {
//     type: "response",
//     response:
//       "A controlled component is one that is fully driven by React state rather than the DOM's default behavior.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is Context API?",
//   },
//   {
//     type: "response",
//     response:
//       "Context API allows you to pass data through the component tree without manually passing props at every level.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is a fragment in React?",
//   },
//   {
//     type: "response",
//     response:
//       "A fragment lets you group a list of children without adding extra nodes to the DOM.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is lazy loading?",
//   },
//   {
//     type: "response",
//     response:
//       "Lazy loading is a technique to load components or resources only when they are needed, improving performance.",
//   },
//   {
//     type: "prompt",
//     prompt: "How do you handle forms in React?",
//   },
//   {
//     type: "response",
//     response:
//       "Forms in React are handled using controlled components, where form data is managed by React state.",
//   },
//   {
//     type: "prompt",
//     prompt: "What is memoization?",
//   },
//   {
//     type: "response",
//     response:
//       "Memoization is a technique to cache the result of expensive calculations using `React.memo`, `useMemo`, or `useCallback`.",
//   },
// ];