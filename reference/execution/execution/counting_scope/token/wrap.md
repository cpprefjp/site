# wrap
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* counting_scope::token[meta class]
* cpp26[meta cpp]

```cpp
template<sender Sender>
sender auto wrap(Sender&& snd) const
  noexcept(is_nothrow_constructible_v<remove_cvref_t<Sender>, Sender>);
```
* sender[link ../../sender.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]

## 概要
入力[Sender](../../sender.md)を非同期スコープに関連付けたSenderを返す。


## 効果
下記と等価。

```cpp
return stop-when(std::forward<Sender>(snd), scope->s_source.get_token());
```
* stop-when[link stop-when.md.nolink]
* get_token()[link /reference/stop_token/stop_source/get_token.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::associate`](../../associate.md.nolink)
- [`execution::spawn_future`](../../spawn_future.md.nolink)
- [`execution::spawn`](../../spawn.md.nolink)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
