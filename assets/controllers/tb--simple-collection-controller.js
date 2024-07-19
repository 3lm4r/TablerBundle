import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*
* Keep it lazy!!!!: When templates don't request it there will no be any error, altough stimulus might not be installed.
* It is no overhead because it is not requested. Only pitt fall is it's complation and deployment overhead.
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['tb--collectionContainer']

    static values = {
        index     : Number,
        prototype : String,
    }

    addCollectionElement(event)
    {
        event.preventDefault(); // prevent by default - we don't know if it's an <a>, <button> or what ever
        const item = document.createElement('div');
        item.innerHTML = this.prototypeValue.replace(/__name__/g, this.indexValue);
        this.collectionContainerTarget.appendChild(item);
        this.indexValue++;
    }

    removeCollectionElement(event)
    {
        event.preventDefault(); // prevent by default - we don't know if it's an <a>, <button> or what ever
        event.target.closest('.tb--item-container').remove();
    }
}
