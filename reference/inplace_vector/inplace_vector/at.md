# at
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference at(size_type n);             // (1) C++26
constexpr const_reference at(size_type n) const; // (2) C++26
```

## 概要
境界チェック付きの要素アクセス。

- (1) : 非`const`な文脈で任意の要素への参照を取得する。
- (2) : `const`な文脈で任意の要素への読み取り専用参照を取得する。


## 戻り値
`n`番目の要素への参照を返す。


## 例外
`n >=` [`size()`](size.md)の場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する。


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <stdexcept>

int main()
{
  std::inplace_vector<int, 5> iv = {3, 1, 4};

  int& x = iv.at(2);
  std::println("{}", x);

  try {
    iv.at(3);
  }
  catch (std::out_of_range& ex) {
    std::println("out of range");
  }
}
```
* at[color ff0000]
* std::out_of_range[link /reference/stdexcept.md]

### 出力
```
4
out of range
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
