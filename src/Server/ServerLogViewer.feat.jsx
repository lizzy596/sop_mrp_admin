import React from 'react';
import moment from 'moment';

const ServerLogViewer = ({ data, toggle }) => {

  return (
    <div className="card mt-3 chart-card">
      {/* Header */}
      <div className="card-header">
        <h5>{moment(data?.createdAt).format('MM/DD/YY - hh:mm:ss a')}</h5>
        <p>{`${data?.host}`}</p>
        <div className="d-flex flex-row justify-content-between">
          <span>{`${data?.method} ${data?.uri}`}</span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <div>
          <div className="d-flex justify-content-center m-1">
            <span>{`${data?.hostname}`}</span>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p className="ip-text text-break">IP: {data?.address}</p>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <ul className="list-group list-group">
              <li className="list-group-item">
                <span className="fw-bold">Head: </span>
                {data?.duration?.header}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Req: </span>
                {data?.duration?.request}
              </li>

              <li className="list-group-item">
                <span className="fw-bold">Res: </span>
                {data?.duration?.response}
              </li>
            </ul>
            <ul className="list-group list-group">
              <li className="list-group-item">{data?.bytes}b</li>
              <li className="list-group-item">{data?.method}</li>

              <li className="list-group-item">{data?.status}</li>
            </ul>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p className="fs-6 text-break">
              <span className="fw-bold">URI: </span> {data?.uri}
            </p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={toggle}>
            {'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerLogViewer;
