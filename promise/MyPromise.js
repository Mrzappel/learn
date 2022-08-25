//three const
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

//构造函数实现
class MyPromise{
    constructor(executor){
        executor(this.resolve,this.reject)
   }

    status = PENDING
    value = null
    reason = null
    onFulfilledCallback = null
    onRejectedCallback = null

    resolve = (value) => {
        if(this.status === PENDING){
            this.status = FULFILLED
            this.value = value
            this.onFulfilledCallback&&this.onFulfilledCallback(value)
        }
    }
    reject = (reason) => {
        if(this.status === PENDING){
            this.status = REJECTED
            this.reason = this.reason
            this.onRejectedCallback&&this.onRejectedCallback(reason)
        }
    }
    then(onFulfilled,onRejected){
        if(this.status === FULFILLED){
            onFulfilled(this.value)
        } else if(this.status === REJECTED){
            onRejected(this.reason)
        } else if(this.status === PENDING) {
            this.onFulfilledCallback = onFulfilled
            this.onRejectedCallback = onRejected
        }
    }
}

module.exports = MyPromise