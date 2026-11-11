/* eslint-disable no-restricted-globals */
import React from 'react';
import styled from 'styled-components';
import formatKoreanCurrency from '../../util/formatKoreanCurrency';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem,deleteItem } from '../../action/cartAction';

const BR = styled.div`
  width: 100%;
  height: 13px;
  border-bottom: 1px solid #999;
`;
const DetailHeadArea = styled.div`
    width: 100%;
    display : flex;
    flex-direction : row;
    margin-bottom : 100px;
    padding-bottom : 100px;
    border-bottom : 1px solid #999;
`;
const DetailMainImg = styled.div`
    flex : 1;
    height : 500px;
    background-image: url(/images/product/${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding : 50px;
`;
const Description = styled.div`
    flex : 1;
    height : 500px;
    padding : 50px;
`;
const Title = styled.span`
    font-size: 32px;
    font-weight: bold;
    display: block;
    margin: 20px 0;
`;
const PriceTitle = styled.span`
    font-size: 32px;
    font-weight: bold;
    display: block;
    margin: 20px 0;
`;
const InfoArea = styled.div`
    display: table;
    width: 100%;
    table-layout: fixed;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 8px;
`;

const ButtonArea = styled.div`
    width: 100%;
    display : flex;
    gap : 6px;
    
    button {
        vertical-align: top;
        width: 50%;
        margin: 0;
        min-width: auto;
        padding : 15px;
        border-radius : 5px;
        font-weight : 700;
    }
`;
const CartAddButton = styled.button`
    background-color : white;
    color : #333;
    border : 1px solid gray;
`;
const BuyButton = styled.button`
    background-color : #bcd530;
    color : #fff;
    border : 1px solid #bcd530;
`;

const DetailHead = ({data}) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const nav = useNavigate();

const handleAddCartItem = () => {
    const obj = {
        id : data.id,
        productName : data.title,
        price : data.price,
        count : 1
    };
    dispatch(addItem(obj));
    if(confirm('장바구니에 추가하였습니다. 장바구니로 이동하시겠습니까?')){
        nav('/cart')
    }
}



    return (
        <DetailHeadArea>
            <DetailMainImg img={data.main}/>
            <Description contents={
                {dt : '원산지', dd : '상품 정보 참고'}
            }/>
            <Description contents={
                {dt : '배송비', dd : '3,000원'}
            }/>
                <Title>{data.title}</Title>
                <PriceTitle>{formatKoreanCurrency(data.price)}</PriceTitle>
                <BR/>
                <InfoArea>
                </InfoArea>
                <ButtonArea>
                    <CartAddButton onClick={handleAddCartItem}>장바구니</CartAddButton>
                    <BuyButton>바로구매</BuyButton>
                </ButtonArea>
            
        </DetailHeadArea>
    );
};

export default DetailHead;