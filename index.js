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
var os = require("os");
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
    // 获取当前节点的 nodename
    var nodename = "";
    // node-agent < 2.1.2 版本中初始化时未读取框架配置，这里做一下兼容
    if (tarsInstance.configure) {
        // 第一优先级：获取框架配置中的 nodename
        nodename = tarsInstance.configure.get("tars.application.server.nodename", "");
        // 第二优先级：获取框架配置中的 localip
        if (!nodename) nodename = tarsInstance.configure.get("tars.application.server.localip", "");
    }
    // 第三优先级：获取本地 IP，优先获取 IPv4，没有则获取 IPv6
    if (!nodename) {
        var networkInterfaces = os.networkInterfaces(), ipv4 = '', ipv6 = '';
        for (var key in networkInterfaces) {
            var iface = networkInterfaces[key];
            for (var i = 0; i < iface.length; i++) {
                var address = iface[i];
                if (address.family === 'IPv4' && !address.internal && !ipv4) {
                    ipv4 = address.address;
                } else if (address.family === 'IPv6' && !address.internal && !ipv6) {
                    ipv6 = address.address;
                }
            }
        }
        nodename = ipv4 || ipv6;
    }
    // 第四优先级：设置为 127.0.0.1
    if (!nodename) nodename = "127.0.0.1";
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

    return this._proxy.findObjectById(id, {context: {node_name: this._node_name}});
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

    return this._proxy.findObjectById4Any(id, {context: {node_name: this._node_name}});
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

    return this._proxy.findObjectById4All(id, {context: {node_name: this._node_name}});
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

    return this._proxy.findObjectByIdInSameGroup(id, {context: {node_name: this._node_name}});
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

    return this._proxy.findObjectByIdInSameStation(id, sStation, {context: {node_name: this._node_name}});
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

    return this._proxy.findObjectByIdInSameSet(id, setId, {context: {node_name: this._node_name}});
};

var instance=client.prototype.New();

module.exports = instance;
