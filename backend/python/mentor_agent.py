#!/usr/bin/env python3
"""
Simple Gemini AI Agent
Just a basic agent that can have normal conversations.
"""

import json
import sys
import os

# Simple Gemini import
import google.generativeai as genai

def generate_response(question: str, student_name: str = "Alex", conversation_history: list = None) -> str:
    """Generate a simple response using Gemini API with conversation memory"""
    
    try:
        # Get API key
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            return "I need a Google API key to work. Please set GOOGLE_API_KEY in your environment."
        
        # Read system prompt from file
        system_prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.txt')
        try:
            with open(system_prompt_path, 'r', encoding='utf-8') as f:
                system_prompt = f.read().strip()
        except FileNotFoundError:
            system_prompt = "You are a friendly AI mentor helping students learn about finance. Be helpful and engaging!"
        
        # Configure Gemini
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Build context from conversation history
        context = ""
        if conversation_history and len(conversation_history) > 0:
            context = "Here's our conversation so far:\n"
            for msg in conversation_history:
                role = "You" if msg.get("role") == "user" else "Me"
                context += f"{role}: {msg.get('content', '')}\n"
            context += "\n"
        
        # Create prompt with system prompt and conversation context
        prompt = f"""{system_prompt}

**Student Name:** {student_name}

{context}**Current Question:** {question}

Please respond following the guidelines above. Be conversational and engaging!"""
        
        # Generate response
        response = model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        return f"I'm having trouble connecting to my AI brain. Error: {str(e)}"

def main():
    """Main function"""
    try:
        # Load environment variables
        from dotenv import load_dotenv
        load_dotenv()
        
        # Read input
        if len(sys.argv) < 2:
            print(json.dumps({
                "answer": "Hi! I'm your AI mentor. What would you like to know?"
            }))
            return
        
        # Parse context
        context = json.loads(sys.argv[1])
        question = context.get("question", "")
        student = context.get("student", {})
        student_name = student.get("name", "Alex")
        conversation_history = context.get("conversationHistory", [])
        
        # Generate simple response with conversation memory
        response = generate_response(question, student_name, conversation_history)
        
        # Return simple response
        print(json.dumps({
            "answer": response,
            "emotion": "idle",
            "ui": {
                "emotion": "idle",
                "chips": ["Ask me anything!", "Tell me more!", "What else?"]
            }
        }))
        
    except Exception as e:
        print(json.dumps({
            "answer": f"I'm having some technical difficulties. Error: {str(e)}"
        }))

if __name__ == "__main__":
    main()
