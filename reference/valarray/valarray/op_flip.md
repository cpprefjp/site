# operator~ (単項)
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T> operator~() const;
```

## 概要
単項 `~` 演算（ビット反転した要素を得る）。


## 戻り値
以下のコードと同等のことを行う：

```cpp
valarray<T> result(size());
for (std::size_t i = 0; i < size(); ++i) {
  result[i] = ~(*this)[i];
}
return result;
```
* size()[link size.md]


## 例
```cpp example
#include <cassert>
#include <valarray>
#include <cstdint>

int main()
{
  const std::valarray<std::uint8_t> va = {
    3, // 0000'0011
    5, // 0000'0101
    13 // 0000'1101
  };

  const std::valarray<std::uint8_t> expected = {
    252, // 1111'1100
    250, // 1111'0101
    242  // 1111'0010
  };

  std::valarray<std::uint8_t> result = ~va;

  std::valarray<bool> equal_result = result == expected;
  assert((std::all_of(
    std::begin(equal_result),
    std::end(equal_result),
    [](bool b) { return b; }
  )));
}
```
* std::uint8_t[link /reference/cstdint/uint8_t.md]
* std::all_of[link /reference/algorithm/all_of.md]
* std::begin[link begin_free.md]
* std::end[link end_free.md]

### 出力
```
```


