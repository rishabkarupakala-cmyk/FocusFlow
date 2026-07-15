const quotes = [

{
text:"Success is the sum of small efforts repeated every day.",
author:"Robert Collier"
},

{
text:"The future depends on what you do today.",
author:"Mahatma Gandhi"
},

{
text:"Discipline is the bridge between goals and accomplishment.",
author:"Jim Rohn"
},

{
text:"The secret of getting ahead is getting started.",
author:"Mark Twain"
},

{
text:"Great things are done by a series of small things brought together.",
author:"Vincent van Gogh"
},

{
text:"Don't limit your challenges. Challenge your limits.",
author:"Unknown"
},

{
text:"Your future is created by what you do today, not tomorrow.",
author:"Robert Kiyosaki"
},

{
text:"Believe you can and you're halfway there.",
author:"Theodore Roosevelt"
},

{
text:"Small daily improvements are the key to staggering long-term results.",
author:"Robin Sharma"
},

{
text:"The expert in anything was once a beginner.",
author:"Helen Hayes"
}

];

export function getDailyQuote(){

const today = new Date();

const dayOfYear = Math.floor(

(today.getTime() -

new Date(today.getFullYear(),0,0).getTime())

/86400000

);

return quotes[dayOfYear % quotes.length];

}