#operator<<
```cpp
namespace std {
  template <class T>
  valarray<T> operator<<(const valarray<T>& xs, const valarray<T>& ys); // (1)

  template <class T>
  valarray<T> operator<<(const valarray<T>& xs, const T& y);            // (2)

  template <class T>
  valarray<T> operator<<(const T& x, const valarray<T>& ys);            // (3)
}
```

##概要
左にビットシフトする。

- (1) : `xs`の各要素を、`ys`の各要素の値だけ左シフトする。
- (2) : `xs`の各要素を、`y`の値だけ左シフトする。
- (3) : `x`の値を、`ys`の各要素の値だけ左シフトする。


##戻り値

- (1) : 以下のコードと同等のことを行う：

```cpp
valarray<T> result = xs;
result <<= ys;
return result;
```
* <<=[link ./op_left_shift_assign.md]


- (2) : 以下のコードと同等のことを行う：

```cpp
valarray<T> result = xs;
result <<= y;
return result;
```
* <<=[link ./op_left_shift_assign.md]



- (3) : 以下のコードと同等のことを行う：

```cpp
valarray<T> result(ys.size());
for (size_t i = 0; i < result.size(); ++i) {
  result[i] = x << ys[i];
}
return result;
```


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

  std::valarray<std::uint8_t> result1 = a << b;
  assert((equal_valarray(result1, expected)));

  std::valarray<std::uint8_t> result2 = a << 4;
  assert((equal_valarray(result2, expected)));
}
```

###出力
```
```


