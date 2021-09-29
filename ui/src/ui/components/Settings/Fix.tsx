import React from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CarPayload } from '../../../../../shared/types';
import Loader from '../Loader';
import { fetchNui } from '../../utils/fetchNui';

const Container = styled.div`
  margin-top: 7px;
`;

const FixComponent = () => {
  const [loading, setLoading] = React.useState(false);
  const [cleanLoading, setCleanLoading] = React.useState(false);

  const handleSave = async (data: any | CarPayload) => {
    const retData = await fetchNui('car', data).catch((err) => {
      setLoading(false);
      setCleanLoading(false);
      toast.error('Car fix error!');
      throw new Error(err);
    });
    if (!retData || !retData.ok) {
      toast.error('Car fix error!');
      throw new Error(retData);
    }
    setCleanLoading(false);
    return setLoading(false);
  };

  return (
    <Container>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={() => {
            setLoading(true);
            handleSave({ type: 'fix' });
          }}
          type="button"
          className="block red"
        >
          {loading && <Loader size={15} />}
          Fix
        </button>

        <button
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={() => {
            setCleanLoading(true);
            handleSave({ type: 'clean' });
          }}
          type="button"
          className="btn"
        >
          {cleanLoading && <Loader size={15} />}
          Clean
        </button>
      </div>
    </Container>
  );
};

export default FixComponent;
