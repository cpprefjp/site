# operator[]
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
const_reference operator[](size_type pos) const;           // (1) C++98
constexpr const_reference operator[](size_type pos) const; // (1) C++20

reference operator[](size_type pos);                       // (2) C++98
constexpr reference operator[](size_type pos);             // (2) C++20
```

## 概要
`pos` 番目の要素への参照を取得する。


## 堅牢化された事前条件
`pos <=` [`size()`](size.md)


## 戻り値
- C++98
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
- [LWG Issue 2475. Allow overwriting of `std::basic_string` terminator with `charT()` to allow cleaner interoperation with legacy APIs](https://cplusplus.github.io/LWG/issue2475)
    - C++17で、非const版(2)の`pos == size()`で返る参照に`charT()`を書き込むことが許可された（レガシーC APIとの相互運用のため）
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。`charT()`以外の値を書き込んだ場合の未定義動作は維持されており、処理系はヌル終端文字を実際に保持しているため`charT()`の書き込みは当初から問題なく動作していた。要件の緩和であり、既存プログラムの意味は変わらないため
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
