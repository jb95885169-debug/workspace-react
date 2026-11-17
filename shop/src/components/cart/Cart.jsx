
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// Redux 액션 import
import { addItem, decreaseItem, deleteItem } from '../../action/cartAction';

const CartWrapper = styled.div`
    max-width: 80%;
    margin: auto;

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
    }

    th, td {
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f5f5f5;
    }

    button {
        padding: 5px 10px;
        margin: 0 5px;
        cursor: pointer;
    }

    .total {
        text-align: right;
        margin-top: 30px;
        font-size: 20px;
        font-weight: bold;
    }
`;

const Cart = () => {

    // Redux 상태 가져오기
    const cart = useSelector(state => state.cart);

    // Redux 액션 실행을 위한 dispatch
    const dispatch = useDispatch();

    // 수량 증가
    const handlePlus = (item) => {
        dispatch(addItem(item));
    };

    // 수량 감소
    const handleMinus = (item) => {
        if (item.count > 1) {
            dispatch(decreaseItem(item.id));
        }
    };

    // 상품 삭제
    const handleRemove = (id) => {
        dispatch(deleteItem(id));
    };

    // 전체 상품 금액 계산
    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.count;
    }, 0);

    return (
        <CartWrapper>
            <h2>장바구니</h2>

            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품 이름</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.length === 0 ? (
                        <tr>
                            <td colSpan="5">장바구니가 비어 있습니다.</td>
                        </tr>
                    ) : (
                        cart.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>

                                <td>{item.productName}</td>

                                <td>
                                    <button onClick={() => handleMinus(item)}>
                                        -
                                    </button>

                                    {item.count}

                                    <button onClick={() => handlePlus(item)}>
                                        +
                                    </button>
                                </td>

                                <td>
                                    {(item.price * item.count).toLocaleString()}원
                                </td>

                                <td>
                                    <button onClick={() => handleRemove(item.id)}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="total">
                총 상품 금액 : {totalPrice.toLocaleString()}원
            </div>
        </CartWrapper>
    );
};

export default Cart;
