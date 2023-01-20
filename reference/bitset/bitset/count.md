# count
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
size_t count() const;                    // (1) C++03
size_t count() const noexcept;           // (1) C++11
constexpr size_t count() const noexcept; // (1) C++23
```

## 概要
1になっているビットの数を取得する。


## 戻り値
1になっているビットの数を返す。


## 例
### 基本操作
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("1011");

  std::cout << bs.count() << std::endl;
}
```

#### 出力
```
3
```

### 値が2の乗数かを判定する
```cpp example
#include <iostream>
#include <bitset>
#include <cstdint>

int main()
{
  std::uint32_t ar[] = {4, 8, 16, 32, 24};
  for (std::uint32_t x : ar) {
    // 符号なし整数において、立っているビットがひとつだけなら2の乗数。
    // 立っているビット数を数えることは、popcount (population count) という名前で知られている
    if (std::bitset<32>(x).count() == 1) {
      std::cout << x << " is power of 2" << std::endl;
    }
    else {
      std::cout << x << " is not power of 2" << std::endl;
    }
  }
}
```
* std::uint32_t[link /reference/cstdint/uint32_t.md]

#### 出力
```
4 is power of 2
8 is power of 2
16 is power of 2
32 is power of 2
24 is not power of 2
```


## 関連項目
- [`std::popcount()`](/reference/bit/popcount.md)


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
