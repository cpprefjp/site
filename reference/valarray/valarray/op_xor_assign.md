#operator^=
* valarray[meta header]

```cpp
valarray<T>& operator^=(const valarray<T>& xs); // (1)
valarray<T>& operator^=(const T& x);            // (2)
```

##概要
排他的論理和の複合代入を行う。

- (1) : `*this`の各要素に、`xs`の各要素との排他的論理和を代入する。
- (2) : `*this`の各要素に、`x`との排他的論理和を代入する。


##効果
- (1) : 以下のコードと同等のことを行う：

```cpp
for (size_t i = 0; i < size(); ++i) {
  (*this)[i] ^= xs[i];
}
```

- (2) : 以下のコードと同等のことを行う：

```cpp
for (size_t i = 0; i < size(); ++i) {
  (*this)[i] ^= x;
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
    0b00000101,
    0b00001010,
    0b00010101
  };
  const std::valarray<std::uint8_t> b = {
    0b00000011,
    0b00000011,
    0b00000011
  };
  const std::valarray<std::uint8_t> expected = {
    0b00000110,
    0b00001001,
    0b00010110
  };

  std::valarray<std::uint8_t> result1 = a;
  result1 ^= b;
  assert((equal_valarray(result1, expected)));

  std::valarray<std::uint8_t> result2 = a;
  result2 ^= 0b00000011;
  assert((equal_valarray(result2, expected)));
}
```

###出力
```
```


