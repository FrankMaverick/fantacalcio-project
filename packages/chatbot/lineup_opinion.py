#--web true
#--param OPENAI_API_HOST $OPENAI_API_HOST
#--param OPENAI_API_KEY $OPENAI_API_KEY
#--kind python:default

from openai import AzureOpenAI

ROLE = """

The main goal is to give in markdown format (only h5,h6 and p are allowed) to optimize decisions regarding 
players, taking into account variables such as players past performances, 
injury probabilities, current form, upcoming opponents, and gameplay strategies. 
The model should be able to offer personalized suggestions based on user preferences 
and goals, helping them maximize their team's score in the context of fantasy football. 

Prompt can give you stats of a two lineup for a serie a event. Don't say to the user how lineup is composed, but only describe it and give some advices about what player is better in fanta
"""

class Chatbot:

    MODEL = "gpt-4"
    

    def __init__(self, args):
        # accesso parametri
        key = args.get("OPENAI_API_KEY")
        host = args.get("OPENAI_API_HOST")
        # accesso alla ai
        ai = AzureOpenAI(api_version="2023-12-01-preview", api_key=key, azure_endpoint=host)
        self.ai = ai

    def ask(self, inp, role=ROLE):
        system = {"role": "system", "content": role}
        user = {"role": "user", "content": inp}
        request = [system, user]
        ai = self.ai
        comp = ai.chat.completions.create(model=self.MODEL, messages=request)
        if len(comp.choices) >0:
            return comp.choices[0].message.content
        return "I do not understand."


def main(args):
    print(args.get('input'))
    chat = Chatbot(args)
    # read input
    inp = "My input is a json that describe a serie a Lineup event. Please prepare for me a commment in markdown of this event. Use italian language, please. " + str(args.get("input"))
    # produce output
    out = chat.ask(inp)
    # prepare res
    res = {
        "output": out
    }
    return {
        "body": res
    }