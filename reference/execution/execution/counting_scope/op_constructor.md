# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
counting_scope() noexcept;  // (1)
counting_scope(counting_scope&&) = delete;  // (2)
```

## 概要
- (1): デフォルトコンストラクタ
- (2): ムーブコンストラクタ。ムーブ不可


## 事後条件
(1) 説明用のメンバ変数`count`は`0`、`state`は`unused`となる。


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
