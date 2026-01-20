# token
* execution[meta header]
* std::execution[meta namespace]
* simple_counting_scope[meta class]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class simple_counting_scope::token;
}
```

## 概要
`simple_counting_scope::token`は、カウント式非同期スコープの[非同期トークン](../scope_token.md)である。
非同期トークンは非同期スコープを参照する軽量ハンドラとして振る舞う。

クラス動作説明用のメンバ変数として下記を保持する。

- `scope` : [`simple_counting_scope`](../simple_counting_scope.md)型の非同期スコープ


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wrap`](token/wrap.md) | 非同期スコープと[Sender](../sender.md)を関連付けたSenderを返す | C++26 |
| [`try_associate`](token/try_associate.md) | 非同期スコープとの関連付けを試行 | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scope_token`](../scope_token.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
