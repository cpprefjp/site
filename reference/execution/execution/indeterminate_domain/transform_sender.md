# transform_sender
* execution[meta header]
* std::execution[meta namespace]
* indeterminate_domain[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Tag, sender Sndr, queryable Env>
static constexpr decltype(auto) transform_sender(Tag, Sndr&& sndr, const Env& env)
  noexcept(see below);
```
* sender[link ../sender.md]
* queryable[link ../../queryable.md]

## 概要
Sender変換を行う。


## 戻り値
```cpp
default_domain().transform_sender(Tag(), std::forward<Sndr>(sndr), env)
```
* default_domain()[link ../default_domain.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
