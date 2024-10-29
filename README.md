# better-everyday-v1
## Eva Health Chatbot

**Eva Health Chatbot** is a personalized virtual assistant trained to provide health and wellness advice based on curated information. This project aims to enhance personal knowledge retention by training the chatbot with insights gained from YouTube podcasts and other curated sources. By doing so, Eva becomes an interactive repository of health advice that can be accessed conveniently as a reminder or a quick reference tool.

## Project Purpose

The primary purpose of this project is to create a customized chatbot that:
- **Trains on Knowledge Sources**: Uses YouTube podcasts, particularly those covering topics in health and wellness, to build a knowledge base from insights gathered during daily commutes.
- **Retrieves Information**: Provides quick and reliable answers to questions about health topics, serving as a memory aid and reinforcing learning.
- **Enhances Productivity**: Assists in recalling valuable advice on-demand, making it easy to remember and apply health tips and wellness practices mentioned in podcasts.

## Features

1. **Embedding Search**: Utilizes embedding search to retrieve relevant health advice based on user queries.
2. **Conversational Model**: Uses a conversational language model to respond to health-related questions in a natural and engaging way.
3. **Hybrid Knowledge Retrieval and Generation**: Combines knowledge retrieval with generation capabilities to provide accurate, conversational responses.
4. **Curated Dataset**: Uses curated datasets, incorporating podcast insights on topics such as eye health, neuro health, cancer prevention, fitness, and more.
5. **Personalized for Daily Use**: Tailored to offer health tips and reminders based on real-world knowledge consumption.

## Architecture and Setup

This chatbot uses a hybrid architecture involving:
1. **Embedding Search**:
   - Uses a lightweight embedding model to convert text into vectors for similarity search.
   - Stores these vectors in a vector database (e.g., **Pinecone**, **Chroma**, or **Weaviate**) for fast retrieval of relevant health advice.
   
2. **Language Model**:
   - A conversational language model (e.g., Flan-T5, GPT, or LLaMA) that has been fine-tuned on health topics to generate responses based on the retrieved content.

3. **Integration**:
   - Combining embedding retrieval and language generation allows Eva to respond naturally to health-related queries with accurate, podcast-based information.

### Technology Stack
- **Python**: Primary language for backend and model handling.
- **FastAPI**: Framework for setting up API endpoints.
- **LangChain**: Framework for managing language model workflows.
- **Hugging Face Models**: For both embeddings and conversational generation.
- **Vector Database**: For fast retrieval of topic-specific health advice.

## Getting Started

### Prerequisites
1. **Python 3.8+**: Required to run the backend.
2. **API Keys**: Obtain Hugging Face API tokens and any database credentials.
3. **Dependencies**: Install dependencies using `requirements.txt`.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/eva-health-chatbot.git
   cd eva-health-chatbot
