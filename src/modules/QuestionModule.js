export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTION = 'GET_QUESTION';
export const POST_QUESTION = 'POST_QUESTION';
export const PUT_QUESTION = 'PUT_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';

const initialState = {
    questions: [], // 문의 목록 초기값
    question: null, // 개별 문의 초기값
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            return { ...state, questions: action.payload };
        case GET_QUESTION:
            return { ...state, question: action.payload };
        case POST_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case PUT_QUESTION:
            return {
                ...state,
                questions: state.questions.map((q) =>
                    q.id === action.payload.id ? action.payload : q
                ),
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter((q) => q.id !== action.payload.id),
            };
        default:
            return state;
    }
};

export default questionReducer;
