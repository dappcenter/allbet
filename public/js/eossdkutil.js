var Promise = require('promise');
var Eos = require('eosjs');
var axios = require('axios');
var timeout = require('timeout');



const scatterMainNetwork = {
    blockchain: 'eos',
    host: 'node.eosflare.io',
    hostTable: 'api1.eosasia.one',
    port: 443,
    protocol: 'https',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};

const scatterTestNetwork = {
    blockchain: 'eos',
    host: 'api.kylin.eoseco.com',
    hostTable: 'api-kylin.eosasia.one',
    port: 80,
    protocol: 'http',
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
};

var eossdkutil = {
    scatterSdk: null,
    scatterNetwork: scatterMainNetwork,
    requiredFields: null,
    eosJsOption: null,
    scatterEosJs: null,
    init: function () {
        var canResolve = true;
        var that = this;
        return new Promise(function (resolve, reject) {
            timeout.timeout(3000, function () {
                if (canResolve) {
                    var scatter = window.scatter;
                    if (scatter) {
                        that.scatterSdk = scatter;
                        that.refreshScatterConfig();
                    }
                    canResolve = false;
                    resolve();
                }
            });
            document.addEventListener('scatterLoaded', scatterExtension => {
                if (canResolve) {
                    var scatter = window.scatter;
                    if (scatter) {
                        that.scatterSdk = scatter;
                        that.refreshScatterConfig();
                    }
                    canResolve = false;
                    resolve();
                }
            });
        });


    },
    getEnv: function () {
        if (this.scatterSdk) {
            return "scatter";
        }
        return "none";
    },
    isConnected: function () {
        if (this.scatterSdk) {
            return true;
        }
        return false;
    },
    refreshScatterConfig: function () {
        this.eosJsOption = {
            broadcast: true,
            sign: true,
            chainId: this.scatterNetwork.chainId
        };
        this.requiredFields = {
            accounts: [this.scatterNetwork]
        };
        this.scatterEosJs = this.scatterSdk.eos(
            this.scatterNetwork, Eos, this.eosJsOption, this.scatterNetwork.protocol
        );
    },
    setScatterNetworkCustom: function (network) {
        this.scatterNetwork = network;
    },
    setScatterNetworkMain: function () {
        this.scatterNetwork = scatterMainNetwork;
    },
    setScatterNetworkTest: function () {
        this.scatterNetwork = scatterTestNetwork;
    },
    login: function () {
        var that = this;
        if (that.scatterSdk) {
            return new Promise(function (resolve, reject) {
                that.scatterSdk.getIdentity(that.requiredFields).then(identity => {
                    resolve(identity);
                }).catch(error => {
                    //
                    reject(error);
                });
            });
        }
    },
    getPublicKey: function (blockchain) {
        var that = this;
        if (that.scatterSdk) {
            return new Promise(function (resolve, reject) {
                that.scatterSdk.getPublicKey(blockchain).then(identity => {
                    resolve(identity);
                }).catch(error => {
                    //
                    reject(error);
                });
            });
        }
    },
    logout: function () {
        if (this.scatterSdk) {
            this.scatterSdk.forgetIdentity();
        }
    },
    getScatterIdentity: function () {
        if(this.scatterSdk){
            return this.scatterSdk.identity;
        }
        return null;
    },
    getAuthStr: function (account) {
        return {authorization: [`${account.name}@${account.authority}`]};
    },
    pushEosAction: function (params) {
        var that = this;
        if(this.scatterSdk){
            return new Promise(function (resolve, reject) {
                var actor = params.actions[0].authorization[0].actor;
                var permitLevel = params.actions[0].authorization[0].permission;
                var code = params.actions[0].account;
                var action = params.actions[0].name;
                var data = params.actions[0].data;
                var requiredFields = that.requiredFields;
                var account = that.scatterSdk.identity.accounts.find(account => account.blockchain === 'eos');
                var accountStr = that.getAuthStr(account);
                setTimeout(() => {
                    reject('feild tx')
                }, 15000);
                var scatterEosJs = that.scatterSdk.eos(
                    that.scatterNetwork, Eos, that.eosJsOption, that.scatterNetwork.protocol);
                scatterEosJs.contract(code, {requiredFields}).then(contract => {
                    contract[action](data, accountStr).then(trx => {
                        resolve(trx);
                    }).catch(e => {
                        reject(e);
                    })
                });
            });
        }
    },
    getEosTableRows: function (params) {
        var that = this;
        return new Promise(function (resolve, reject) {
            let postdata = JSON.stringify(params);
            let nodeUrl=that.scatterNetwork.protocol+"://"+that.scatterNetwork.hostTable;
            nodeUrl+="/v1/chain/get_table_rows";
            axios.post(nodeUrl, postdata,{timeout:5000})
                .then(function (response) {
                    var result = new Object();
                    result.result = true;
                    result.msg = "success";
                    result.data = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    getEosBlock: function (params) {
        var that = this;
        return new Promise(function (resolve, reject) {
            let postdata = JSON.stringify(params);
            let nodeUrl=that.scatterNetwork.protocol+"://"+that.scatterNetwork.hostTable;
            nodeUrl+="/v1/chain/get_info";
            axios.post(nodeUrl, postdata)
                .then(function (response) {
                    var result = new Object();
                    result.result = true;
                    result.msg = "success";
                    result.data = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    getAccount: function (params) {
        var that = this;
        return new Promise(function (resolve, reject) {
            let postdata = JSON.stringify(params);
            let nodeUrl=that.scatterNetwork.protocol+"://"+that.scatterNetwork.hostTable;
            nodeUrl+="/v1/chain/get_account";
            axios.post(nodeUrl, postdata)
                .then(function (response) {
                    var result = new Object();
                    result.result = true;
                    result.msg = "success";
                    result.data = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    getTableByScope: function (params) {
        var that = this;
        return new Promise(function (resolve, reject) {
            let postdata = JSON.stringify(params);
            let nodeUrl=that.scatterNetwork.protocol+"://"+that.scatterNetwork.hostTable;
            nodeUrl+="/v1/chain/get_table_by_scope";
            axios.post(nodeUrl, postdata)
                .then(function (response) {
                    var result = new Object();
                    result.result = true;
                    result.msg = "success";
                    result.data = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    getCurrencyBalance:function(params){
        var that = this;
        return new Promise(function (resolve, reject) {
            let postdata = JSON.stringify(params);
            let nodeUrl=that.scatterNetwork.protocol+"://"+that.scatterNetwork.hostTable;
            nodeUrl+="/v1/chain/get_currency_balance";
            axios.post(nodeUrl, postdata)
                .then(function (response) {
                    var result = new Object();
                    result.result = true;
                    result.msg = "success";
                    result.data = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    },
    getEosTableRowsTest: function (params,net) {
        var that = this;
        return new Promise(function (resolve, reject) {
          let postdata = JSON.stringify(params);
          let nodeUrl = "https://"+net+"/v1/chain/get_table_rows";
          axios.post(nodeUrl, postdata)
            .then(function (response) {
              var result = new Object();
              result.result = true;
              result.msg = "success";
              result.data = response.data;
              resolve(result);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      },
}
module.exports = eossdkutil;