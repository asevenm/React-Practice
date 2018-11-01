import React, { Component, Fragment } from 'react';
import { FormattedMessage as FM } from 'react-intl';
import propTypes from 'prop-types';
import { connect } from 'dva';
import Clipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {
  Select, Input, message,
} from 'antd';
import WithDataOperation from './WithDataOperation';
import AssetsModal from '../../../components/assets/modal/AssetsModal.jsx';
import CommonButton from '../../../components/assets/CommonButton.jsx';
import {
  fetchCollateralAddress, collaterate, fetchAddressExist,
} from '../../../services/assets';
import { fetchMyConfigurations } from '../../../services/loan';
import AssetRow from '../../../components/assets/AssetRow.jsx';
import AddCurrencyAddress from '../../../components/loanCard/AddCurrencyAddress.jsx';
import { getIntlValue } from '../../../utils/i18n/languageUtils';
import './MortgageModal.scss';
import successIcon from '../../../assets/userAssets/success.png';
import MultiFM from '../../../components/common/i18n/MultilineFM.jsx';

const { Option } = Select;
const operateType = 'mortgage';

const walletTypes = [
  {
    type: 'cashWallet',
    name: <FM id="209004" description="现金钱包" />,
  }, {
    type: 'outsideWallet',
    name: <FM id="209006" description="外部钱包" />,
  },
];

class Mortgage extends Component {
  state = {
    status: 'todo',
    walletType: 'cashWallet',
    collaterated: true,
    showError: false,
    errorText: null,
    walletOptions: [],
    /** *临时需求，限制借款时LBA的币种** */
    myMaxLoan: 0,
    /** *临时需求，限制借款时LBA的币种** */
  };

  layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  labelStyle = {
    marginRight: '15px',
    paddingRight: 0,
  };


  componentDidMount() {
    this.initCashRecord();
  }

  componentDidUpdate(prevProps) {
    const { visible: prevVisible, cashAssets: prevCashAssets } = prevProps;
    const { visible, record, cashAssets } = this.props;
    const { currencyName } = record;
    if (!prevVisible && visible) {
      if (currencyName === 'BTC') {
        this.fetchAddressExist(record);
      }
      // this.initCashRecord();
      /** *临时需求，限制借款时LBA的币种** */
      this.fetchConfigurations();
      /** *临时需求，限制借款时LBA的币种** */
    }
    if (prevCashAssets !== cashAssets) {
      this.initCashRecord();
    }
  }

  initCashRecord() {
    const { cashAssets, record } = this.props;
    const cashRecord = cashAssets.filter(
      asset => asset.currencyName === record.currencyName,
    )[0];
    this.setState({ cashRecord });
  }

