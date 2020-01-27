# set
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N>& set();                            // (1) C++03
bitset<N>& set() noexcept;                   // (1) C++11

bitset<N>& set(size_t pos, bool val = true); // (2)
```

## 概要
任意の位置のビットを�定する。


## 要件
- (2): `pos <` [`size()`](size.md)であること。


## 効果
- (1): 全ビットを1にする。
- (2): `val`の値が`true`であれば1、そうでなけば0を、`pos`番目のビット値として�定する。


## 戻り値
`*this`


## 例外
- (1): 投げない。
- (2): `pos >=` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  {
    std::bitset<4> bs;
    bs.set();

    std::cout << bs << std::endl;
  }

  {
    std::bitset<4> bs;
    bs.set(0).set(2);

    std::cout << bs << std::endl;
  }
}
```

### 出力
```
1111
0101
```


## 参照

