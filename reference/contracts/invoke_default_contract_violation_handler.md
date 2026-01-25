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
契約違反が発生した際に呼び出されるデフォルトのハンドラー関数。

この関数は、契約違反が発生した際に、[`contract_violation`](contract_violation.md)オブジェクトを受け取り、デフォルトの処理を実行する。

## 効果
契約違反の情報を標準エラー出力に出力し、[`std::terminate()`](/reference/exception/terminate.md)を呼び出す。

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目
- [契約プログラミング](/lang/cpp26/contracts.md)
- [`contract_violation`](contract_violation.md)

## 参照
- [P2900R14 Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf) 