  /** ******临时需求，限制借款时LBA的币种*************************** */
  fetchConfigurations = async () => {
    const [error, data] = await fetchMyConfigurations();
    if (!error) {
      const { myMaxLoan } = data;
      this.setState({ myMaxLoan }, () => {
        this.genOptions();
      });
    }
  }
  /** ******临时需求，限制借款时LBA的币种*************************** */

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
    this.setState({ status: 'todo' });
  }

  genOptions = () => {
    /** ******临时需求，限制借款时LBA的币种*************************** */
    const { myMaxLoan } = this.state;
    const { record } = this.props;
    const curWalletTypes = [...walletTypes];
    if (Number(myMaxLoan) >= 10000 && record.currencyName === 'LBA') {
      curWalletTypes.pop();
    }
    /** ******临时需求，限制借款时LBA的币种*************************** */
    const options = curWalletTypes.map(wallet => (
      <Option value={wallet.type} key={wallet.type}>{wallet.name}</Option>
    ));
    this.setState({ walletOptions: options });
  }

  onWalletChange = (value) => {
    this.setState({ walletType: value }, () => {
      if (value === 'outsideWallet') {
        this.fetchWalletAddress();
      }
    });
  }

  fetchAddressExist = async (record) => {
    const { currencyName } = record;
    const currencyNames = currencyName;
    const [error, data] = await fetchAddressExist({ currencyNames });
    if (!error) {
      const { publicKeyExist } = data[0];
      this.setState({ collaterated: publicKeyExist });
    }
  }

  fetchWalletAddress = async () => {
    const { record } = this.props;
    const { currencyName } = record;
    const [error, data] = await fetchCollateralAddress({ currencyName });
    if (!error) {
      const { address, status: addressStatus } = data;
      this.setState({ address, addressStatus });
    }
  }

  onCopy = (text, result) => {
    if (result) {
      // message.success('copied');
      message.success(getIntlValue('f016'));
    }
  }

  onAmountChange = (event) => {
    const { showError, cashRecord } = this.state;
    const value = event.target.value;
    const { availableAmount } = cashRecord;
    let obj = {};
    if (showError) {
      this.setState({ showError: false });
    }
    if (!value) {
      obj = {
        ...obj,
        showError: true,
        errorText: <FM id="209008" description="请输入金额" />,
        amount: '',
      };
    }
    if (value && Number(value) === 0) {
      obj = {
        ...obj,
        showError: true,
        errorText: <FM id="209007" description="金额需大于0" />,
        amount: value,
      };
    }
    if (Number(value) > availableAmount) {
      obj = {
        ...obj,
        showError: true,
        errorText: <FM id="209009" description="可用金额不足" />,
        amount: value,
      };
    }
    if (!Number(value)) {
      obj = { ...obj, showError: true };
    }
    if (Number(value)) {
      obj = {
        ...obj,
        amount: value,
      };
    }
    // this.setState({ amount: event.target.value });
    this.setState({ ...obj });
  }

  handleCollaterate = async () => {
    const { amount, showError } = this.state;
    const { record } = this.props;
    const { currencyName } = record;
    const params = {
      assets: [
        {
          currencyName,
          amount,
        },
      ],
    };
    if (showError) return;
    if (Number(amount) === 0) {
      message.error(getIntlValue('209007')); // 补充金额必须大于0
      return;
    }
    if (!amount) {
      message.error(getIntlValue('209008')); // 请输入补充金额
      return;
    }
    if (amount) {
      const [error, data] = await collaterate(params);
      let reason = getIntlValue('208002'); // 系统原因
      if (!error) {
        const { assets } = data;
        const { status, code } = assets[0]; // 只进行单个的抵押
        if (status === 'SUCCESS') {
          this.setState({
            status: 'success',
            description: <FM id="212001" />,
            // description: '恭喜你补充抵押物成功',
          });
        } else {
          if (code === 11143001) {
            reason = getIntlValue('209009'); // 现金账户余额不足，
          }
          this.setState({
            status: 'fail',
            description: <FM id="213001" values={{ value: reason }} />,
            // description: `很抱歉，${reason}，补充抵押物失败。请发送邮件到message@libracredit.io,我们将尽快修复。`,
          });
        }
      } else {
        /** ******临时需求，限制借款时LBA的币种*************************** */
        const { code, message: amount } = error;
        if (code === 11143305) {
          this.setState({
            status: 'fail',
            description: <MultiFM id="230001" values={{ value: amount < 0 ? 0 : amount }} />,
          });
        }
        /** ******临时需求，限制借款时LBA的币种*************************** */
      }
    } else {
      this.setState({
        status: 'fail',
        description: <FM id="213001" values={{ value: reason }} />,
        // description: `很抱歉，${reason}补充抵押物失败。请发送邮件到message@libracredit.io,我们将尽快修复。`,
      });
    }
  }

  handleSubmit = () => {
    const { walletType } = this.state;
    if (walletType === 'cashWallet') {
      this.handleCollaterate();
    } else {
      this.closeModal();
    }
  }

  render() {
    const {
      status, description, walletType, addressStatus, address, collaterated, cashRecord,
      showError, errorText, amount, walletOptions,
    } = this.state;
    const { genTriggerTab, visible, record } = this.props;
    const curRecord = walletType === 'cashWallet' ? cashRecord : record;
    const { currencyName, availableAmount } = curRecord || {};
    const triggerTab = genTriggerTab();
    const modalProps = {
      triggerTab,
      visible,
      status,
      description,
      icon: status === 'success' ? successIcon : null,
      onCancel: this.closeModal,
    };
    const textDict = {
      SUCCESS: address,
      PENDING: <FM id="202001" description="正在生成中，请稍后重试..." />,
      FAILED: 'fail',
    };
    const addressContent = textDict[addressStatus];
    if (!collaterated && currencyName === 'BTC') {
      return (
        <AssetsModal {...modalProps}>
          <AddCurrencyAddress
            currencyAddressList={[{ currencyName, addressPublicKey: 'address' }]}
            onCancel={this.closeModal}
          />
        </AssetsModal>
      );
    }
    return (
      <AssetsModal {...modalProps}>
        <div className="mortgage-modal">
          <h3><FM id="209001" description="添加抵押物" /></h3>
          <AssetRow labelStyle={this.labelStyle}>
            {() => [
              <FM id="209002" description="钱包种类" />,
              <Select value={walletType} onChange={this.onWalletChange}>
                {walletOptions}
              </Select>,
            ]}
          </AssetRow>
          {
            walletType === 'cashWallet'
              ? (
                <Fragment>
                  <AssetRow
                    style={showError ? { marginBottom: '5px' } : { marginBottom: '130px' }}
                    labelStyle={this.labelStyle}
                  >
                    {() => [
                      <FM id="209003" description="补充金额" />,
                      <Input
                        value={amount}
                        addonAfter={<span className="currency">{currencyName}</span>}
                        onChange={this.onAmountChange}
                        placeholder={availableAmount || 0}
                      />,
                    ]}
                  </AssetRow>
                  {
                    showError
                    && (
                      <AssetRow
                        style={{ marginBottom: '125px' }}
                        labelStyle={this.labelStyle}
                      >
                        {() => [
                          null,
                          <span className="error-text">{errorText}</span>,
                        ]}
                      </AssetRow>
                    )
                  }
                </Fragment>
              )
              : (
                <div className="out-wallet">
                  <AssetRow layout={this.layout} labelStyle={this.labelStyle}>
                    {() => [
                      <FM className="test" id="203002" values={{ value: currencyName }} description="钱包地址" />,
                      <div className="address-wrapper">
                        <span className="address">{addressContent}</span>
                        {
                          addressStatus === 'SUCCESS'
                            ? (
                              <Clipboard text={address} onCopy={this.onCopy}>
                                <span className="copy-btn">
                                  <FM id="203003" description="复制" />
                                </span>
                              </Clipboard>
                            )
                            : (
                              <span className="disable-btn">
                                <FM id="203003" description="复制" />
                              </span>
                            )
                        }
                      </div>,
                    ]}
                  </AssetRow>
                  <AssetRow style={{ marginBottom: '12px' }} labelStyle={this.labelStyle}>
                    {() => [
                      null,
                      <div className="code">
                        {
                          address
                            ? <QRCode value="address" size={100} style={{ margin: '0 auto' }} />
                            : <i className="fake-code" />
                        }
                      </div>,
                    ]}
                  </AssetRow>
                  <AssetRow style={{ marginBottom: '25px' }} labelStyle={this.labelStyle}>
                    {() => [
                      null,
                      <span className="tip">
                        <FM id="210001" description="链上转账可能需要30-120分钟，请耐心等待" />
                      </span>,
                    ]}
                  </AssetRow>
                </div>
              )
          }
          <div style={{ paddingLeft: '30px' }}>
            <CommonButton
              text={
                walletType === 'cashWallet'
                  ? <FM id="209005" description="补充抵押物" />
                  : <FM id="203004" description="确定" />
              }
              handler={this.handleSubmit}
            />
          </div>
        </div>
      </AssetsModal>
    );
  }
}

const mapStateToProps = (state) => {
  const { cashAssets } = state.assets;
  return { cashAssets };
};

const WrapedMortgage = WithDataOperation(operateType)(Mortgage);
const ConnectedMortgage = connect(mapStateToProps)(WrapedMortgage);

ConnectedMortgage.propTypes = {
  record: propTypes.object.isRequired, // 币种信息
  className: propTypes.string, // 自定义className
  title: propTypes.any, // 自定义的点击按钮文字
  style: propTypes.object, // 自定义样式
};

export default ConnectedMortgage;
