# size
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type size() const;                    // (1) C++03
size_type size() const noexcept;           // (1) C++11
constexpr size_type size() const noexcept; // (1) C++20
```

## 概要
文字列の長さを取得する。


## 戻り値
現在格納されている文字列の要素数。

※文字数ではないことに注意


## 例外
投げない


## 計算量
定数時間


## 備考
この関数は、[`length()`](length.md)メンバ関数と同じ効果を持つ。`size()`はコンテナインタフェースのために用意されているものだが、どちらを使用してもよい。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  std::size_t n = s.size();
  std::cout << n << std::endl;
}
```
* size()[color ff0000]

### 出力
```
5
```

## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
