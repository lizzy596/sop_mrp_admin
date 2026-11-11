import React from "react";

const awsRegions = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "af-south-1",
  "ap-east-1",
  "ap-southeast-3",
  "ap-south-1",
  "ap-northeast-3",
  "ap-northeast-2",
  "ap-northeast-1",
  "ap-southeast-1",
  "ap-southeast-2",
  "ca-central-1",
  "eu-central-1",
  "eu-west-1",
  "eu-west-2",
  "eu-south-1",
  "eu-west-3",
  "eu-north-1",
  "me-south-1",
  "sa-east-1",
  "us-gov-east-1",
  "us-gov-west-1",
];

const AWSForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="awsAccessKey" className="form-label">
          Access Key
        </label>
        <input type="password" className="form-control" id="awsAccessKey" />
      </div>
      <div className="mb-3">
        <label htmlFor="awsClientSecret" className="form-label">
          Client Secret
        </label>
        <input type="password" className="form-control" id="awsClientSecret" />
      </div>
      <div className="mb-3">
        <div className="form-floating mb-3">
          <select className="form-select" id="floatingInputHost">
            {awsRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <label htmlFor="floatingInputHost">Release</label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="awsBucket" className="form-label">
          OTA Bucket
        </label>
        <input type="password" className="form-control" id="awsBucket" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default AWSForm;
