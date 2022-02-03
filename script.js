'use strict';
const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.validity = true;
    }
    createGenesisBlock(){
        return new Block(0, "23/01/2022", "Genesis block", "0");
    }
    getLatestBlock(){
        return this.chain(this.chain.length - 1);
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        this.validity = this.checkValidity()
    }
    checkValidity(){
        for(i=1;i<this.chain.length;i++){
            if(this.chain[i].previousHash!=this.chain[i-1].calculateHash()){
                return false;
            }
        }
        return true;
    }
}

var java = 0;
var python = 0;
var voted = 0;

const j_element = document.getElementById('j_per');
j_element.innerHTML = 0;

const p_element = document.getElementById('p_per');
p_element.innerHTML = 0;

blockchain = new Blockchain();

function update(){
    var option = document.getElementByID("lang");
    if(option==="Java"){
        java++;
        voted++;
    }
    else if(option==="Python"){
        python++;
        voted++;
    }
    blockchain.addBlock(new Block(voted, "31/01/2022", option, blockchain.getLatestBlock.hash))
    else{
        console.log("nothing");
    }
    j_element.innerHTML = java/voted;
    p_element.innerHTML = python/voted;
}