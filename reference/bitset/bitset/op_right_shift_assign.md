# operator>>=
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N>& operator>>=(size_t pos);                    // (1) C++03
bitset<N>& operator>>=(size_t pos) noexcept;           // (1) C++11
constexpr bitset<N>& operator>>=(size_t pos) noexcept; // (1) C++23
```

## 概要
ビットを右シフトさせる。


## 効果
`*this`のビットを`pos`の個数だけ右にシフトさせる。溢れたビットは0になる。


## 戻り値
`*this`


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<8> bs("11000001");

  bs >>= 4;

  std::cout << bs << std::endl;
}
```

### 出力
```
00001100
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
