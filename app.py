import streamlit as st
import google.generativeai as genai
import os

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

st.title("AI Studio Chatbot 🤖")

# Initialize chat history
if "history" not in st.session_state:
    st.session_state.history = []

# Display chat history
for msg in st.session_state.history:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# User input
user_input = st.chat_input("Ask something...")

if user_input:
    # Show user message
    with st.chat_message("user"):
        st.markdown(user_input)

    st.session_state.history.append(
        {"role": "user", "content": user_input}
    )

    # Gemini response
    response = model.generate_content(user_input)
    reply = response.text

    with st.chat_message("assistant"):
        st.markdown(reply)

    st.session_state.history.append(
        {"role": "assistant", "content": reply}
    )
