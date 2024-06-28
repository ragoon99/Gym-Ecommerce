def extract_token(raw: str) -> str:
    try:
        return str(raw).split(" ")[1]
    except:
        raise "Failed to Extract token"