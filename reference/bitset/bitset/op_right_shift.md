# operator>>
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N> operator>>(size_t pos) const;                    // (1) C++03
bitset<N> operator>>(size_t pos) const noexcept;           // (1) C++11
constexpr bitset<N> operator>>(size_t pos) const noexcept; // (1) C++23
```

## 概要
ビットを右シフトした`bitset`オブジェクトを生成する。


## 戻り値
`*this`のビットを`pos`の個数だけ右にシフトさせた`bitset`オブジェクトを生成して返す。溢れたビットは0になる。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return bitset(*this) >>= pos;
```
* >>=[link op_right_shift_assign.md]


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<8> bs("11000001");

  std::bitset<8> result = bs >> 4;

  std::cout << result << std::endl;
}
```

### 出力
```
00001100
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
