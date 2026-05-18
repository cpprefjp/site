# try_push_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr std::optional<reference> try_push_back(const T& x); // (1) C++26
constexpr std::optional<reference> try_push_back(T&& x);      // (2) C++26
```

## 概要
末尾へ要素追加を試みる。容量超過時は例外を送出せず、[`std::nullopt`](/reference/optional/nullopt_t.md)を返す。

- (1) : `x`をコピーして末尾への追加を試みる。
- (2) : `x`をムーブして末尾への追加を試みる。


## 効果
[`size()`](size.md) `< N`の場合、`x`を末尾に追加する。そうでない場合、何もしない。


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

int main()
{
  std::inplace_vector<int, 3> iv = {1, 2, 3};

  auto r1 = iv.try_push_back(4);
  std::println("push_back(4): {}", (r1 ? "success" : "failed"));

  iv.pop_back();
  auto r2 = iv.try_push_back(4);
  std::println("push_back(4): {}", (r2 ? "success" : "failed"));
  std::println("value: {}", *r2);
}
```
* try_push_back[color ff0000]
* iv.pop_back()[link pop_back.md]

### 出力
```
push_back(4): failed
push_back(4): success
value: 4
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
