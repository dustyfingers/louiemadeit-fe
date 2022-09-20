import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';

import { apiLink } from '../../env';

const CustomerProfilePage = () => {
    const [custPurchases, setCustPurchases] = useState(null);

    const fetchCustomerData = async () => {
        try {
            const {
                data: { purchases },
            } = await axios.get(`${apiLink}/stripe/purchases`);
            setCustPurchases(purchases);
        } catch (error) {
            ToastsStore.error('There was an error fetching your profile...');
        }
    };

    useEffect(() => {
        fetchCustomerData();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>CUSTOMER PROFILE</h1>
            <div>
                {custPurchases
                    ? custPurchases.length
                        ? custPurchases.map(
                              (
                                  {
                                      trackName,
                                      stemsGetUrl,
                                      untaggedGetUrl,
                                      taggedGetUrl,
                                      packName,
                                      zipGetUrl,
                                  },
                                  idx
                              ) => {
                                  return (
                                      <div key={idx}>
                                          <p>{trackName ? trackName : packName}</p>
                                          {zipGetUrl ? (
                                              <p>
                                                  <a
                                                      href={zipGetUrl}
                                                      rel="noopener noreferrer"
                                                      target="_blank"
                                                  >
                                                      ZIP FILE
                                                  </a>
                                              </p>
                                          ) : (
                                              ''
                                          )}
                                          {taggedGetUrl ? (
                                              <p>
                                                  <a
                                                      href={taggedGetUrl}
                                                      rel="noopener noreferrer"
                                                      target="_blank"
                                                  >
                                                      TAGGED FILES
                                                  </a>
                                              </p>
                                          ) : (
                                              ''
                                          )}
                                          {untaggedGetUrl ? (
                                              <p>
                                                  <a
                                                      href={untaggedGetUrl}
                                                      rel="noopener noreferrer"
                                                      target="_blank"
                                                  >
                                                      UNTAGGED FILES
                                                  </a>
                                              </p>
                                          ) : (
                                              ''
                                          )}
                                          {stemsGetUrl ? (
                                              <p>
                                                  <a
                                                      href={stemsGetUrl}
                                                      rel="noopener noreferrer"
                                                      target="_blank"
                                                  >
                                                      STEM FILES
                                                  </a>
                                              </p>
                                          ) : (
                                              ''
                                          )}
                                      </div>
                                  );
                              }
                          )
                        : 'No purchases made yet.'
                    : 'Fetching your purchases...'}
            </div>
        </div>
    );
};

export default connect()(CustomerProfilePage);
