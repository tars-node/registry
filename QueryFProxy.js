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

"use strict";

var TarsStream = require("@tars/stream");
var TarsError  = require("@tars/rpc").error;
var _TARS_MODULE_A_ = require("./EndpointFTars.js");

var tars = tars || {};
module.exports.tars = tars;

tars.QueryFProxy = function () {
    this._name   = undefined;
    this._worker = undefined;
};

tars.QueryFProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

tars.QueryFProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};


var __tars_QueryF$findObjectById$EN = function (id) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectById$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readList(0, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectById$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectById = function (id) {
    return this._worker.tars_invoke("findObjectById", __tars_QueryF$findObjectById$EN(id), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectById$DE, __tars_QueryF$findObjectById$ER);
};

var __tars_QueryF$findObjectById4All$EN = function (id) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectById4All$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "activeEp" : is.readList(2, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF)),
                    "inactiveEp" : is.readList(3, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectById4All$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectById4All = function (id) {
    return this._worker.tars_invoke("findObjectById4All", __tars_QueryF$findObjectById4All$EN(id), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectById4All$DE, __tars_QueryF$findObjectById4All$ER);
};

var __tars_QueryF$findObjectById4Any$EN = function (id) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectById4Any$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "activeEp" : is.readList(2, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF)),
                    "inactiveEp" : is.readList(3, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectById4Any$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectById4Any = function (id) {
    return this._worker.tars_invoke("findObjectById4Any", __tars_QueryF$findObjectById4Any$EN(id), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectById4Any$DE, __tars_QueryF$findObjectById4Any$ER);
};

var __tars_QueryF$findObjectByIdInSameGroup$EN = function (id) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectByIdInSameGroup$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "activeEp" : is.readList(2, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF)),
                    "inactiveEp" : is.readList(3, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectByIdInSameGroup$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectByIdInSameGroup = function (id) {
    return this._worker.tars_invoke("findObjectByIdInSameGroup", __tars_QueryF$findObjectByIdInSameGroup$EN(id), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectByIdInSameGroup$DE, __tars_QueryF$findObjectByIdInSameGroup$ER);
};

var __tars_QueryF$findObjectByIdInSameSet$EN = function (id, setId) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    os.writeString(2, setId);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectByIdInSameSet$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "activeEp" : is.readList(3, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF)),
                    "inactiveEp" : is.readList(4, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectByIdInSameSet$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectByIdInSameSet = function (id, setId) {
    return this._worker.tars_invoke("findObjectByIdInSameSet", __tars_QueryF$findObjectByIdInSameSet$EN(id, setId), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectByIdInSameSet$DE, __tars_QueryF$findObjectByIdInSameSet$ER);
};

var __tars_QueryF$findObjectByIdInSameStation$EN = function (id, sStation) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, id);
    os.writeString(2, sStation);
    return os.getBinBuffer();
};

var __tars_QueryF$findObjectByIdInSameStation$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "activeEp" : is.readList(3, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF)),
                    "inactiveEp" : is.readList(4, true, TarsStream.List(_TARS_MODULE_A_.tars.EndpointF))
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_QueryF$findObjectByIdInSameStation$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.QueryFProxy.prototype.findObjectByIdInSameStation = function (id, sStation) {
    return this._worker.tars_invoke("findObjectByIdInSameStation", __tars_QueryF$findObjectByIdInSameStation$EN(id, sStation), arguments[arguments.length - 1]).then(__tars_QueryF$findObjectByIdInSameStation$DE, __tars_QueryF$findObjectByIdInSameStation$ER);
};



