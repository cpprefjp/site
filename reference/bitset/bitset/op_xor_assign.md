# operator^=
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N>& operator^=(const bitset<N>& rhs);          // C++03
bitset<N>& operator^=(const bitset<N>& rhs) noexcept; // C++11
```

## 概要
`*this`と`rhs`に対して、排他的論理和(XOR)の複合演算を行う。


## 効果
`*this`に対して、`*this`と`rhs`のどちらか一方だけ1であればビットを1にし、それ以外のビットを0にする。


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
  std::bitset<4> bs1("0011");
  std::bitset<4> bs2("0101");

  bs1 ^= bs2;

  std::cout << bs1 << std::endl;
}
```

### 出力
```
0110
```


## 参照

