
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DetailHead from './DetailHead';
import DetailBody from './DetailBody';
import Spinner from '../spinner/Spinner';

const DetailWrapper = styled.div`
    margin: 60px auto 0;
    max-width: 1200px;
    width: 80%;
`;

const Detail = ({ data, onAddToCart }) => {

    const { pId } = useParams();

    const [detailProduct, setDetailProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);


    // 리스트 안에서 해당 id와 같은 객체를 꺼내는 방법
    // 1. 
    // const product = {...data[pId-1]};

    // 2. filter (배열리턴)
    // const product = data.filter(obj =>
    //     obj.id === parseInt(pId)
    // )

    // 3. find (객체 리턴)
    // 상품 목록에서 URL의 pId와 일치하는 상품 찾기
    useEffect(() => {

        const product = data.find(obj =>
            Number(obj.id) === Number(pId)
        );

        setDetailProduct(product || null);
        setLoading(false);

    }, [pId, data]);

    // 데이터 로딩 중
    if (isLoading) {
        return <Spinner />;
    }

    // 상품이 존재하지 않는 경우
    if (!detailProduct) {
        return <DetailWrapper>상품을 찾을 수 없습니다.</DetailWrapper>;
    }

    return (
        <DetailWrapper>

            {/* 상품 정보와 장바구니 추가 함수 전달 */}
            <DetailHead
                data={detailProduct}
                onAddToCart={onAddToCart}
            />

            <DetailBody detail={detailProduct.detail} />

        </DetailWrapper>
    );
};

export default Detail;
