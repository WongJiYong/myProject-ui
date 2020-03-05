/**
 * 前端和后端 属性名不同时 尝试自动转换
 * 属性别名
 */
const PROP_ALIAS = {
    id: ['id'],
    value: ['value', 'id'],
    label: ['label', 'name'],
    parentId: ['parentId', 'pid'],
    children: ['children'],
    parentIds: ['parentIds', 'pids'],
    disabled: ['disabled'],
};

const utils = {
    treeify: function (obj, options) {
        if (!Array.isArray(obj)) {
            console.error("树化的对象必须为数组");
            return;
        }
        if (obj.length === 0) {
            return [];
        }
        let needProps = ['id', 'parentId', 'parentIds', 'children'];
        //parentIds children 为树化之后添加的
        let opt = decisionOptions(obj[0], needProps, ['parentIds', 'children'], options);
        let dict = {};
        //建造dict 并初始化obj相关属性
        for (let i = 0; i < obj.length; i++) {
            let o = obj[i];
            o[opt.parentIds] = [];
            o[opt.children] = [];
            dict[o[opt.id]] = o;
        }
        for (let i = 0; i < obj.length; i++) {
            let o = obj[i];
            let parentObj = dict[o[opt.parentId]];
            if (parentObj) {
                o[opt.parentIds] = o[opt.parentIds].concat(
                    parentObj[opt.parentIds],
                    parentObj[opt.id]);
                parentObj[opt.children].push(o);
                obj.splice(i, 1);//删除已经树化的结点
                i -= 1;
            }
        }
        return obj;
    },
    /**
     * 将目标已有的可枚举属性
     * 对应源对象的值 拷贝到自身
     * @param target 源
     * @param source 目标
     */
    copyProperties: function (target, source) {
        let keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            //TODO 实现深拷贝
            if (!source.hasOwnProperty(key)) {
                continue;
            }
            if (source[key] === Array) {
                target[key] = [].concat(source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    },
    /**
     * 将已有的Tree转换为 标准Tree
     * 节点为{
     *     id
     *     label,
     *     value,
     *     children,
     *     disabled
     * }
     * @param tree 需要标准化的树
     * @param options 自定义属性值的结点
     * @param isDisabled 关闭的方法
     */
    convertStanderTree(tree, isDisabled, options) {
        if (!Array.isArray(tree)) {
            console.error("标准化树的对象必须为数组");
            throw new Error('标准化树的对象必须为数组');
        }
        if (tree.length === 0) {
            return [];
        }
        let target = tree[0];
        let needProps = ['id', 'label', 'value', 'disabled', 'children'];
        let resultOptions = decisionOptions(target, needProps, ['disabled', 'children'], options);

        return start2StanderTree(tree, resultOptions, isDisabled)
    },
    getNodeInTree(tree, key, value) {
        let target = null;
        if (!(tree && tree.length)) {
            return target;
        }
        for (let i = 0; i < tree.length; i++) {
            let node = tree[i];
            if (node[key] && node[key] === value) {
                target = node;
            } else {
                if (node.children) {
                    target = this.getNodeInTree(node.children, key, value);
                }
            }
            if (target) {
                return target;
            }
        }
        return null;
    },
};

/**
 *
 * @param target 自动识别的对象
 * @param needProps 需要的属性字段
 * @param options 自定义的属性字段
 * @param addProps 添加的字段
 */
const decisionOptions = function (target, needProps, addProps, options) {
    let result = {};
    for (let i = 0; i < addProps.length; i++) {
        let ap = addProps[i];
        result[ap] = ap;
    }
    for (let i = 0; i < needProps.length; i++) {
        let prop = needProps[i];
        if (options && options.hasOwnProperty(prop)) {
            result[prop] = options[prop];
        } else {
            let suggest = PROP_ALIAS[prop];
            for (let j = 0; j < suggest.length; j++) {
                let s = suggest[j];
                if (target.hasOwnProperty(s)) {
                    result[prop] = s;
                    break;
                }
            }
        }
        //如果最后没有获取到需要的字段 抛异常
        if (!result.hasOwnProperty(prop)) {
            throw new Error('未发现需要的字段:' + prop);
        }
    }
    return result;
};

const start2StanderTree = function (tree, options, isDisabled) {
    let standerTree = [];
    for (let i = 0; i < tree.length; i++) {
        let node = tree[i];
        let leaf = {
            id: node[options.id],
            value: node[options.value],
            label: node[options.label],
        };
        if (node.hasOwnProperty(options.disabled)) {
            leaf.disabled = node[options.disabled]
        }
        if (isDisabled) {
            leaf.disabled = isDisabled(node);
        }
        if (node[options.children] && node[options.children].length > 0) {
            leaf.children = start2StanderTree(node[options.children], options, isDisabled);
        }
        standerTree.push(leaf);
    }
    return standerTree;
};

export default utils;