
// 상품 추가, 상품 삭제, 수량 감소 액션 타입 가져오기
import {
    ADD_ITEM,
    DELETE_ITEM,
    DECREASE_ITEM
} from "../action/type";

// 장바구니의 초기 상태
// 처음에는 상품이 하나도 없으므로 빈 배열로 설정
const initialState = [];

// cart Reducer
// state : 현재 장바구니 데이터
// action : dispatch를 통해 전달받은 액션 객체
const cart = (state = initialState, action) => {

    // action.type에 따라 서로 다른 작업 실행
    switch(action.type) {

        // ==================================
        // 1. 장바구니 상품 추가 및 수량 증가
        // ==================================
        case ADD_ITEM: {

            // 기존 장바구니에 동일한 상품이 있는지 확인
            // find() : 조건에 맞는 첫 번째 객체 반환
            // 동일한 상품이 없으면 undefined 반환
            const existingItem = state.find(
                product => product.id === action.payload.id
            );

            // 이미 장바구니에 동일한 상품이 존재하는 경우
            if (existingItem) {

                // map()을 이용해 장바구니 배열을 새로 생성
                return state.map(product =>

                    // 추가하려는 상품과 기존 상품의 id 비교
                    product.id === action.payload.id

                        // id가 같으면 기존 상품의 수량을 1 증가
                        ? { ...product, count: product.count + 1 }

                        // id가 다르면 기존 상품 정보 그대로 유지
                        : product
                );
            }

            // 장바구니에 없는 새로운 상품인 경우
            // 기존 배열에 새로운 상품을 추가
            // 처음 추가되는 상품의 수량은 1로 설정
            return [
                ...state,
                { ...action.payload, count: 1 }
            ];
        }

        // ==================================
        // 2. 장바구니 상품 완전히 삭제
        // ==================================
        case DELETE_ITEM:

            // filter()를 이용해 새로운 배열 생성
            // 삭제할 상품의 id와 일치하지 않는 상품만 남김
            return state.filter(
                product => product.id !== action.payload
            );

        // ==================================
        // 3. 장바구니 상품 수량 감소
        // ==================================
        case DECREASE_ITEM:

            // map()을 이용해 기존 배열을 순회
            return state.map(product =>

                // 수량을 감소시킬 상품인지 id 비교
                product.id === action.payload

                    // 해당 상품이면 수량을 1 감소
                    // Math.max(1, ...) : 최소 수량을 1로 제한
                    ? {
                        ...product,
                        count: Math.max(1, product.count - 1)
                    }

                    // 다른 상품은 기존 상태 그대로 유지
                    : product
            );

        // ==================================
        // 4. 해당하는 액션이 없는 경우
        // ==================================
        default:

            // 기존 장바구니 상태 그대로 반환
            return state;
    }
};

// 다른 파일에서 cart Reducer를 사용할 수 있도록 내보내기
export default cart;
