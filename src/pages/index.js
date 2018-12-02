import React from 'react'

import Layout from '../components/layout'

import Introduction from './Introduction';

import NoiseGainCurve from './NoiseGain'
import NoiseShape from './NoiseShape'
import MixedShapes from './Shapes'
import TruchetTiles from './TruchetTiles';
import Footer from './Footer';

const IndexPage = () => (
  <Layout>
    <Introduction />
    <div style={{ marginTop: 25 }}>
    <NoiseGainCurve />
    <NoiseShape />
    <MixedShapes />
    <TruchetTiles />      
    </div>
    <div className="center"><Footer /></div>
  </Layout>
)

export default IndexPage
