import {observable, computed, asStructure, autorun} from 'mobx';

class AppStore{
    @observable pendingRequestCount = 0;

    @observable title = '';

    constructor() {
        // autorun(() => console.log(this.title));
    }

}

const singleton = new AppStore();
export default singleton;