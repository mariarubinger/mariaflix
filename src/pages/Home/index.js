import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
  // http://localhost:8080/categorias?_embed=videos
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        console.log(categoriasComVideos);
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(dadosIniciais);
  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}
     
      {dadosIniciais.length >= 1 && (
        <>
       
          <BannerMain
            videoTitle={dadosIniciais[0].videos[0].titulo}
            url={dadosIniciais[0].videos[0].url}
            videoDescription="O que é Front-end?"
          />

          <Carousel
            ignoreFirstVideo
            category={dadosIniciais[0]}
          />
        </>
      )}
    </PageDefault>
  );
}

export default Home;
