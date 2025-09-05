// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Version {
    bytes32 contentHash;
    string cid;       // points to metadata JSON on IPFS
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

contract CredentialRegistry is ERC721URIStorage, Ownable {
    mapping(bytes32 => Credential) private creds;
    mapping(bytes32 => uint256) public seriesToTokenId;
    uint256 private _tokenIds;

    event Issued(
        bytes32 indexed seriesId,
        uint256 version,
        string cid,
        bytes32 contentHash,
        uint256 tokenId
    );
    event Upgraded(bytes32 indexed seriesId, uint256 version, string cid, bytes32 contentHash);
    event Revoked(bytes32 indexed seriesId, uint256 version);

    modifier onlyIssuer(bytes32 seriesId) {
        require(creds[seriesId].issuer == msg.sender, "not issuer");
        _;
    }

    // ✅ Pass msg.sender to Ownable
    constructor() ERC721("AcademicCredential", "ACRED") Ownable(msg.sender) {}

    function issue(
        bytes32 seriesId,
        address subject,
        string calldata metadataCid,
        bytes32 contentHash
    ) external onlyOwner {
        Credential storage c = creds[seriesId];
        require(!c.exists, "series exists");

        c.issuer = msg.sender;
        c.subject = subject;
        c.seriesId = seriesId;
        c.latestVersion = 0;
        c.exists = true;
        c.versions[0] = Version({
            contentHash: contentHash,
            cid: metadataCid,
            issuedAt: block.timestamp,
            revoked: false
        });

        // Mint NFT
        _tokenIds++;
        uint256 newId = _tokenIds;
        _mint(subject, newId);
        _setTokenURI(newId, metadataCid);

        seriesToTokenId[seriesId] = newId;

        emit Issued(seriesId, 0, metadataCid, contentHash, newId);
    }

    function addVersion(
        bytes32 seriesId,
        string calldata metadataCid,
        bytes32 contentHash
    ) external onlyIssuer(seriesId) {
        Credential storage c = creds[seriesId];
        require(c.exists, "series missing");
        uint256 v = c.latestVersion + 1;
        c.latestVersion = v;
        c.versions[v] = Version({
            contentHash: contentHash,
            cid: metadataCid,
            issuedAt: block.timestamp,
            revoked: false
        });

        uint256 tokenId = seriesToTokenId[seriesId];
        _setTokenURI(tokenId, metadataCid);

        emit Upgraded(seriesId, v, metadataCid, contentHash);
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

    function getVersion(
        bytes32 seriesId,
        uint256 version
    )
        external
        view
        returns (
            bytes32 contentHash,
            string memory cid,
            uint256 issuedAt,
            bool revoked,
            address issuer,
            address subject
        )
    {
        Credential storage c = creds[seriesId];
        require(c.exists, "series missing");
        Version storage v = c.versions[version];
        return (v.contentHash, v.cid, v.issuedAt, v.revoked, c.issuer, c.subject);
    }
}
