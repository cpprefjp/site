# operator[]
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const_reference operator[](size_type pos) const;           // (1) C++03
constexpr const_reference operator[](size_type pos) const; // (1) C++20

reference operator[](size_type pos);                       // (2) C++03
constexpr reference operator[](size_type pos);             // (2) C++20
```

## 概要
`pos` 番目の要素への参照を取得する。


## 堅牢化された事前条件
`pos <=` [`size()`](size.md)


## 戻り値
- C++03
    - `pos <` [`size()`](size.md) の場合、`*(`[`begin()`](begin.md) `+ pos)` を返す。
    - `pos ==` [`size()`](size.md) の場合、(1) は `charT()` の値を持ったオブジェクトへの参照を返す。
    - それ以外の場合は、未定義動作。

- C++11以降
    - `pos <` [`size()`](size.md) の場合、`*(`[`begin()`](begin.md) `+ pos)` を返す。
    - `pos ==` [`size()`](size.md) の場合、`charT()` の値を持ったオブジェクトへの参照を返す。
    - それ以外の場合は、未定義動作。
    - (2) において、`pos ==` [`size()`](size.md) の場合に返された参照を `charT()` 以外の値に書き換えた場合の動作は未定義。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";
  char& c = s[1];

  std::cout << c << std::endl;
}
```
* s[1][color ff0000]

### 出力
```
e
```

## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
