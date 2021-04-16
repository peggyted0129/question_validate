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
              <div class="w-50">
                <Field v-model="form.county" class="form-control" id="county" name="county"
                :class="{ 'is-invalid': errors['county'] }" rules="required" data-role="county" data-name="county" data-style="form-control"
                as="select"></Field>
                <error-message name="county" class="invalid-feedback"></error-message>
              </div>
              <div class="w-25">
                <Field v-model="form.district" class="form-control" id="district[]" name="district[]"
                :class="{ 'is-invalid': errors['district[]'] }" rules="required" data-role="district" data-name="district[]" data-style="form-control"
                as="select"></Field>
                <error-message name="district[]" class="invalid-feedback"></error-message>
              </div>
              <div class="w-25">
                <Field type="text" v-model="form.zipcode" class="form-control" id="zipcode" name="zipcode" readonly
                  :class="{ 'is-invalid': errors['zipcode'] }" rules="required" data-role="zipcode" data-name="zipcode" data-style="form-control"></Field>
                <error-message name="zipcode" class="invalid-feedback"></error-message>
              </div>
              <!-- 原本的 jQuery 的 "郵遞區號" 程式碼 -->
              <!-- <div data-role="county" data-name="county"
                data-style="form-control" class="w-50">
              </div>
              <div data-role="district" data-name="district[]"
                data-style="form-control" class="w-25">
              </div>
              <div data-role="zipcode" data-name="zipcode"
                data-style="form-control" class="w-25">
              </div> -->
            </div>
          </div>
          <p>你選的是 {{ form.county }} 、 {{ form.district }} 、 {{ form.zipcode }}</p>
          <p>( 為什麼 " 縣市區域 " 一定要 change 才會帶入 data 裡 )</p>
          <p class="text-danger">( 畫面的欄位內容 " 縣市區域 " 和 data 資料比對，若無 change 就會不符 )</p>
          <div class="form-group text-left">
            <Field v-model="form.address" class="form-control" type="text" id="地址" name="地址"
                   :class="{ 'is-invalid': errors['地址'] }" rules="required"></Field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>
          <div class="form-group text-left">
            <Field v-model="sex" class="form-control" type="text" id="sex" name="sex"
                :class="{ 'is-invalid': errors['sex'] }" rules="required" as="select">
              <option value="">請選填 SEX</option>
              <option value="boy">boy</option>
              <option value="girl">girl</option>
            </Field>
            <error-message name="sex" class="invalid-feedback"></error-message>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" type="submit" style="margin-top: 15px;">送出</button>
    </Form>
  </div>
</template>

<script>
/* global $ */

export default {
  data () {
    const schema = {
      // 保固序號: 'required|min:10',
      // 手機: 'required|min:10'
      shop: (value) => {
        if (value) {
          return true;
        }
        return '您需要選擇 "購買通路"';
      },
      郵遞區號: (value) => {
        if (value) {
          return true;
        }
        return '請確實填寫 "縣市、區域、郵遞區號"';
      }, 
      保固序號: (value) => {
        /* 以下註解這段 ( 無法驗證 )
        const codeData = ['0620EZQULA', '0620EZQULB', '0620EZQULC', '0620EZQULD', '0620EZQULE']
        codeData.Each(item => {
          if (value == item) {
            return true;
          }
          return '請確實填寫 "保固序號"';
        })
        */
        if (value == '0620EZQABC') {
          return true;
        }
        return '請確實填寫 "保固序號"';
      }
    }
    return {
      sex: '',
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
  created () {
    const vm = this
    vm.form.county = $('#twzipcode').twzipcode('get', 'county')[0]
    vm.form.district = $('#twzipcode').twzipcode('get', 'district')[0]
    vm.form.zipcode = $('#twzipcode').twzipcode('get', 'zipcode')[0]  
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
  },
  watch: {
    'form.county': function (val) {
      const vm = this;
      if (val) {
        this.$nextTick(function () {
        vm.form.county = val;
        setTimeout(function () {
          vm.form.district = $('#twzipcode').twzipcode('get', 'district')[0];
          vm.form.zipcode = $('#twzipcode').twzipcode('get', 'zipcode')[0]
        }, 0)
        })
      }
    },
    'form.district': function (val) {
      const vm = this;
      if (val) {
        this.$nextTick(function () {
        vm.form.district = val;
        setTimeout(function () {
          vm.form.zipcode = $('#twzipcode').twzipcode('get', 'zipcode')[0]
        }, 0)
        })
      }
    }
  }
}
</script>
