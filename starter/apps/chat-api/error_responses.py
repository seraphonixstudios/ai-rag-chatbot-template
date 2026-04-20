import uuid

class AppError(Exception):
    def __init__(self, message: str, code: str = 'INTERNAL_ERROR', status_code: int = 500, details=None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details

def format_error(message: str, code: str = 'INTERNAL_ERROR', details=None, status_code: int = 500, trace_id: str = None):
    if not trace_id:
        trace_id = str(uuid.uuid4())
    return {
        'error': {
            'code': code,
            'message': message,
            'details': details,
            'trace_id': trace_id,
        },
        'status': status_code,
    }
