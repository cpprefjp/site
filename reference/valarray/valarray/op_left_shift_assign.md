#operator<<=
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]

```cpp
valarray<T>& operator<<=(const valarray<T>& xs); // (1)
valarray<T>& operator<<=(const T& x);            // (2)
```

##概要
左シフトの複合代入を行う。

- (1) : `*this`の各要素に、`xs`の各要素の値だけ左シフトした結果を代入する。
- (2) : `*this`の各要素に、`x`の値だけ左シフトした結果を代入する。


##効果
- (1) : 以下のコードと同等のことを行う：

```cpp
for (size_t i = 0; i < size(); ++i) {
  (*this)[i] <<= xs[i];
}
```

- (2) : 以下のコードと同等のことを行う：

```cpp
for (size_t i = 0; i < size(); ++i) {
  (*this)[i] <<= x;
}
```


##戻り値
`*this`


##備考
2つの`valarray`オブジェクトの要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <cassert>
#include <valarray>
#include <cstdint>
#include <algorithm>

template <class T>
bool equal_valarray(const std::valarray<T>& a, const std::valarray<T>& b)
{
  const std::valarray<bool> result = a == b;
  return std::all_of(std::begin(result), std::end(result), [](bool b) { return b; });
}

int main()
{
  const std::valarray<std::uint8_t> a = {
    0b10000101,
    0b00001010,
    0b00010101
  };
  const std::valarray<std::uint8_t> b = {
    4,
    4,
    4
  };
  const std::valarray<std::uint8_t> expected = {
    0b01010000,
    0b10100000,
    0b01010000
  };

  std::valarray<std::uint8_t> result1 = a;
  result1 <<= b;
  assert((equal_valarray(result1, expected)));

  std::valarray<std::uint8_t> result2 = a;
  result2 <<= 4;
  assert((equal_valarray(result2, expected)));
}
```

###出力
```
```


