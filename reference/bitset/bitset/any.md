# any
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool any() const;                    // (1) C++03
bool any() const noexcept;           // (1) C++11
constexpr bool any() const noexcept; // (1) C++23
```

## 概要
いずれかのビットが1になっているかを判定する。


## 戻り値
いずれかのビットが1になっていれば`true`、そうでなければ`false`を返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return count() != 0;
```
* count[link count.md]


## 例
```cpp example
#include <cassert>
#include <bitset>

int main()
{
  {
    std::bitset<4> bs("1011");

    bool result = bs.any();
    assert(result);
  }
  {
    std::bitset<4> bs("0000");

    bool result = bs.any();
    assert(!result);
  }
}
```

### 出力
```
```


## 参照
- [P2417R2 A more constexpr bitset](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2417r2.pdf)
