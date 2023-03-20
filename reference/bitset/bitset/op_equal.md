# operator==
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool operator==(const bitset<N>& rhs) const;          // (1) C++03
bool operator==(const bitset<N>& rhs) const noexcept; // (1) C++11
constexpr bool operator==(const bitset<N>& rhs) const noexcept; // (1) C++23
```

## 概要
`*this`と`rhs`を等値比較する。


## 戻り値
`*this`と`rhs`の全てのビット値が等しければ`true`、そうでなければ`false`を返す。


## 例外
投げない。


## 備考
- この演算子により、`operator!=`が使用可能になる (C++20)


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs1("1010");
  std::bitset<4> bs2("1010");

  if (bs1 == bs2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

### 出力
```
equal
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
