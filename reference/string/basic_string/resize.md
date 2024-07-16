# resize
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
void resize(size_type n, charT c);           // (1) C++03
constexpr void resize(size_type n, charT c); // (1) C++20

void resize(size_type n);                    // (2) C++03
constexpr void resize(size_type n);          // (2) C++20
```

## 概要
文字列の長さを変更する。


## 要件
`n <=` [`max_size()`](max_size.md)


## 効果

- `n <=` [`size()`](size.md) のとき、元の文字列末尾の`size() - n`要素を削除する。
- `n >` [`size()`](size.md) のとき、`n - size()`個の`c`を元の文字列末尾にコピーして追加する

`resize(n)` は、 `resize(n, charT())` と等しい。

## 戻り値
なし


## 例外
`n >` [`max_size()`](max_size.md) の時、[`length_error`](/reference/stdexcept.md) 例外を投げる。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // sの長さを10に変更。大きくなった場所には'x'を埋める。
  s.resize(10, 'x');

  std::cout << s << std::endl;
}
```
* resize[color ff0000]

### 出力
```
helloxxxxx
```

## 参照

- [LWG Issue 2318 `basic_string`'s wording has confusing relics from the copy-on-write era](https://wg21.cmeerw.net/lwg/issue2318)
- [P1148R0 Cleaning up Clause 20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1148r0.pdf)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
