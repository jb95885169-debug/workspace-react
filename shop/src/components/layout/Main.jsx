import React from 'react';
import styled from 'styled-components';
import ProductList from '../product/ProductList';
import { Link } from 'react-router-dom';
const Wrapper = styled.div``;
const MainBG = styled.div`
    min-height: 500px;
    background-image: url(/images/main/main1.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 50px;
`;

const LoadMoreButton = styled.button`
    display : block;
    margin : auto;
    padding : 10px 20px;
    text-align : center;
    `;
const Main = ({data, loadMore, handleLoadMore}) => {
    return (
        <Wrapper>
            <Link to={'/'}>
                <MainBG/>
            </Link>
            <ProductList data={data}/>
            {
                loadMore && 
                <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
            }
        </Wrapper>
    );
};

export default Main;