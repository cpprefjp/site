# wrap
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* simple_counting_scope::token[meta class]
* cpp26[meta cpp]

```cpp
template<sender Sender>
Sender&& wrap(Sender&& snd) const noexcept;
```

## 概要
入力[Sender](../../sender.md)を非同期スコープに関連付けたSenderを返す。


## 戻り値
[`std::forward`](/reference/utility/forward.md)`<Sender>(snd)`


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


## 関連項目
- [`execution::associate`](../../associate.md.nolink)
- [`execution::spawn_future`](../../spawn_future.md.nolink)
- [`execution::spawn`](../../spawn.md.nolink)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
