// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

struct Version {
    bytes32 contentHash;
    string cid;
    uint256 issuedAt;
    bool revoked;
}

struct Credential {
    address issuer;
    address subject;
    bytes32 seriesId;
    uint256 latestVersion;
    mapping(uint256 => Version) versions;
    bool exists;
}

contract CredentialRegistry {
    mapping(bytes32 => Credential) private creds;

    event Issued(bytes32 indexed seriesId, uint256 version, string cid, bytes32 contentHash);
    event Upgraded(bytes32 indexed seriesId, uint256 version, string cid, bytes32 contentHash);
    event Revoked(bytes32 indexed seriesId, uint256 version);

    modifier onlyIssuer(bytes32 seriesId) {
        require(creds[seriesId].issuer == msg.sender, "not issuer");
        _;
    }

    function issue(bytes32 seriesId, address subject, string calldata cid, bytes32 contentHash) external {
        Credential storage c = creds[seriesId];
        require(!c.exists, "series exists");
        c.issuer = msg.sender;
        c.subject = subject;
        c.seriesId = seriesId;
        c.latestVersion = 0;
        c.exists = true;
        c.versions[0] = Version({contentHash: contentHash, cid: cid, issuedAt: block.timestamp, revoked: false});
        emit Issued(seriesId, 0, cid, contentHash);
    }

    function addVersion(bytes32 seriesId, string calldata cid, bytes32 contentHash) external onlyIssuer(seriesId) {
        Credential storage c = creds[seriesId];
        require(c.exists, "series missing");
        uint256 v = c.latestVersion + 1;
        c.latestVersion = v;
        c.versions[v] = Version({contentHash: contentHash, cid: cid, issuedAt: block.timestamp, revoked: false});
        emit Upgraded(seriesId, v, cid, contentHash);
    }

    function revoke(bytes32 seriesId, uint256 version) external onlyIssuer(seriesId) {
        Credential storage c = creds[seriesId];
        require(c.exists, "series missing");
        c.versions[version].revoked = true;
        emit Revoked(seriesId, version);
    }

    function latestVersionOf(bytes32 seriesId) external view returns (uint256) {
        require(creds[seriesId].exists, "series missing");
        return creds[seriesId].latestVersion;
    }

    function getVersion(bytes32 seriesId, uint256 version) external view returns (
        bytes32 contentHash,
        string memory cid,
        uint256 issuedAt,
        bool revoked,
        address issuer,
        address subject
    ) {
        Credential storage c = creds[seriesId];
        require(c.exists, "series missing");
        Version storage v = c.versions[version];
        return (v.contentHash, v.cid, v.issuedAt, v.revoked, c.issuer, c.subject);
    }
}
