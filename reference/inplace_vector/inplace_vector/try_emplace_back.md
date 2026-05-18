# try_emplace_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
constexpr std::optional<reference> try_emplace_back(Args&&... args); // (1) C++26
```

## 概要
末尾へ直接構築を試みる。容量超過時は例外を送出せず、[`std::nullopt`](/reference/optional/nullopt_t.md)を返す。


## 効果
[`size()`](size.md) `< N`の場合、`std::forward<Args>(args)...`から構築した要素を末尾に追加する。そうでない場合、何もしない。


## 戻り値
要素が追加された場合は追加された要素への参照を保持した[`std::optional`](/reference/optional/optional.md)、追加できなかった場合は[`std::nullopt`](/reference/optional/nullopt_t.md)を返す。


## 例外
投げない（`T`のコンストラクタが例外を送出する場合を除く）


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <string>

int main()
{
  std::inplace_vector<std::string, 2> iv;

  auto r1 = iv.try_emplace_back("hello");
  auto r2 = iv.try_emplace_back("world");
  auto r3 = iv.try_emplace_back("overflow");

  std::println("{}", (r1 ? *r1 : "(nullopt)"));
  std::println("{}", (r2 ? *r2 : "(nullopt)"));
  std::println("{}", (r3 ? "(success)" : "(failed)"));
}
```
* try_emplace_back[color ff0000]

### 出力
```
hello
world
(failed)
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
- [P3981R2 Better return types in `std::inplace_vector` and `std::exception_ptr_cast`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3981r2.html)
    - 戻り値型を`pointer`から[`std::optional`](/reference/optional/optional.md)`<reference>`に変更
