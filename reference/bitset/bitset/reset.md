# reset
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N>& reset();                     // (1) C++03
bitset<N>& reset() noexcept;            // (1) C++11
constexpr bitset<N>& reset() noexcept;  // (1) C++23

bitset<N>& reset(size_t pos);           // (2) C++03
constexpr bitset<N>& reset(size_t pos); // (2) C++23
```

## 概要
任意の位置のビットを0にする。


## 要件
- (2): `pos <` [`size()`](size.md)であること。


## 効果
- (1): 全ビットを0にする。
- (2): `pos`番目のビットを0にする。


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
    std::bitset<4> bs("1010");
    bs.reset();

    std::cout << bs << std::endl;
  }

  {
    std::bitset<4> bs("1010");
    bs.reset(1);

    std::cout << bs << std::endl;
  }
}
```

### 出力
```
0000
1000
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
