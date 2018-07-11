module.exports = {
    ref: function (app) {
        return function (name){
            // ref={ref`root`}
            if (Array.isArray(name)) {
                name = name[0]
            }
            return function (node) {
                app.$refs = app.$refs || {}
                app.$refs[name] = node
            }
        }
    },
    createClassNames: function (props) {
        const classNames = require('classNames')
        let prefixClassName
        if (typeof props === 'string') {
            prefixClassName = props
        }
        else {
            if (typeof props.prefixClassName !== 'string') {
                throw new Error('util.react(npm): createClassNames(props) props.prefixClassName must be string!')
            }
            prefixClassName = props.prefixClassName
        }
        return function (data, judge) {
            let names
            if (typeof judge === 'undefined') {
                names = classNames(data).split(' ')
            }
            else {
                names = judge?[data]:[]
            }

            return names.filter((item) => {
                return item
            }).map(function (item) {
                return prefixClassName + '-' + item
            }).join(' ')
        }
    },
    themes: require('themes-classname'),
    // ref: https://github.com/react-component/util MIT
    contains: function contains(root, n) {
      var node = n
      while (node) {
        if (node === root) {
          return true
        }
        node = node.parentNode
      }
      return false
    },
    // ref: https://github.com/react-component/util MIT
    childrenToArray: function childrenToArray (children) {
        var React = require('react')
        if (!children){ return [] }
        var ret = []
        React.Children.forEach(children, function (c) {
            ret.push(c)
        })
        return ret
    },
    flatArray: function (children) {
        var flatChildren = []
        children.forEach(function (item) {
            if (!item) {
                return
            }
            if (Array.isArray(item)) {
                flatChildren = flatChildren.concat(item)
            }
            else {
                flatChildren.push(item)
            }
        })
        return flatChildren
    },
    flatElement: function flatElement (children) {
        var React = require('react')
        return this.flatArray(this.childrenToArray(children)).filter(function (element) {
            return React.isValidElement(element)
        })
    }
}
