# contracts
* contracts[meta header]
* cpp26[meta cpp]

## 概要
`<contracts>`ヘッダでは、C++における契約プログラミングのサポートを提供する。

契約プログラミングは、関数やクラスの前提条件、事後条件、およびアサーションを明示的に指定するプログラミング手法である。これらの条件が満たされない場合、プログラムは契約違反を報告する。


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`assertion_kind`](contracts/assertion_kind.md.nolink) | アサーションの種類 (enum) | C++26 |
| [`evaluation_semantic`](contracts/evaluation_semantic.md.nolink) | アサーションの評価の種類(enum) | C++26 |
| [`detection_mode`](contracts/detection_mode.md.nolink) | 契約違反の検出モード(enum) | C++26 |
| [`contract_violation`](contracts/contract_violation.md.nolink) | 契約違反に関する情報 (class) | C++26 |
| [`invoke_default_contract_violation_handler`](contracts/invoke_default_contract_violation_handler.nolink) | デフォルトcontract_violationハンドラー | C++26 |

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 未実装
- [GCC](/implementation.md#gcc): 未実装
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 未実装

## 関連項目
- [契約に基づくプログラミング](/lang/future/contract-based_programming.md)
- [契約プログラミング](/lang/cpp26/contracts.md)

## 参照
- [P0542R5 Support for contract based programming in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html)
