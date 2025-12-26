# contracts
* contracts[meta header]
* cpp26[meta cpp]

## 概要
`<contracts>`ヘッダでは、C++における契約プログラミングのサポートを提供する。

契約プログラミングは、関数やクラスの前提条件、事後条件、およびアサーションを明示的に指定するプログラミング手法である。これらの条件が満たされない場合、プログラムは契約違反を報告する。

このヘッダで提供される機能は、ユーザー定義の契約違反ハンドラ（`handle_contract_violation`関数）を記述するために使用することを主な目的としており、契約アサーション（`pre`、`post`、`contract_assert`）を記述するためにこのヘッダをインクルードする必要はない。

このヘッダのすべての宣言は名前空間`std::contracts`に属する。

## 列挙型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`assertion_kind`](contracts/assertion_kind.md) | 契約アサーションの種類（enum） | C++26 |
| [`evaluation_semantic`](contracts/evaluation_semantic.md) | 契約アサーションの評価セマンティクス（enum） | C++26 |
| [`detection_mode`](contracts/detection_mode.md) | 契約違反の検出方法（enum） | C++26 |

## クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`contract_violation`](contracts/contract_violation.md) | 契約違反に関する情報 (class) | C++26 |

## 関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`invoke_default_contract_violation_handler`](contracts/invoke_default_contract_violation_handler.md) | デフォルトの契約違反ハンドラを呼び出す（function） | C++26 |

## 機能テストマクロ

| マクロ名 | 値 | 説明 | 対応バージョン |
|----------|-----|------|----------------|
| `__cpp_lib_contracts` | ??? | `<contracts>`ヘッダが利用可能かを検出する | C++26 |

言語機能（`pre`、`post`、`contract_assert`構文）の検出には`__cpp_contracts`マクロを使用する。ライブラリと言語機能は異なるベンダーから提供される可能性があるため、別々のマクロが用意されている。

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [契約に基づくプログラミング](/lang/future/contract-based_programming.md)
- [契約プログラミング](/lang/cpp26/contracts.md)

## 参照
- [P2900R14 Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
