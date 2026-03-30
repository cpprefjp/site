# push_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference push_back(const T& x); // (1) C++26
constexpr reference push_back(T&& x);      // (2) C++26
```

## 概要
新たな要素を末尾に追加する。

- (1) : `x`をコピーして末尾に追加する。
- (2) : `x`をムーブして末尾に追加する。


## 戻り値
追加された要素への参照。


## 例外
[`size()`](size.md) `== N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
定数時間


## 備考
- [`std::vector`](/reference/vector/vector.md)の[`push_back()`](/reference/vector/vector/push_back.md)が`void`を返すのとは異なり、`inplace_vector`では追加された要素への参照を返す。


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <string>

int main()
{
  std::inplace_vector<std::string, 5> iv;

  // (1) コピーで追加
  std::string s = "hello";
  iv.push_back(s);

  // (2) ムーブで追加
  iv.push_back("world");

  for (const auto& x : iv) {
    std::println("{}", x);
  }
}
```
* push_back[color ff0000]

### 出力
```
hello
world
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
