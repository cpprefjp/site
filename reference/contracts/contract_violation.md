# contract_violation
* contracts[meta header]
* std::contracts[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  class contract_violation;
}
```

`contract_violation`型は、実行時に発生した契約違反が`handle_contract_violation`関数に渡されるために使用される型である。

この型は、ユーザーによって構築、コピー、ムーブ、変更してはならない。

## メンバ関数
| 名前 | 説明 | 対応バージョン |
| ---- | ---- | ---- |
| [`comment`](contract_violation/comment.md) | 契約違反の詳細を記録したchar列を返す | C++26 |
| [`detection_mode`](contract_violation/detection_mode.md) | 契約違反が特定された方法を返す | C++26 |
| [`is_terminating`](contract_violation/is_terminating.md) | 契約違反によってプログラムがターミネートされるかを返す | C++26|
| [`kind`](contract_violation/kind.md) | 違反した契約の種類 | C++26|
| [`location`](contract_violation/location.md) | 契約違反が発生したソースコードの位置 | C++26|
| [`semantic`](contract_violation/semantic.md) | 契約の評価方法 | C++26|

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
- [P3819R0 Remove `evaluation_exception()` from contract-violation handling](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3819r0.pdf)
    - 導入予定だった`evaluation_exception()`メンバ関数を削除する提案
