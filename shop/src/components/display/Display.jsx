import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Main from '../layout/Main';
import data from '../../util/mock/data.js'
import Detail from '../detail/Detail';
import axios from 'axios';

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
    background-color : white;
    position : sticky;
    top : 0;
      z-index : 9999;
`;
const Body = styled.div`
    width: 100%;
    min-height: 50vh;
`;

const Display = () => {

    // const run1 = () => {
    //     // fetch(`/getText`)
    //     // .then(response => response.text())
    //     // .then(text => {
    //     //     console.log(text);
            
    //     // })
    //     // .catch(err => console.log(err));

    //     axios.get(`/getText`)
    //     .then(response => {
    //         if(response.status ===200){

    //         }
            
    //     });
    // }
    // run1();

    // const run2 = () => {
    //     fetch(`/getList`)
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log(json);
            
    //     })
    //     .catch(err => console.log(err));
    // }
    // run2();

    const [products, setProducts] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [cnt, setCnt] = useState(1);
    const [loadMore, setLoadMore] = useState(true);


    useEffect(()=>{
        axios.get('api/products')
        .then(json => {
            setProducts(json.data);
        })
        .catch(err => console.log(err));
        
    },[]);

    useEffect(()=>{
        setDisplayData(products.slice(0,(cnt*3)));
    },[products,cnt]);   
    
    const handleLoadMore = () => {
        setCnt(prev => prev +1);
    }


    return (
        <Container>
            <HeaderArea>
                <Header/>
            </HeaderArea>
            <Body>
                <Routes>
                    <Route path='/' element={<Main data={displayData} 
                                                    loadMore={loadMore} handleLoadMore={handleLoadMore}/>}/>
                    <Route path='/detail/:pId' element={<Detail data={products}/>}/>
                </Routes>
            </Body>
        </Container>

    );
};

export default Display;