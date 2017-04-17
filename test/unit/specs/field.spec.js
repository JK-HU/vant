import Field from 'packages/field';
import { mount } from 'avoriaz';

describe('Field', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('create a text field', () => {
    wrapper = mount(Field, {
      propsData: {
        type: 'text',
        autosize: false
      }
    });

    expect(wrapper.hasClass('zan-field')).to.be.true;
    expect(wrapper.propsData().type).to.equal('text');
  });

  it('create a text field with initialize value', (done) => {
    wrapper = mount(Field, {
      propsData: {
        value: 'test'
      }
    });

    expect(wrapper.hasClass('zan-field')).to.be.true;
    expect(wrapper.data().currentValue).to.equal('test');

    const eventStub = sinon.stub(wrapper.vm, '$emit');

    wrapper.vm.value = 'test2';
    wrapper.update();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.data().currentValue).to.equal('test2');
      expect(eventStub.calledWith('input'));
      done();
    });
  });

  it('input some value to filed', (done) => {
    wrapper = mount(Field, {
      propsData: {}
    });

    const eventStub = sinon.stub(wrapper.vm, '$emit');
    const input = wrapper.find('.zan-field__control')[0];
    input.element.focus();

    wrapper.update();
    wrapper.vm.$nextTick(() => {
      expect(eventStub.calledWith('focus'));
      done();
    });
  });

  it('create a textarea field', () => {
    wrapper = mount(Field, {
      propsData: {
        type: 'textarea',
        autosize: false
      }
    });

    expect(wrapper.hasClass('zan-field')).to.be.true;
    expect(wrapper.hasClass('zan-field--hastextarea')).to.be.true;
  });

  it('create a autosize textarea field', () => {
    wrapper = mount(Field, {
      propsData: {
        type: 'textarea',
        autosize: true
      }
    });

    expect(wrapper.hasClass('zan-field')).to.be.true;
    expect(wrapper.hasClass('zan-field--autosize')).to.be.true;
  });
});
