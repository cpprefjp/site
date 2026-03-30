# operator[]
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference operator[](size_type n);             // (1) C++26
constexpr const_reference operator[](size_type n) const; // (2) C++26
```

## 概要
要素アクセス。

- (1) : 非`const`な文脈で任意の要素への参照を取得する。
- (2) : `const`な文脈で任意の要素への読み取り専用参照を取得する。


## 戻り値
`n`番目の要素への参照を返す。


## 計算量
定数時間


## 備考
- `n >=` [`size()`](size.md)の場合、未定義動作を引き起こす。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {3, 1, 4};
  int& x = iv[2];
  std::println("{}", x);
}
```

### 出力
```
4
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
