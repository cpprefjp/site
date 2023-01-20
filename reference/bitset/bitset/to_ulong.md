# to_ulong
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
unsigned long to_ulong() const;           // (1) C++03
constexpr unsigned long to_ulong() const; // (1) C++23
```

## 概要
`unsigned long`型に変換する。


## 戻り値
ビット列を`unsigned long`型に変換して返す。


## 例外
`unsigned long`型に変換した結果としてオーバーフローした場合、[`overflow_error`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1011");

  unsigned long result = bs.to_ulong();
  std::cout << result << std::endl;
}
```

### 出力
```
11
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
