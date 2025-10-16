const chatContainer=document.getElementById('chat-container');
const userInput=document.getElementById('user-input');
const sendBtn=document.getElementById('send-btn');

// তোমার Gemini / OpenRouter API key বসাও এখানে
const GEMINI_API_KEY=AIzaSyBNkdJ11631Ld4Y_m0AaGCxOkxoLan3c-U";

function addMessage(text,sender){
    const div=document.createElement('div');
    div.className='bubble '+sender;
    div.innerText=text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop=chatContainer.scrollHeight;
}

async function getNexieResponse(message){
    const response=await fetch('https://api.openrouter.ai/v1/chat/completions',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+GEMINI_API_KEY
        },
        body: JSON.stringify({
            model:'nexie-1',   // Gemini model
            messages:[{role:'user',content:message}]
        })
    });
    const data=await response.json();
    return data.choices[0].message.content;
}

sendBtn.addEventListener('click', async ()=>{
    let msg=userInput.value.trim();
    if(!msg) return;
    addMessage(msg,'user');
    userInput.value='';
    addMessage('Nexie is typing...','nexie');
    const reply=await getNexieResponse(msg);
    const typingDiv=document.querySelector('.bubble.nexie:last-child');
    typingDiv.innerText=reply;
});