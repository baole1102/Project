import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

function MyFacebookComments(props) {
    const {id} = props;
  return (
    <FacebookProvider appId="https://hocweb90ngay.com">
      <Comments href={`http://localhost:3000/detail/${id}`} />
    </FacebookProvider>
  );
}

export default MyFacebookComments;
