#operator~ (単項)
* valarray[meta header]

```cpp
valarray<T> operator~() const;
```

##概要
単項 `~` 演算（ビット反転した要素を得る）。


##戻り値
以下のコードと同等のことを行う：

```cpp
valarray<T> result(size());
for (size_t i = 0; i < size(); ++i) {
  result[i] = ~(*this)[i];
}
return result;
```


##例
```cpp
#include <cassert>
#include <valarray>
#include <cstdint>

int main()
{
  const std::valarray<std::uint8_t> v = {
    3, // 0000'0011
    5, // 0000'0101
    13 // 0000'1101
  };

  const std::valarray<std::uint8_t> expected = {
    252, // 1111'1100
    250, // 1111'0101
    242  // 1111'0010
  };

  std::valarray<std::uint8_t> result = ~v;

  std::valarray<bool> equal_result = result == expected;
  assert((std::all_of(
    std::begin(equal_result),
    std::end(equal_result),
    [](bool b) { return b; }
  )));
}
```

###出力
```
```


