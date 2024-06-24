import React from 'react'
import AssetForm from '../Components/AssetForm'
import { useLocation, useParams } from 'react-router-dom';

const UpdateAsset = () => {
  const location = useLocation();
  const { assetId } = useParams();
  const {asset} = location.state || {};
 
  // console.log(asset);
  return < AssetForm isUpdate={true} assetToUpdate={asset} />;
}

export default UpdateAsset