/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */

'use strict';

var registryTars, EndpointTars, tarsRpc;
var tarsInstance = undefined;

var client = function() {};

client.prototype._locator   = "";
client.prototype._proxy     = undefined;
client.prototype._node_name   = "";
client.prototype.New=function(){
    var instance=new client();
    // 对外暴露Endpoint对象， 便于使用Endpoint对象（EndpointTars.Endpoint）
    instance.__defineGetter__("EndpointTars", function () {
        if(EndpointTars)
        {
            return EndpointTars;
        }
        else
        {
            return require('./EndpointFTars.js').tars;
        }
    });
    return instance;
}

client.prototype.setLocator = function (sLocator) {
    this._locator = sLocator;
};

// 重新设置locator，需要重新初始化
client.prototype.resetLocator = function(sLocator) {
    this._locator = sLocator;

    if (!tarsRpc) {
        tarsRpc = require("@tars/rpc");
        registryTars = require("./QueryFProxy.js").tars;
        EndpointTars = require('./EndpointFTars.js').tars;
    }

    tarsInstance = tarsRpc.Communicator.New();
    this._proxy = undefined;
};

client.prototype.initialize = function() {
    if (!tarsRpc) {
        tarsRpc = require("@tars/rpc");
        registryTars = require("./QueryFProxy.js").tars;
        EndpointTars = require('./EndpointFTars.js').tars;
    }

    tarsInstance = tarsRpc.Communicator.New();
    this._proxy = tarsInstance.stringToProxy(registryTars.QueryFProxy, this._locator);
    // 调用主控时传递 nodename，若没有则将 localip 当做 nodename 传递
    var nodename = tarsInstance.configure.get("tars.application.server.nodename", "");
    if (!nodename) nodename = tarsInstance.configure.get("tars.application.server.localip", "");
    this._node_name = nodename;
};

/**
 * 返回所有该对象的活动endpoint列表
 * @param id 对象名称
 * @returns {*}
 */
client.prototype.findObjectById = function (id) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectById(id, {context: {nodename: this._node_name}});
};

/**
 * 根据id获取所有对象,包括活动和非活动对象
 * @param id 对象名称
 * @returns {*}
 */
client.prototype.findObjectById4Any = function (id) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectById4Any(id, {context: {nodename: this._node_name}});
};

/**
 * 根据id获取所有对象,包括活动和非活动对象
 * @param id 对象名称
 * @returns {*}
 */
client.prototype.findObjectById4All = function (id) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectById4All(id, {context: {nodename: this._node_name}});
};

/**
 * 根据id获取对象同组endpoint列表
 * @param id 对象名称
 * @returns {*}
 */
client.prototype.findObjectByIdInSameGroup = function (id) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectByIdInSameGroup(id, {context: {nodename: this._node_name}});
};

/**
 * 根据id获取对象指定归属地的endpoint列表
 * @param id 对象名称
 * @param sStation 归属地
 * @returns {*}
 */
client.prototype.findObjectByIdInSameStation = function (id, sStation) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectByIdInSameStation(id, sStation, {context: {nodename: this._node_name}});
};

/**
 * 根据id获取对象同组endpoint列表
 * @param id 对象名称
 * @param setId set全称,格式为name.area.group
 * @returns {*}
 */
client.prototype.findObjectByIdInSameSet = function (id, setId) {
    if (!this._proxy) {
        this.initialize();
    }

    return this._proxy.findObjectByIdInSameSet(id, setId, {context: {nodename: this._node_name}});
};

var instance=client.prototype.New();

module.exports = instance;
