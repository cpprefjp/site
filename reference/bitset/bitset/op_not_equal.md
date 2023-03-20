# operator!=
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
// operator==により、以下のオーバーロードが使用可能になる (C++20)
bool operator!=(const bitset<N>& rhs) const;          // (1) C++03
bool operator!=(const bitset<N>& rhs) const noexcept; // (1) C++11
constexpr bool operator!=(const bitset<N>& rhs) const noexcept; // (1) C++23
```

## 概要
`*this`と`rhs`を非等値比較する。


## 戻り値
`*this`と`rhs`のいずれかのビット値が等しくなければ`true`、そうでなければ`false`を返す。


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs1("1010");
  std::bitset<4> bs2("1110");

  if (bs1 != bs2) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

### 出力
```
not equal
```


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
