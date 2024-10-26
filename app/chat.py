import asyncio
import os
from langchain import LLMChain, PromptTemplate
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

hf_token = os.getenv("HUGGINGFACE_HUB_TOKEN_WRITE")

# Configure Hugging Face Endpoint with adjusted parameters for health-specific responses
llm = HuggingFaceEndpoint(
    repo_id="microsoft/Phi-3.5-mini-instruct",
    task="text-generation",
    max_new_tokens=80,
    do_sample=True,
    temperature=0.2,
    top_p=0.85,
    repetition_penalty=1.5,
    huggingfacehub_api_token=hf_token,
)

prompt = PromptTemplate(
    input_variables=["input"],
    template=(
        "You are Eva, a virtual health assistant providing focused, concise advice. "
        "Answer user questions with practical health tips only. Do not introduce yourself, "
        "do not explain your background, and do not mention Phi Beta Kappa or any credentials.\n\n"
        "User: {input}\nAssistant:"
    )
)
# Initialize LLMChain with the prompt and model
chat_chain = LLMChain(llm=llm, prompt=prompt)

def clean_response(response_text):
    # Ensure response ends on a complete sentence
    if not response_text.endswith((".", "!", "?")):
        last_period = response_text.rfind(".")
        if last_period != -1:
            response_text = response_text[:last_period + 1]  # Trim to last full sentence
    return response_text

# Function to generate a response from the model based on user input
async def generate_response(input_text: str) -> str:
    try:
        # Run the synchronous `chat_chain.invoke` in an async-compatible way
        response = await asyncio.to_thread(chat_chain.invoke, {"input": input_text})
        response_text = response.get("text", "I'm having trouble generating a response right now.")
        
        # Clean up the response to end gracefully
        response_text = clean_response(response_text)
        print("Generated response:", response_text)  # Debugging print
        return response_text
    except Exception as e:
        print(f"Error during response generation: {e}")
        return "I'm having trouble generating a response right now."