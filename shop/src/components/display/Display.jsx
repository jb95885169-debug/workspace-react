
import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Main from '../layout/Main';
import Detail from '../detail/Detail';
import axios from 'axios';
import Cart from '../cart/Cart.jsx';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`;

const HeaderArea = styled.div`
    width: 100%;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 9999;
`;

const Body = styled.div`
    width: 100%;
    min-height: 50vh;
`;

const Display = () => {

    // 서버에서 가져온 전체 상품 데이터
    const [products, setProducts] = useState([]);

    // 메인 페이지에 보여줄 상품 데이터
    const [displayData, setDisplayData] = useState([]);

    // 더보기 기능
    const [cnt, setCnt] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    // 장바구니 데이터
    const [cartItems, setCartItems] = useState([]);

    // 서버에서 상품 데이터 가져오기
    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    // 메인 페이지에 보여줄 상품 개수 설정
    useEffect(() => {
        setDisplayData(products.slice(0, cnt * 3));

        // 더 보여줄 상품이 있는지 확인
        setLoadMore(products.length > cnt * 3);

    }, [products, cnt]);

    // 상품 더보기
    const handleLoadMore = () => {
        setCnt(prev => prev + 1);
    };

    // 장바구니 상품 추가
    const addToCart = (product) => {

        setCartItems(prev => {

            // 이미 장바구니에 있는 상품인지 확인
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                // 이미 있다면 수량만 1 증가
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // 처음 담는 상품이라면 수량 1로 추가
            return [
                ...prev,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });

    };

    // 상품 수량 변경
    const changeQuantity = (id, amount) => {

        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + amount)
                    }
                    : item
            )
        );

    };

    // 상품 삭제
    const removeFromCart = (id) => {

        setCartItems(prev =>
            prev.filter(item => item.id !== id)
        );

    };

    return (
        <Container>

            <HeaderArea>
                <Header />
            </HeaderArea>

            <Body>
                <Routes>

                    {/* 메인 페이지 */}
                    <Route
                        path='/'
                        element={
                            <Main
                                data={displayData}
                                loadMore={loadMore}
                                handleLoadMore={handleLoadMore}
                            />
                        }
                    />

                    {/* 상품 상세 페이지 */}
                    <Route
                        path='/detail/:pId'
                        element={
                            <Detail
                                data={products}
                                onAddToCart={addToCart}
                            />
                        }
                    />

                    {/* 장바구니 페이지 */}
                    <Route
                        path='/cart'
                        element={
                            <Cart
                                cartItems={cartItems}
                                changeQuantity={changeQuantity}
                                removeFromCart={removeFromCart}
                            />
                        }
                    />

                    {/* 404 페이지 */}
                    <Route
                        path='*'
                        element={<div>404페이지</div>}
                    />

                </Routes>
            </Body>

        </Container>
    );
};

export default Display;
