# invoke_default_contract_violation_handler
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  void invoke_default_contract_violation_handler(const contract_violation& violation);
}
```

## 概要
デフォルトの契約違反ハンドラを呼び出す。

ユーザーが定義した契約違反ハンドラ`::handle_contract_violation`の中から、[`contract_violation`](contract_violation.md)オブジェクトを渡してデフォルトの処理を実行させるために使用できる。

## 効果
デフォルトの契約違反ハンドラを引数`violation`で呼び出す。

## 備考
- デフォルトの契約違反ハンドラは処理系によって提供され、その具体的な動作は処理系に委ねられている
- デフォルトの契約違反ハンドラは、[`contract_violation`](contract_violation.md)オブジェクトの内容を適切に整形した診断メッセージを出力し、その後正常にリターンすることが推奨されている

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目
- [契約プログラミング](/lang/cpp26/contracts.md)
- [`contract_violation`](contract_violation.md)

## 参照
- [P2900R14 Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf) 
