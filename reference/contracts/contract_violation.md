# contract_violation
* contracts[meta header]
* std::contracts[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  class contract_violation {
  public:
    const char* comment() const noexcept;
    contracts::detection_mode detection_mode() const noexcept;
    exception_ptr evaluation_exception() const noexcept;
    bool is_terminating() const noexcept;
    assertion_kind kind() const noexcept;
    source_location location() const noexcept;
    evaluation_semantic semantic() const noexcept;
  };
}
```

`contract_violation`型は、実行時に発生した契約違反が`handle_contract_violation`関数に渡されるために使用される型である。

この型は、ユーザーによって構築、コピー、ムーブ、変更してはならない。

## メンバ関数
| 名前 | 説明 | 対応バージョン |
| ---- | ---- | ---- |
| [`comment`](contract_violation/comment.md) | 契約違反の詳細を記録したchar列を返す | C++26 |
| [`detection_mode`](contract_violation/detection_mode.md) | 契約違反が特定された方法を返す | C++26 |
| [`evaluation_exception`](contract_violation/evaluation_exception.md) | 契約が例外を飛ばしたことによって終了した場合の例外へのポインタ | C++26 |
| [`is_terminating`](contract_violation/is_terminating.md) | 契約違反によってプログラムがターミネートされるかを返す | C++26|
| [`kind`](contract_violation/kind.md) | 違反した契約の種類 | C++26|
| [`location`](contract_violation/location.md) | 契約違反が発生したソースコードの位置 | C++26|
| [`semantic`](contract_violation/semantic.md) | 契約の評価方法 | C++26|

## 参照
- [Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)