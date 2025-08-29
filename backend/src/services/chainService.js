import { ethers } from "ethers";


const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d4563e9521a44c419e2242b40954b974");
const wallet = new ethers.Wallet("099a3d152873bae4a81c738c1a7587a3bd6a13f722e40331d3afeba1b7c2a935", provider);


const REGISTRY_ABI = [
"function issue(bytes32 seriesId, address subject, string cid, bytes32 contentHash)",
"function addVersion(bytes32 seriesId, string cid, bytes32 contentHash)",
"function revoke(bytes32 seriesId, uint256 version)",
"function getVersion(bytes32 seriesId, uint256 version) view returns (bytes32,string,uint256,bool,address,address)",
"function latestVersionOf(bytes32 seriesId) view returns (uint256)",
"event Issued(bytes32 indexed seriesId, uint256 version, string cid, bytes32 contentHash)",
"event Upgraded(bytes32 indexed seriesId, uint256 version, string cid, bytes32 contentHash)",
"event Revoked(bytes32 indexed seriesId, uint256 version)"
];


const registry = new ethers.Contract("0x41143621267f3857436D1aefE8090Fec3500f363", REGISTRY_ABI, wallet);


export function getIssuerAddress() {
return wallet.address;
}


export function computeSeriesId({ issuer, userId, semesterId, templateId }) {
const enc = ethers.solidityPacked(
["address","bytes32","bytes32","bytes32"],
[
issuer,
ethers.keccak256(ethers.toUtf8Bytes(String(userId))),
ethers.keccak256(ethers.toUtf8Bytes(String(semesterId))),
ethers.keccak256(ethers.toUtf8Bytes(String(templateId)))
]
);
return ethers.keccak256(enc);
}


export async function chainIssue({ seriesId, subject, cid, contentHash }) {
const tx = await registry.issue(seriesId, subject, cid, contentHash);
const receipt = await tx.wait();
return { txHash: receipt.hash };
}


export async function chainAddVersion({ seriesId, cid, contentHash }) {
const tx = await registry.addVersion(seriesId, cid, contentHash);
const receipt = await tx.wait();
return { txHash: receipt.hash };
}


export async function chainRevoke({ seriesId, version }) {
const tx = await registry.revoke(seriesId, version);
const receipt = await tx.wait();
return { txHash: receipt.hash };
}


export async function chainGetVersion({ seriesId, version }) {
const [contentHash, cid, issuedAt, revoked, issuer, subject] = await registry.getVersion(seriesId, version);
return { contentHash, cid, issuedAt: Number(issuedAt), revoked, issuer, subject };
}


export async function chainLatestVersion(seriesId) {
const v = await registry.latestVersionOf(seriesId);
return Number(v);
}