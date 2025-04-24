import React, { useState } from 'react';
import { Button } from 'antd';
import AccountDrawer from './AccountDrawer';

const ParentComponent = () => {
  const [accountDrawerVisible, setAccountDrawerVisible] = useState(false);

  return (
    <>
      <Button 
        type="primary" 
        onClick={() => setAccountDrawerVisible(true)}
      >
        My Account
      </Button>
      
      <AccountDrawer 
        open={accountDrawerVisible}
        onClose={() => setAccountDrawerVisible(false)}
      />
    </>
  );
};

export default ParentComponent;