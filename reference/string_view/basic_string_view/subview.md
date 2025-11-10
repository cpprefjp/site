# subview
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_string_view<charT, traits>
  subview(size_type pos = 0,
          size_type n = npos) const;
```

## 概要
部分文字列を取得する。

本関数は[`substr`](substr.md)と全く同じ動作である。[`std::string`](/reference/string/basic_string.md)とインターフェースを揃える目的で追加された。


## 戻り値
指定された位置`pos`から`n`文字からなる部分文字列を構築して返す。

[`size()`](size.md) `- pos`と`n`うち、小さい方を`rlen`とし、`basic_string_view(`[`data()`](data.md) `+ pos, rlen)`を返す。


## 例外
`pos >` [`size()`](size.md)の場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  std::string_view sv = "This is a pen";

  std::string_view ret1 = sv.subview(5);    // 5番目から最後までの文字列を取得
  std::string_view ret2 = sv.subview(5, 2); // 5番目から2文字の文字列を取得

  std::cout << "1 : [" << ret1 << ']' << std::endl;
  std::cout << "2 : [" << ret2 << ']' << std::endl;

  // subviewはデータを切り取るのではなく、参照位置と参照サイズを変更するだけなので、
  // 生ポインタを介せば全体の文字列を復元することはできる。
  const char* ret3 = ret1.data() - 5;
  std::cout << "3 : [" << ret3 << ']' << std::endl;
}
```
* subview[color ff0000]
* ret1.data()[link data.md]

### 出力
```
1 : [is a pen]
2 : [is]
3 : [This is a pen]
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

- [P3044R2 sub-string_view from string](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3044r2.pdf)


## 関連項目
- [`substr`](substr.md)
- [`basic_string::subview`](/reference/string/basic_string/subview.md)
