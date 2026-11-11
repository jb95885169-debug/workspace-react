import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DetailHead from './DetailHead'
import DetailBody from './DetailBody'
import Spinner from '../spinner/Spinner';

const DetailWrapper = styled.div`
    margin : 60px auto 0;
    max-width : 1200px;
    width : 80%;
`;

const Detail = ({data}) => {

    const {pId} = useParams();

    const[detailProduct, setDetailProduct] = useState({});
    
    const[isLoading, setLoading] = useState(true);

    

    // 리스트 안에서 해당 id와 같은 객체를 꺼내는 방법
    // 1. 
    // const product = {...data[pId-1]};

    // 2. filter (배열리턴)
    // const product = data.filter(obj =>
    //     obj.id === parseInt(pId)
    // )

    // 3. find (객체 리턴)
    useEffect(()=>{
        const product = data.find(obj =>
            obj.id === parseInt(pId)
        );
        setDetailProduct(product);
        setLoading(false);
    }, [pId, data]);

    if(!detailProduct || isLoading){
        return <Spinner/>
    }


    return (
        <DetailWrapper>
            <DetailHead data={detailProduct}/>
            <DetailBody detail={detailProduct.detail}/>
        </DetailWrapper>
    );
};

export default Detail;