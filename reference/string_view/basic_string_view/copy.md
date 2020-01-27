# copy
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
size_type copy(CharT* s, size_type n, size_type pos = 0) const;
```

## 概要
他の文�列に、自身の文�列をコピーする。


## 要件
`n`と[`size()`](size.md) `- pos`のうち、小さい方を`rlen`とする。

- `[s, s + rlen)`が妥当な範囲であり、その範囲内の要素にアクセスできること


## 効果
以下と�価の処理を行う：

```cpp
Traits::copy(s, data() + pos, rlen);
```
* copy[link /reference/string/char_traits/copy.md]
* data()[link data.md]


## 戻り値
`rlen`


## 例外
`pos >` [`size()`](size.md)の場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  const std::string_view sv = "hello";

  // 全体をコピーする
  {
    char result[5 + 1] = {};
    sv.copy(result, 5);

    std::cout << result << std::endl;
  }

  // 先�3要素だけコピーする
  {
    char result[3 + 1] = {};
    sv.copy(result, 3);

    std::cout << result << std::endl;
  }

  // 2番目以降の要素をコピーする
  {
    char result[3 + 1] = {};
    sv.copy(result, 3, 2);

    std::cout << result << std::endl;
  }
}
```
* copy[color ff0000]

### 出力
```
hello
hel
llo
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
