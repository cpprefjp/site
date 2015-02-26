#operator|=
* bitset[meta header]
* std[meta namespace]

```cpp
bitset<N>& operator|=(const bitset<N>& rhs);          // C++03
bitset<N>& operator|=(const bitset<N>& rhs) noexcept; // C++11
```

##概要
`*this`と`rhs`に対して、論理和(OR)の複合演算を行う。


##効果
`*this`に対して、`*this`と`rhs`のどちらか一方でも1であればビットを1にし、それ以外のビットを0にする。


##戻り値
`*this`


##例外
投げない。


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs1("0011");
  std::bitset<4> bs2("0101");

  bs1 |= bs2;

  std::cout << bs1 << std::endl;
}
```

###出力
```
0111
```


##参照

