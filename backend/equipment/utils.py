import random
import string

def generate_code(word: str) -> str:
    code = word[0]

    code += "".join(random.sample(word.replace(code, ""), 2))
    code += str(random.randint(10, 99))

    return code.upper()


def generate_random_string(length=8):
    chars = string.ascii_uppercase + string.digits
    random_string = "".join(random.choices(chars, k=length))

    return random_string
