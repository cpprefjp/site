# substr
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr basic_string_view substr(size_type pos = 0, size_type n = npos) const;
```

## 概要
部分文字列を取得する。



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

  std::string_view ret1 = sv.substr(5);    // 5番目から最後までの文字列を取得
  std::string_view ret2 = sv.substr(5, 2); // 5番目から2文字の文字列を取得

  std::cout << "1 : [" << ret1 << ']' << std::endl;
  std::cout << "2 : [" << ret2 << ']' << std::endl;

  // substrはデータを切り取るのではなく、参照位置と参照サイズを変更するだけなので、
  // 生ポインタを介せば全体の文字列を復元することはできる。
  const char* ret3 = ret1.data() - 5;
  std::cout << "3 : [" << ret3 << ']' << std::endl;
}
```
* substr[color ff0000]
* ret1.data()[link data.md]

### 出力
```
1 : [is a pen]
2 : [is]
3 : [This is a pen]
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
