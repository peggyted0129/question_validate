<template>
  <div id="register" class="d-flex flex-column align-items-center text-center" style="padding: 0px 37px;margin-top: 5px">
    <h3 class="text-center text-primary">Warranty<br></h3>
    <Form @submit="store" :validation-schema="schema" v-slot="{ errors, values, validate }" style="max-width:500px;margin-bottom: 60px">
      <div style="display:none">{{ errors }}{{ values }}</div>
      <div style="display:none">{{ validate }}</div>
      <div class="form-group text-left">
        <label class="form_label">機身序號<span class="text-danger" style="padding-left: 3px;">*</span></label>
        <Field v-model="form.code" class="form-control" type="text" id="保固序號" name="保固序號" placeholder="請刮開外包裝保固貼紙序號"
                   :class="{ 'is-invalid': errors['保固序號'] }" rules="required"></Field>
        <error-message name="保固序號" class="invalid-feedback"></error-message>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group text-left">
            <label class="form_label">姓名<span class="text-danger" style="padding-left: 3px;">*</span></label>
            <Field v-model="form.name" class="form-control" type="text" id="姓名" name="姓名"
                   :class="{ 'is-invalid': errors['姓名'] }" rules="required"></Field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>
        </div>
        <div class="col">
          <div class="form-group text-left">
            <label class="form_label">手機<span class="text-danger" style="padding-left: 3px;">*</span></label>
            <Field id="phone" name="手機" v-model="form.tel" class="form-control" type="text"
                   :rules="isPhone" :class="{ 'is-invalid': errors['手機'] }"></Field>
            <error-message name="手機" class="invalid-feedback"></error-message>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <div class="form-group text-left">
            <label class="form_label">地址<span class="text-danger" style="padding-left: 3px;">*</span></label>
            <div id="twzipcode" class="d-flex">
              <div data-role="county" data-name="county"
                data-style="form-control" class="w-50">
              </div>
              <div data-role="district" data-name="district[]"
                data-style="form-control" class="w-25">
              </div>
              <div data-role="zipcode" data-name="zipcode"
                data-style="form-control" class="w-25">
              </div>
            </div>
            <span v-if="errors.zipcode">
              <small class="text-danger">{{ errors.zipcode[0] }}</small>
            </span>
          </div>
          <div class="form-group text-left">
            <Field v-model="form.address" class="form-control" type="text" id="地址" name="地址"
                   :class="{ 'is-invalid': errors['地址'] }" rules="required"></Field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>
        </div>
      </div>
      <div class="d-flex"></div>
      <button class="btn btn-primary btn-block" type="submit" style="margin-top: 15px;">送出</button>
    </Form>
  </div>
</template>

<script>
/* global $ */

export default {
  data () {
    const schema = {
      保固序號: 'required|min:10',
      手機: 'required|min:10'
    }
    return {
      schema,
      form: {
        code: '',
        name: '',
        tel: '',
        county: '',
        district: '',
        zipcode: '',
        address: '',
        email: null,
        invoice: null,
        shop: '',
        seller: null,
        others: null
      }
    }
  },
  mounted () {
    $('#twzipcode').twzipcode()
  },
  methods: {
    store () {
    const vm = this
    vm.form.county = $('#twzipcode').twzipcode('get', 'county')[0]
    vm.form.district = $('#twzipcode').twzipcode('get', 'district')[0]
    vm.form.zipcode = $('#twzipcode').twzipcode('get', 'zipcode')[0]
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    reset () {
      this.form.code = ''
      this.form.name = ''
      this.form.tel = ''
      this.form.county = ''
      this.form.district = ''
      this.form.zipcode = ''
      this.form.address = ''
      this.form.email = null
      this.form.invoice = null
      this.form.shop = ''
      this.form.seller = null
      this.form.others = null
      $('#twzipcode').twzipcode('reset')
    }
  }
}
</script>
